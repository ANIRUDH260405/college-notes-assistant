import { useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function Composer({ onSend, disabled }) {
  const [value, setValue] = useState("");
  const ref = useRef(null);

  function grow() {
    const el = ref.current;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }

  function submit() {
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue("");
    requestAnimationFrame(() => { if (ref.current) ref.current.style.height = "auto"; });
  }

  return (
    <div className="composer-wrap">
      <div className="composer">
        <textarea
          ref={ref}
          rows={1}
          value={value}
          placeholder="Ask a question about your notes…"
          onChange={(e) => setValue(e.target.value)}
          onInput={grow}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); }
          }}
        />
        <button className="send" onClick={submit} disabled={disabled || !value.trim()}>
          <ArrowUp size={18} />
        </button>
      </div>
      <p className="hint">Enter to send · Shift+Enter for a new line</p>
    </div>
  );
}
