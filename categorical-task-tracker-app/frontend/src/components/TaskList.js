function TaskList({ tasks }) {
  return (
    <ul className="list-group">
      {tasks.map(task => (
        <li key={task._id} className="list-group-item">
          {task.title}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
