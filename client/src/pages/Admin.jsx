import { useEffect, useState } from "react";
import { api } from "../api.js";

export default function Admin() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");
  const startCreate = () => setEditing({ email: "", title: "", message: "", rating: 5, isNew: true });
  const load = () => api("/feedback").then(setItems).catch((e) => setError(e.message));
  useEffect(() => {
    load();
  }, []);
  const remove = async (id) => {
    if (!window.confirm("Delete this feedback?")) return;
    try { await api(`/feedback/${id}`, { method: "DELETE" }); load(); } catch (e) { setError(e.message); }
  };
  const save = async (e) => {
    e.preventDefault();
    try {
      const path = editing.isNew ? "/feedback" : `/feedback/${editing._id}`;
      await api(path, { method: editing.isNew ? "POST" : "PUT", body: JSON.stringify(editing) });
      setEditing(null);
      load();
    } catch (e) { setError(e.message); }
  };
  return <section>
    <div className="heading"><div><h1>Admin Dashboard</h1><p>Create, view, edit and delete user feedback.</p></div><div><strong>{items.length} submissions</strong> <button onClick={startCreate}>Add feedback</button></div></div>
    {error && <p className="error">{error}</p>}
    <div className="table-wrap"><table>
      <thead><tr><th>User</th><th>Title</th><th>Message</th><th>Rating</th><th>Actions</th></tr></thead>
      <tbody>{items.map((item) => <tr key={item._id}>
        <td>{item.user?.name}<small>{item.user?.email}</small></td>
        <td>{item.title}</td><td>{item.message}</td><td>{item.rating}/5</td>
        <td><button className="small" onClick={() => setEditing({ ...item })}>Edit</button> <button className="small danger" onClick={() => remove(item._id)}>Delete</button></td>
      </tr>)}</tbody>
    </table></div>
    {!items.length && !error && <p className="empty">No feedback has been submitted.</p>}
    {editing && <div className="modal"><form className="card" onSubmit={save}>
      <h2>{editing.isNew ? "Add feedback" : "Edit feedback"}</h2>
      {editing.isNew && <label>Registered user email<input type="email" required value={editing.email} onChange={(e) => setEditing({ ...editing, email: e.target.value })} /></label>}
      <label>Title<input required value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></label>
      <label>Message<textarea required value={editing.message} onChange={(e) => setEditing({ ...editing, message: e.target.value })} /></label>
      <label>Rating<input type="number" min="1" max="5" required value={editing.rating} onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })} /></label>
      <div className="actions"><button>Save</button><button type="button" className="secondary" onClick={() => setEditing(null)}>Cancel</button></div>
    </form></div>}
  </section>;
}
