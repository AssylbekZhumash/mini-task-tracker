import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import {
  addTask,
  toggleTask,
  deleteTask,
  filterTasks,
  loadTasks,
  saveTasks,
} from "./utils/tasks.js";

const FILTERS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

function App() {
  // Load saved tasks once, when the app first starts.
  const [tasks, setTasks] = useState(() => loadTasks());
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("all");

  // Save tasks every time they change.
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const visibleTasks = filterTasks(tasks, searchText, status);
  const activeCount = tasks.filter((task) => !task.completed).length;

  return (
    <main className="app">
      <header className="app-header">
        <h1>Mini Task Tracker</h1>
        <p className="subtitle">
          {activeCount} active of {tasks.length} total
        </p>
      </header>

      <TaskForm onAdd={(title) => setTasks(addTask(tasks, title))} />

      <div className="controls">
        <input
          type="search"
          className="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search tasks by title..."
          aria-label="Search tasks by title"
        />
        <div className="filters" role="group" aria-label="Filter tasks by status">
          {FILTERS.map((filter) => (
            <button
              key={filter.value}
              className={`btn filter-btn ${status === filter.value ? "active" : ""}`}
              onClick={() => setStatus(filter.value)}
              aria-pressed={status === filter.value}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <TaskList
        tasks={visibleTasks}
        onToggle={(id) => setTasks(toggleTask(tasks, id))}
        onDelete={(id) => setTasks(deleteTask(tasks, id))}
      />
    </main>
  );
}

export default App;
