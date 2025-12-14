import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function ErrandsTracker() {
  const { API_BASE } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  // EDIT STATE
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  // LOAD TASKS
  useEffect(() => {
    fetch(`${API_BASE}/api/tasks`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data =>
        setTasks(data.filter(t => t.category === "Errands"))
      )
      .catch(err => console.error(err));
  }, [API_BASE]);

  // ADD TASK
  async function addTask(e) {
    e.preventDefault();

    const res = await fetch(`${API_BASE}/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        title,
        category: "Errands",
        startDate,
        startTime,
        endDate,
        endTime,
      }),
    });

    const newTask = await res.json();
    setTasks([...tasks, newTask]);

    setTitle("");
    setStartDate("");
    setStartTime("");
    setEndDate("");
    setEndTime("");
  }

  // DELETE TASK
  async function deleteTask(id) {
    await fetch(`${API_BASE}/api/tasks/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    setTasks(tasks.filter(t => t._id !== id));
  }

  // START EDIT
  function startEdit(task) {
    setEditingId(task._id);
    setEditingTitle(task.title);
  }

  // SAVE EDIT (frontend-only update for now)
  function saveEdit(id) {
    setTasks(
      tasks.map(t =>
        t._id === id ? { ...t, title: editingTitle } : t
      )
    );
    setEditingId(null);
    setEditingTitle("");
  }

  return (
    <div className="container mt-4">
      <h2>Errand</h2>

      {/* ADD FORM */}
      <form onSubmit={addTask} className="mb-4">
        <input
          className="form-control mb-2"
          placeholder="Errand"
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

      {/* TASK LIST */}
      <ul className="list-group">
        {tasks.map(task => (
          <li
            key={task._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {editingId === task._id ? (
              <>
                <input
                  className="form-control me-2"
                  value={editingTitle}
                  onChange={e => setEditingTitle(e.target.value)}
                />
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => saveEdit(task._id)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span>{task.title}</span>
                <div>
                  <button
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => startEdit(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
