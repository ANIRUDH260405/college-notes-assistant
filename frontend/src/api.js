const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function getFiles() {
  const r = await fetch(`${API}/files`);
  if (!r.ok) throw new Error("Could not load files");
  return (await r.json()).files;
}

export async function ask(question) {
  const r = await fetch(`${API}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  if (!r.ok) throw new Error(`Server error ${r.status}`);
  return r.json();
}
