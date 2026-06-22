import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Layout() {
  const { user, logout } = useAuth();
  return <>
    <nav>
      <Link className="brand" to="/">Feedback App</Link>
      <div>
        {user ? <>
          <span>Hello, {user.name}</span>
          {user.role === "admin" && <Link to="/admin">Admin</Link>}
          {user.role === "user" && <Link to="/feedback">My Feedback</Link>}
          <button className="link-button" onClick={logout}>Logout</button>
        </> : <><Link to="/login">Login</Link><Link to="/register">Register</Link></>}
      </div>
    </nav>
    <main><Outlet /></main>
  </>;
}
