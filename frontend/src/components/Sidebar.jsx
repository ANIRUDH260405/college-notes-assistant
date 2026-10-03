import { BookOpen, FileText, Layers, X } from "lucide-react";

const COLORS = { dbms: "#6c8cff", cn: "#34d399", daa: "#fbbf24", python: "#f472b6" };
const colorFor = (name) => COLORS[name.split(".")[0].toLowerCase()] || "#94a3b8";

export default function Sidebar({ files, online, sources, ctxChars, open, onClose }) {
  return (
    <>
      <div className={`overlay ${open ? "show" : ""}`} onClick={onClose} />
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="brand">
          <div className="logo"><BookOpen size={18} /></div>
          <div>
            <div className="brand-name">Notes Assistant</div>
            <div className={`status ${online ? "on" : "off"}`}>
              <span className="dot" /> {online ? "Backend online" : "Backend offline"}
            </div>
          </div>
          <button className="icon-btn close-btn" onClick={onClose}><X size={18} /></button>
        </div>

        <h4>Your notes</h4>
        {files.length === 0 && <p className="muted">No notes loaded.</p>}
        {files.map((f) => (
          <div className="file" key={f.name}>
            <span className="file-icon" style={{ background: colorFor(f.name) + "26", color: colorFor(f.name) }}>
              <FileText size={15} />
            </span>
            <span className="file-name">{f.name}</span>
            <small>{f.chars.toLocaleString()}</small>
          </div>
        ))}

        <h4><Layers size={12} /> Context sent to the LLM</h4>
        {sources.length === 0 ? (
          <p className="muted">Ask a question to see exactly which chunks of your notes were retrieved.</p>
        ) : (
          <>
            <p className="muted small">{sources.length} chunk(s) · {ctxChars.toLocaleString()} characters</p>
            {sources.map((s, i) => (
              <div className="source" key={i} style={{ borderLeftColor: colorFor(s.file) }}>
                <div className="source-head">
                  <b>{s.file}</b>
                  <span>chunk {s.chunk} · score {s.score}</span>
                </div>
                <p>{s.preview}…</p>
              </div>
            ))}
          </>
        )}
      </aside>
    </>
  );
}
