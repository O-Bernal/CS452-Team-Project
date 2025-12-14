export default function TaskItem({ task }) {
  return (
    <div className="card mb-2">
      <div className="card-body">
        {/* Task Title */}
        <h5 className="card-title">{task.title}</h5>

        {/* Optional Scheduled Date */}
        {task.scheduledFor && (
          <p className="card-text">
            <strong>Scheduled:</strong>{" "}
            {new Date(task.scheduledFor).toLocaleString()}
          </p>
        )}

        {/* Created Date */}
        <p className="card-text text-muted">
          Created: {new Date(task.createdAt).toLocaleString()}
        </p>

        {/* History */}
        {task.history && task.history.length > 0 && (
          <>
            <hr />
            <strong>History</strong>
            <ul className="small text-muted mb-0">
              {task.history.map((h, index) => (
                <li key={index}>
                  {h.action} —{" "}
                  {new Date(h.timestamp).toLocaleString()}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
