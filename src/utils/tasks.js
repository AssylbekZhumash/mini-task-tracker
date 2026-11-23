// Pure helper functions for working with tasks.
// Keeping the logic here (outside React) makes it easy to test.

export const STORAGE_KEY = "mini-task-tracker.tasks";

// Add a new task to the list. Empty titles are ignored.
export function addTask(tasks, title) {
  const trimmed = title.trim();
  if (trimmed === "") return tasks;

  const newTask = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: trimmed,
    completed: false,
  };
  return [newTask, ...tasks];
}

// Flip the completed status of one task.
export function toggleTask(tasks, id) {
  return tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
}

// Remove one task from the list.
export function deleteTask(tasks, id) {
  return tasks.filter((task) => task.id !== id);
}

// Filter by title (case-insensitive) and by status: "all", "active", "completed".
export function filterTasks(tasks, searchText, status) {
  const query = searchText.trim().toLowerCase();

  return tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(query);
    const matchesStatus =
      status === "all" ||
      (status === "active" && !task.completed) ||
      (status === "completed" && task.completed);
    return matchesSearch && matchesStatus;
  });
}

// Read tasks from localStorage. Returns [] if nothing valid is stored.
export function loadTasks(storage = globalThis.localStorage) {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Save tasks to localStorage.
export function saveTasks(tasks, storage = globalThis.localStorage) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // Storage may be full or unavailable; the app keeps working without saving.
  }
}
