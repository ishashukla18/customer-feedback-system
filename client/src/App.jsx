import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Admin from "./pages/Admin.jsx";
import Feedback from "./pages/Feedback.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { useAuth } from "./context/AuthContext.jsx";

function Home() {
  const { user } = useAuth();
  return <Navigate to={!user ? "/login" : user.role === "admin" ? "/admin" : "/feedback"} replace />;
}
export default function App() {
  return <Routes><Route element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
    <Route path="/admin" element={<ProtectedRoute admin><Admin /></ProtectedRoute>} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Route></Routes>;
}
