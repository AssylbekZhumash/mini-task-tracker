// Pure helper functions for working with tasks.
// Keeping the logic here (outside React) makes it easy to test.

export const STORAGE_KEY = "mini-task-tracker.tasks";
export const BACKUP_KEY = "mini-task-tracker.tasks.bak";

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

// Parse stored JSON into a task array, or null if it cannot be trusted.
function parseTasks(raw) {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

// Read tasks from localStorage. Falls back to a backup copy if the primary
// data is corrupt or missing, returning [] only when both are unavailable.
export function loadTasks(storage = globalThis.localStorage) {
  return parseTasks(storage.getItem(STORAGE_KEY))
    ?? parseTasks(storage.getItem(BACKUP_KEY))
    ?? [];
}

// Save tasks to localStorage. Writes a backup copy first so a failed or
// interrupted primary write cannot erase the last good state. Returns true
// on success and false if the primary write failed (the backup is preserved).
export function saveTasks(tasks, storage = globalThis.localStorage) {
  try {
    storage.setItem(BACKUP_KEY, JSON.stringify(tasks));
  } catch {
    // Keep going: the previous backup may still allow recovery on load.
  }
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    return true;
  } catch {
    return false;
  }
}
