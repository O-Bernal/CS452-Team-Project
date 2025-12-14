import { useState } from "react";

export default function TaskForm({ category, onAdd }) {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  const submit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    const start =
      startDate && startTime
        ? new Date(`${startDate}T${startTime}`)
        : null;

    const end =
      endDate && endTime
        ? new Date(`${endDate}T${endTime}`)
        : null;

    onAdd({
      title,
      category,
      startAt: start,
      endAt: end,
    });

    // Clear form
    setTitle("");
    setStartDate("");
    setStartTime("");
    setEndDate("");
    setEndTime("");
  };

  return (
    <form onSubmit={submit} className="mb-3">
      <input
        className="form-control mb-2"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="row mb-2">
        <div className="col">
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="time"
            className="form-control"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
      </div>

      <div className="row mb-2">
        <div className="col">
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="time"
            className="form-control"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>

      <button className="btn btn-primary">Add Task</button>
    </form>
  );
}
