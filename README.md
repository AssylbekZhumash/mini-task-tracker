# Mini Task Tracker

A small task-tracking web app built for a Software Engineering university assignment.
This is the **initial baseline version**.

## Features

- Add a task
- Mark a task as completed (and undo it)
- Delete a task
- Search tasks by title
- Filter tasks by status: All, Active, Completed
- Tasks are saved in the browser's `localStorage`

## Tech Stack

- React 18
- Vite
- JavaScript (no TypeScript)
- Plain CSS
- localStorage
- Vitest (testing)

No backend, database, authentication, or external APIs.

## Requirements

- [Node.js](https://nodejs.org/) version 18 or newer (includes npm)

## Getting Started

```bash
npm install
npm run dev
```

Then open the local address shown in the terminal (usually http://localhost:5173).

## Other Commands

| Command           | What it does                         |
| ----------------- | ------------------------------------ |
| `npm test`        | Runs the automated tests with Vitest |
| `npm run build`   | Creates a production build in `dist` |
| `npm run preview` | Previews the production build        |

## Project Structure

```
mini-task-tracker/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx              # App entry point
    ├── App.jsx               # Main component: state, search, filter
    ├── App.css               # All styling
    ├── components/
    │   ├── TaskForm.jsx      # Input + Add button
    │   ├── TaskList.jsx      # Renders the list of tasks
    │   └── TaskItem.jsx      # One task row (checkbox + delete)
    └── utils/
        ├── tasks.js          # Task logic + localStorage helpers
        └── tasks.test.js     # Automated tests
```

## How It Works

- `App.jsx` holds the list of tasks in React state.
- Task logic (add, toggle, delete, filter) lives in `src/utils/tasks.js` as plain functions, which keeps it simple to test.
- Tasks are loaded from `localStorage` when the app starts and saved again whenever they change.

## Testing

Run `npm test`. The tests cover adding, toggling, deleting, searching, filtering, and saving/loading from storage.

## Notes

This is the baseline version only. No audit or improvements have been applied yet.
