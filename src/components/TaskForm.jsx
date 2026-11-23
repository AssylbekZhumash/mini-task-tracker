import { useState } from "react";

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (title.trim() === "") return;
    onAdd(title);
    setTitle("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        aria-label="New task title"
      />
      <button type="submit" className="btn btn-primary">
        Add
      </button>
    </form>
  );
}

export default TaskForm;
