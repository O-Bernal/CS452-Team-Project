import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Navigate } from "react-router-dom";

export default function Login() {
  const { user, loading, API_BASE } = useContext(AuthContext);

  if (loading) return <div className="container mt-4">Checking login…</div>;
  if (user) return <Navigate to="/" replace />;

  return (
    <div className="container mt-4">
      <h1>Team Project Authentication</h1>
      <p>Please sign in using your GitHub account to access the application.</p>

      <a className="btn btn-dark" href={`${API_BASE}/auth/github`}>
        Login with GitHub
      </a>
    </div>
  );
}
