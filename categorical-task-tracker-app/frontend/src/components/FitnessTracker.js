import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function FitnessTracker() {
  const { API_BASE } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  // LOAD FITNESS TASKS
  useEffect(() => {
    fetch(`${API_BASE}/api/tasks`, {
      credentials: "include",
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to load fitness activities");
        return res.json();
      })
      .then(data => {
        setTasks(data.filter(t => t.category === "Fitness"));
      })
      .catch(() => {
        alert("Failed to load fitness activities.");
      });
  }, [API_BASE]);

  // ADD FITNESS TASK
  async function addTask(e) {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE}/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title,
          category: "Fitness",
          startDate,
          startTime,
          endDate,
          endTime,
        }),
      });

      if (!res.ok) throw new Error();

      const newTask = await res.json();
      setTasks([...tasks, newTask]);

      setTitle("");
      setStartDate("");
      setStartTime("");
      setEndDate("");
      setEndTime("");
    } catch {
      alert("Failed to add task");
    }
  }

  return (
    <div className="container mt-4">
      <h2>Fitness Activity</h2>

      <form onSubmit={addTask} className="mb-4">
        <input
          className="form-control mb-2"
          placeholder="Fitness Activity"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <div className="row mb-2">
          <div className="col">
            <label>Start</label>
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="time"
              className="form-control"
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
            />
          </div>
        </div>

        <div className="row mb-2">
          <div className="col">
            <label>Finish</label>
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="time"
              className="form-control"
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
            />
          </div>
        </div>

        <button className="btn btn-primary">Add Task</button>
      </form>

      <ul className="list-group">
        {tasks.map(t => (
          <li key={t._id} className="list-group-item">
            {t.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
