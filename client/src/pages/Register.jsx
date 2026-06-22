import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try { await register(form); navigate("/feedback"); } catch (e) { setError(e.message); }
  };
  const field = (name) => (e) => setForm({ ...form, [name]: e.target.value });
  return <section className="card auth-card">
    <h1>Register</h1>
    {error && <p className="error">{error}</p>}
    <form onSubmit={submit}>
      <label>Name<input required value={form.name} onChange={field("name")} /></label>
      <label>Email<input type="email" required value={form.email} onChange={field("email")} /></label>
      <label>Password<input type="password" minLength="6" required value={form.password} onChange={field("password")} /></label>
      <button>Create account</button>
    </form>
    <p>Already registered? <Link to="/login">Login</Link></p>
  </section>;
}
