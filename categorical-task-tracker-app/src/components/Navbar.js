// src/components/Navbar.js
import { Link } from "react-router-dom";
console.log("Link import:", Link);
export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link> |{" "}
      <Link to="/tasks">Tasks</Link> |{" "}
      <Link to="/dashboard">Dashboard</Link> |{" "}
      <Link to="/settings">Settings</Link>
    </nav>
  );
}
