import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      const savedUser = JSON.parse(localStorage.getItem("user"));
      navigate(savedUser.role === "admin" ? "/admin" : "/feedback");
    } catch (e) { setError(e.message); }
  };
  return <section className="card auth-card">
    <h1>Login</h1>
    {error && <p className="error">{error}</p>}
    <form onSubmit={submit}>
      <label>Email<input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
      <label>Password<input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
      <button>Login</button>
    </form>
    <p>New user? <Link to="/register">Create an account</Link></p>
  </section>;
}
