import { Sparkles, Database, Network, Workflow, Code } from "lucide-react";

const SUGGESTIONS = [
  { icon: Database, tag: "DBMS", color: "#6c8cff", text: "Explain normalization from my DBMS notes" },
  { icon: Network, tag: "CN", color: "#34d399", text: "Explain TCP vs UDP" },
  { icon: Workflow, tag: "DAA", color: "#fbbf24", text: "Explain Dijkstra's algorithm" },
  { icon: Code, tag: "Python", color: "#f472b6", text: "What is a decorator in Python?" },
  { icon: Database, tag: "DBMS", color: "#6c8cff", text: "What is the difference between 2NF and 3NF?" },
  { icon: Workflow, tag: "DAA", color: "#fbbf24", text: "How does merge sort work?" },
];

export default function Hero({ onPick }) {
  return (
    <div className="hero">
      <div className="hero-icon"><Sparkles size={30} /></div>
      <h1>Ask your <span className="grad">notes</span> anything</h1>
      <p>Answers come only from your own DBMS, CN, DAA and Python notes.</p>
      <div className="cards">
        {SUGGESTIONS.map((s, i) => (
          <button
            key={s.text}
            className="card"
            style={{ "--c": s.color, animationDelay: `${i * 80 + 150}ms` }}
            onClick={() => onPick(s.text)}
          >
            <span className="card-tag"><s.icon size={13} /> {s.tag}</span>
            <span>{s.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
