import { useEffect, useRef, useState } from "react";
import { Menu, Trash2, Sun, Moon, Bot } from "lucide-react";
import Sidebar from "./components/Sidebar";
import Message from "./components/Message";
import Composer from "./components/Composer";
import Hero from "./components/Hero";
import { getFiles, ask } from "./api";
import "./App.css";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [online, setOnline] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const endRef = useRef(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    getFiles().then((f) => { setFiles(f); setOnline(true); }).catch(() => setOnline(false));
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(q) {
    setMessages((m) => [...m, { id: crypto.randomUUID(), role: "user", text: q }]);
    setLoading(true);
    try {
      const data = await ask(q);
      const id = crypto.randomUUID();
      setOnline(true);
      setMessages((m) => [...m, { id, role: "ai", text: data.answer, sources: data.sources || [], ctx: data.context_chars || 0 }]);
      setActiveId(id);
    } catch (e) {
      setOnline(false);
      setMessages((m) => [...m, { id: crypto.randomUUID(), role: "ai", error: true, text: "Could not reach the backend. Make sure uvicorn is running on port 8000." }]);
    }
    setLoading(false);
  }

  const active = messages.find((m) => m.id === activeId);

  return (
    <div className="app"><div className="aurora"><span /><span /><span /></div>
      <Sidebar
        files={files}
        online={online}
        sources={active?.sources || []}
        ctxChars={active?.ctx || 0}
        open={drawer}
        onClose={() => setDrawer(false)}
      />
      <main className="chat">
        <header className="topbar">
          <button className="icon-btn menu-btn" onClick={() => setDrawer(true)}><Menu size={19} /></button>
          <div className="title">College Notes Assistant</div>
          <div className="top-actions">
            <button className="icon-btn" title="Clear chat" onClick={() => { setMessages([]); setActiveId(null); }}>
              <Trash2 size={17} />
            </button>
            <button className="icon-btn" title="Toggle theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </div>
        </header>

        <div className="messages">
          <div className="thread">
            {messages.length === 0 && <Hero onPick={send} />}
            {messages.map((m) => (
              <Message key={m.id} m={m} active={m.id === activeId} onShowSources={(id) => { setActiveId(id); setDrawer(true); }} />
            ))}
            {loading && (
              <div className="row ai">
                <div className="avatar"><Bot size={18} /></div>
                <div className="bubble ai typing"><span /><span /><span /></div>
              </div>
            )}
            <div ref={endRef} />
          </div>
        </div>

        <Composer onSend={send} disabled={loading} />
      </main>
    </div>
  );
}

