import React, { useEffect, useRef, useState } from 'react';

interface MessageItem {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const HF_MODEL = 'deepseek-ai/DeepSeek-V3.1-Terminus:novita';


const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const [resumeText, setResumeText] = useState<string>('');

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    const loadResume = async () => {
      try {
        const res = await fetch('/resume.txt');
        if (res.ok) {
          const text = await res.text();
          setResumeText(text);
        }
      } catch {}
    };
    void loadResume();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const selectContext = (question: string): string => {
    if (!resumeText) return '';
    const paragraphs = resumeText
      .split(/\n\s*\n/)
      .map(p => p.replace(/\s+/g, ' ').trim())
      .filter(Boolean);
    const terms = question.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
    const scored = paragraphs.map(p => {
      const score = terms.reduce((acc, t) => acc + (p.toLowerCase().includes(t) ? 1 : 0), 0);
      return { p, score };
    });
    scored.sort((a, b) => b.score - a.score);
    const top = scored.slice(0, 5).map(s => s.p).join('\n\n');
    return top || paragraphs.slice(0, 5).join('\n\n');
  };

  const sendMessage = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    const userMessage: MessageItem = {
      id: `${Date.now()}-user`,
      role: 'user',
      content: trimmed,
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    try {
      const context = selectContext(trimmed);
      const prompt = `Answer strictly and concisely as Harsh, only using this resume context. If unsure, say so.\n\nContext:\n${context}\n\nQuestion: ${trimmed}`;
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: HF_MODEL,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      
      
      const data = await res.json();
      const assistantMessage: MessageItem = {
        id: `${Date.now()}-assistant`,
        role: 'assistant',
        content: data.choices?.[0]?.message?.content || 'No answer received.',
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err: any) {
      const assistantMessage: MessageItem = {
        id: `${Date.now()}-assistant`,
        role: 'assistant',
        content: err?.message || 'Something went wrong.',
      };
      setMessages(prev => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void sendMessage();
  };

  return (
    <>
      <button
        aria-label="Open resume chatbot"
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          right: '20px',
          bottom: '20px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#e50914',
          color: 'white',
          border: 'none',
          boxShadow: '0 6px 18px rgba(0,0,0,0.3)',
          cursor: 'pointer',
          zIndex: 1000,
          fontSize: '20px',
        }}
      >
        💬
      </button>

      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Resume chatbot"
          style={{
            position: 'fixed',
            right: '20px',
            bottom: '90px',
            width: '360px',
            maxWidth: '90vw',
            height: '480px',
            maxHeight: '70vh',
            background: '#141414',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            boxShadow: '0 12px 28px rgba(0,0,0,0.45)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 1001,
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 14px',
            background: '#1f1f1f',
            borderBottom: '1px solid rgba(255,255,255,0.08)'
          }}>
            <div style={{ fontWeight: 600 }}>Harsh • Resume Chat</div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>Ctrl/Cmd + K to toggle</div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#bbb',
                cursor: 'pointer',
                fontSize: 18,
              }}
            >
              ✕
            </button>
          </div>

          <div ref={listRef} style={{
            flex: 1,
            padding: '12px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            background: 'linear-gradient(180deg, rgba(20,20,20,1) 0%, rgba(10,10,10,1) 100%)'
          }}>
            {messages.length === 0 && (
              <div style={{ opacity: 0.8, fontSize: 14 }}>Ask me anything about Harsh's resume.</div>
            )}
            {messages.map(m => (
              <div key={m.id} style={{
                alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                background: m.role === 'user' ? '#e50914' : '#2a2a2a',
                color: '#fff',
                padding: '10px 12px',
                borderRadius: m.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                whiteSpace: 'pre-wrap'
              }}>
                {m.content}
              </div>
            ))}
            {isLoading && (
              <div style={{ opacity: 0.8, fontSize: 13 }}>Thinking…</div>
            )}
          </div>

          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            gap: '8px',
            padding: '10px',
            background: '#1b1b1b',
            borderTop: '1px solid rgba(255,255,255,0.08)'
          }}>
            <input
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Type your question..."
              style={{
                flex: 1,
                background: '#0f0f0f',
                border: '1px solid #333',
                color: '#fff',
                borderRadius: '8px',
                padding: '10px 12px',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              disabled={isLoading}
              style={{
                background: isLoading ? '#8a0b12' : '#e50914',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '0 14px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontWeight: 600
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;


