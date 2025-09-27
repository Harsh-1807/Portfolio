import React, { useEffect, useState } from 'react';
import './Resume.css';

const Resume: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/resume.txt');
        if (!res.ok) throw new Error(`Failed to load resume.txt (${res.status})`);
        const t = await res.text();
        setText(t);
      } catch (e: any) {
        setError(e?.message || 'Unable to load resume.');
      }
    };
    void load();
  }, []);

  return (
    <div className="resume-container">
      <h1 className="resume-title">Resume</h1>
      {error ? (
        <div className="resume-error">{error}</div>
      ) : (
        <div className="resume-card">
          <pre className="resume-pre">{text}</pre>
        </div>
      )}
    </div>
  );
};

export default Resume;


