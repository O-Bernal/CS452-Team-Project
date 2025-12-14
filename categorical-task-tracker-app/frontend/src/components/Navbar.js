import { useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function Navbar() {
  const { API_BASE } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
      <span className="navbar-brand">Task Tracker</span>

      <div className="navbar-nav">
        <a className="nav-link" href="/">Home</a>
        <a className="nav-link" href="/errands">Errands</a>
        <a className="nav-link" href="/fitness">Fitness</a>
      </div>

      <div className="ms-auto">
        <a className="btn btn-outline-light" href={`${API_BASE}/auth/logout`}>
          Logout
        </a>
      </div>
    </nav>
  );
}
