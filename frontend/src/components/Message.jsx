import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bot, User, Copy, Check, Layers } from "lucide-react";

export default function Message({ m, active, onShowSources }) {
  const [copied, setCopied] = useState(false);
  const isAI = m.role === "ai";

  function copy() {
    navigator.clipboard.writeText(m.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className={`row ${m.role}`}>
      <div className="avatar">{isAI ? <Bot size={18} /> : <User size={18} />}</div>
      <div className="msg-col">
        <div className={`bubble ${m.role} ${m.error ? "error" : ""}`}>
          {isAI ? <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.text}</ReactMarkdown> : m.text}
        </div>
        {isAI && !m.error && (
          <div className="actions">
            <button onClick={copy}>
              {copied ? <Check size={13} /> : <Copy size={13} />} {copied ? "Copied" : "Copy"}
            </button>
            {m.sources?.length > 0 && (
              <button className={active ? "active" : ""} onClick={() => onShowSources(m.id)}>
                <Layers size={13} /> {m.sources.length} source{m.sources.length > 1 ? "s" : ""}
              </button>
            )}
            {m.sources?.slice(0, 3).map((s, i) => (
              <span className="chip" key={i}>{s.file}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
