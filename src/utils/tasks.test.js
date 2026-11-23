import { describe, it, expect } from "vitest";
import {
  addTask,
  toggleTask,
  deleteTask,
  filterTasks,
  loadTasks,
  saveTasks,
  STORAGE_KEY,
  BACKUP_KEY,
} from "./tasks.js";

// A tiny fake localStorage so the tests don't need a browser.
function createFakeStorage() {
  const data = {};
  return {
    getItem: (key) => (key in data ? data[key] : null),
    setItem: (key, value) => {
      data[key] = String(value);
    },
  };
}

// A fake storage whose setItem throws for the primary key, simulating a full
// or unavailable localStorage quota.
function createQuotaFakeStorage() {
  const data = {};
  return {
    getItem: (key) => (key in data ? data[key] : null),
    setItem: (key, value) => {
      if (key === STORAGE_KEY) {
        throw new Error("QuotaExceededError");
      }
      data[key] = String(value);
    },
  };
}

const sample = [
  { id: "1", title: "Buy milk", completed: false },
  { id: "2", title: "Write report", completed: true },
  { id: "3", title: "Call mom", completed: false },
];

describe("addTask", () => {
  it("adds a new active task to the list", () => {
    const result = addTask([], "Study React");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Study React");
    expect(result[0].completed).toBe(false);
  });

  it("ignores empty or whitespace-only titles", () => {
    expect(addTask(sample, "   ")).toBe(sample);
  });
});

describe("toggleTask", () => {
  it("marks an active task as completed and back again", () => {
    const once = toggleTask(sample, "1");
    expect(once.find((t) => t.id === "1").completed).toBe(true);
    const twice = toggleTask(once, "1");
    expect(twice.find((t) => t.id === "1").completed).toBe(false);
  });
});

describe("deleteTask", () => {
  it("removes only the chosen task", () => {
    const result = deleteTask(sample, "2");
    expect(result).toHaveLength(2);
    expect(result.some((t) => t.id === "2")).toBe(false);
  });
});

describe("filterTasks", () => {
  it("searches by title, ignoring case", () => {
    const result = filterTasks(sample, "REPORT", "all");
    expect(result.map((t) => t.id)).toEqual(["2"]);
  });

  it("filters by status", () => {
    expect(filterTasks(sample, "", "active")).toHaveLength(2);
    expect(filterTasks(sample, "", "completed")).toHaveLength(1);
    expect(filterTasks(sample, "", "all")).toHaveLength(3);
  });

  it("combines search and status", () => {
    expect(filterTasks(sample, "call", "completed")).toHaveLength(0);
    expect(filterTasks(sample, "call", "active")).toHaveLength(1);
  });
});

describe("localStorage helpers", () => {
  it("saves tasks and loads them back", () => {
    const storage = createFakeStorage();
    saveTasks(sample, storage);
    expect(loadTasks(storage)).toEqual(sample);
  });

  it("returns an empty list when nothing is stored", () => {
    expect(loadTasks(createFakeStorage())).toEqual([]);
  });

  it("returns an empty list when stored data is corrupted", () => {
    const storage = createFakeStorage();
    storage.setItem(STORAGE_KEY, "not valid json");
    expect(loadTasks(storage)).toEqual([]);
  });

  it("falls back to the backup copy when the primary data is corrupt", () => {
    const storage = createFakeStorage();
    storage.setItem(BACKUP_KEY, JSON.stringify(sample));
    storage.setItem(STORAGE_KEY, "not valid json");
    expect(loadTasks(storage)).toEqual(sample);
  });

  it("returns an empty list when both primary and backup are corrupt", () => {
    const storage = createFakeStorage();
    storage.setItem(STORAGE_KEY, "not valid json");
    storage.setItem(BACKUP_KEY, "also not json");
    expect(loadTasks(storage)).toEqual([]);
  });

  it("returns false and keeps the backup when the primary write fails", () => {
    const storage = createQuotaFakeStorage();
    const ok = saveTasks(sample, storage);
    expect(ok).toBe(false);
    expect(loadTasks(storage)).toEqual(sample);
  });

  it("returns true when the primary write succeeds", () => {
    const storage = createFakeStorage();
    expect(saveTasks(sample, storage)).toBe(true);
  });
});
