# Mini Task Tracker

A small task-tracking web application built with React and Vite for Software Engineering Assignment #05. This repository contains the reviewed and improved version. The initial version is preserved in the [baseline commit](https://github.com/AssylbekZhumash/mini-task-tracker/commit/20ff2f30081e7f5114954a32e3ef071ff8263a9c).

## Features

- Add a task, mark it completed or active, and delete it.
- Search tasks by title and filter by status: All, Active, Completed.
- Persist tasks in the browser's `localStorage`.
- Attempt recovery from a backup key when the primary saved data is invalid.
- Display a warning if a task save fails.

## Tech stack

- React 18, Vite, JavaScript and plain CSS
- `localStorage` (no backend, database, authentication or external API)
- Vitest for automated testing; `jsdom` for the component test

## Setup

Requires Node.js 18 or newer and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Verification commands

```bash
npm test
npm run build
npm run preview
```

According to the Bolt session recorded on 23 November 2026, the final test run passed **15/15 tests** in two test files and the production build succeeded (35 transformed modules, 145.78 kB JavaScript). These are reported execution results, not a new independent run. Use the commands above to verify in your environment.

## Structure

```text
mini-task-tracker/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── README.md
├── AGENTS.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── components/
    │   ├── TaskForm.jsx
    │   ├── TaskList.jsx
    │   ├── TaskItem.jsx
    │   └── TaskItem.test.jsx
    └── utils/
        ├── tasks.js
        └── tasks.test.js
```

`App.jsx` owns React state and the search/filter UI. `src/utils/tasks.js` supplies task operations and storage functions. `saveTasks` writes a backup and primary key and returns success status; the app shows a warning when persistence fails. `loadTasks` tries the primary value, then the backup, then an empty list.

## Test scope and limitations

The helper tests cover adding, toggling, deleting, filtering, storage fallback and save failures. One `TaskItem` component test checks that clicking the completion checkbox calls `onToggle` with the correct task ID.

Known limitations:

- A full `localStorage` quota is reported but is not automatically resolved; unsaved changes may disappear on reload.
- If both primary and backup data are corrupt, task data may still be lost.
- `App.jsx` state wiring and `TaskForm` submission lack automated component/integration coverage.
- Task IDs have a low, uneliminated possibility of collision.

For Assignment #05, Bolt recommended **GO for a small demo**, with these residual risks disclosed. This is not a production-readiness guarantee. The repository has **Agent Readiness Level 2**, which requires scoped edits and human review (see `AGENTS.md`).
