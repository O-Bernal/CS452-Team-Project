import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      <p>Select a category to manage your tasks:</p>

      <ul className="list-group mt-3">
        <li className="list-group-item">
          <Link to="/errands">Errands</Link>
        </li>
        <li className="list-group-item">
          <Link to="/fitness">Fitness</Link>
        </li>
      </ul>
    </div>
  );
}
