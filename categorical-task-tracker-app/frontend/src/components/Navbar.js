import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function Navbar() {
  const { API_BASE } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
      <span className="navbar-brand">Task Tracker</span>

      <div className="navbar-nav">
        <Link className="nav-link" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/errands">
          Errands
        </Link>
        <Link className="nav-link" to="/fitness">
          Fitness
        </Link>
      </div>

      <div className="ms-auto">
        <a className="btn btn-outline-light" href={`${API_BASE}/auth/logout`}>
          Logout
        </a>
      </div>
    </nav>
  );
}
