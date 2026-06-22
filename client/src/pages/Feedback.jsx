import { useEffect, useState } from "react";
import { api } from "../api.js";

const empty = { title: "", message: "", rating: 5 };
export default function Feedback() {
  const [form, setForm] = useState(empty);
  const [exists, setExists] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    api("/feedback/my").then((data) => {
      if (data) { setForm({ title: data.title, message: data.message, rating: data.rating }); setExists(true); }
    }).catch((e) => setNotice(e.message));
  }, []);
  const submit = async (e) => {
    e.preventDefault();
    try {
      await api("/feedback/my", { method: "PUT", body: JSON.stringify(form) });
      setExists(true);
      setNotice("Feedback saved successfully.");
    } catch (e) { setNotice(e.message); }
  };
  return <section className="card">
    <h1>{exists ? "Edit your feedback" : "Add feedback"}</h1>
    <p>{exists ? "This is your previously submitted feedback." : "You have not submitted feedback yet."}</p>
    {notice && <p className="notice">{notice}</p>}
    <form onSubmit={submit}>
      <label>Title<input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
      <label>Message<textarea rows="5" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></label>
      <label>Rating<select value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}>
        {[1, 2, 3, 4, 5].map((number) => <option key={number}>{number}</option>)}
      </select></label>
      <button>{exists ? "Update feedback" : "Submit feedback"}</button>
    </form>
  </section>;
}
