import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

const PORT = 5000;
const HF_API_URL = "https://router.huggingface.co/v1/chat/completions";
const HF_API_KEY = process.env.HF_API_KEY;



// Hugging Face Proxy endpoint
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

// Health check
app.get("/", (req, res) => {
  res.json({ message: "✅ Hugging Face proxy server is running" });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend proxy server running at http://localhost:${PORT}`);
  console.log(`📡 Proxying requests to Hugging Face API`);
});