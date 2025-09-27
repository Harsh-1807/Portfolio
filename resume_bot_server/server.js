import express from "express";
import cors from "cors";
import fs from "fs";
import fetch from "node-fetch";
import { CloudClient, DefaultEmbeddingFunction } from "chromadb";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import dotenv from "dotenv";

// Load environment variables
// Create a .env file in this directory with: HF_API_KEY=your_hugging_face_api_key
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

// ----------------------
// CONFIG
// ----------------------
const PORT = 5000;

// Hugging Face DeepSeek API
const HF_API_URL = "https://router.huggingface.co/v1/chat/completions";
const HF_MODEL = "deepseek-ai/DeepSeek-V3.1-Terminus:novita";
const HF_API_KEY = process.env.HF_API_KEY;

if (!HF_API_KEY) {
  console.error("❌ HF_API_KEY environment variable is required");
  process.exit(1);
}

// ----------------------
// Initialize Chroma Cloud
// ----------------------
const client = new CloudClient({
  apiKey: 'ck-Bb6y7dydZ75H9rk5B3bRstmL6gFUiMuH2xwJRR4fchJP',
  tenant: '98e33f8e-c8de-4010-b480-13816393a698',
  database: 'Harsh_Portfolio'
});

const embedder = new DefaultEmbeddingFunction();

async function initChroma() {
  const collection = await client.getOrCreateCollection({
    name: "resume",
    embeddingFunction: embedder,
  });
  return collection;
}

// ----------------------
// Add Resume to Chroma Cloud
// ----------------------
async function addResumeToChroma(resumePath = "./resume.txt") {
  const collection = await initChroma();

  if (!fs.existsSync(resumePath)) {
    console.error("Resume file not found:", resumePath);
    return;
  }

  const resumeText = fs.readFileSync(resumePath, "utf8");
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 400,
    chunkOverlap: 50,
  });

  const chunks = await splitter.splitText(resumeText);
  const cleanedChunks = chunks.map(c => c.replace(/\r\n/g, " "));

  for (let i = 0; i < cleanedChunks.length; i++) {
    await collection.add({
      ids: [`chunk-${i}`],
      documents: [cleanedChunks[i]],
    });
  }

  console.log(`✅ Added ${cleanedChunks.length} chunks from resume to Chroma Cloud`);
}

// ----------------------
// Hugging Face Proxy endpoint
// ----------------------
app.post("/api/chat", async (req, res) => {
  try {
    const response = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error in /api/chat:", err);
    res.status(500).json({ error: err.message });
  }
});

// ----------------------
// Chat endpoint (existing Chroma-based)
// ----------------------
app.post("/chat", async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: "Missing 'question' field" });

    const collection = await initChroma();
    const results = await collection.query({
      queryTexts: [question],
      nResults: 4,
    });

    const contextChunks = results.documents[0] || [];
    const context = contextChunks.length > 0 ? contextChunks.join("\n\n") : null;

    if (!context) {
      return res.json({ answer: "⚠️ No relevant context found in resume." });
    }

    // Build prompt for DeepSeek
    const prompt = `Answer based only on this resume you are Harsh  yourself:\n${context}\nQuestion: ${question}`;

    // Send to Hugging Face DeepSeek
    const response = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: HF_MODEL,
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || "⚠️ Hugging Face returned no answer.";

    res.json({ answer });
  } catch (err) {
    console.error("Error in /chat:", err);
    res.status(500).json({ error: err.message });
  }
});

// ----------------------
// Root route
// ----------------------
app.get("/", (req, res) => {
  res.send("✅ Resume bot server is running. Use POST /chat with { question: '...' }");
});

// ----------------------
// Start server
// ----------------------
app.listen(PORT, async () => {
  console.log(`🚀 Resume bot server running at http://localhost:${PORT}`);

  // Upload resume to Chroma Cloud on first run
  await addResumeToChroma("./resume.txt");

  const collection = await initChroma();
  const count = await collection.count();
  console.log(`📄 Total documents in Chroma resume collection: ${count}`);
});
