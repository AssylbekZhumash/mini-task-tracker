function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <label className="task-label">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className="task-title">{task.title}</span>
      </label>
      <button
        className="btn btn-delete"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete task ${task.title}`}
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;
