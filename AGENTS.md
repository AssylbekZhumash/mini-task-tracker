# AGENTS.md — Mini Task Tracker

Instructions for AI coding agents and human contributors. Read before editing this repository.

## Project purpose

A small React 18 + Vite task manager used for Software Engineering Assignment #05. Users can add, complete, delete, search and filter tasks. Data persists in the browser's `localStorage`. No backend, database, authentication or external API is used.

## Architecture

```text
mini-task-tracker/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js          # Vite and Vitest jsdom configuration
├── README.md
├── AGENTS.md
└── src/
    ├── main.jsx            # React entry point
    ├── App.jsx             # State, filters and save-error warning
    ├── App.css             # Styles
    ├── components/
    │   ├── TaskForm.jsx
    │   ├── TaskList.jsx
    │   ├── TaskItem.jsx
    │   └── TaskItem.test.jsx # Checkbox interaction test
    └── utils/
        ├── tasks.js        # Task helpers and persistence
        └── tasks.test.js   # Helper tests
```

Task operations and localStorage functions are separated in `src/utils/tasks.js`, outside React. `App.jsx` owns task state and passes data and callbacks to the presentational components. `saveTasks` writes a backup before the primary key and returns a success flag. `loadTasks` falls back to the backup when the primary key is invalid.

## Safe commands

| Command | Purpose |
| --- | --- |
| `npm install` | Install approved dependencies |
| `npm test` | Run the Vitest test suite |
| `npm run build` | Produce the Vite build |
| `npm run preview` | Preview the production build |

Run `npm test` and `npm run build` after code changes; report actual exit codes and output. Run `npm run dev` only when an interactive development preview is appropriate.

## Coding conventions

- Use JavaScript/JSX and plain CSS, not TypeScript or an additional UI framework.
- Keep task logic in `src/utils/tasks.js` and React state ownership in `App.jsx`.
- Prefer small, focused changes. Do not introduce patterns without a demonstrated need.
- Follow current naming/import conventions and keep dependencies minimal.
- Prefer pure, testable helper functions and explicit arguments for storage dependencies.
- Never introduce secrets, personal credentials or real user data.

## Test expectations

- Preserve existing tests. Add focused tests for new or changed behavior.
- Helper tests use a fake `localStorage` object; component tests can use the configured `jsdom` environment without a real browser.
- As of the final Bolt session on 23 November 2026, **15 tests** were reported passing: **14 helper tests plus one `TaskItem` component test**.
- The `TaskItem` test renders the component, clicks its checkbox and checks the `onToggle` callback receives the task ID.
- `App.jsx` state wiring and `TaskForm` submission still lack automated component/integration tests. Include manual browser checks for UI-related changes where possible; disclose when those checks were not performed.

## Prohibited operations

- Do not add a backend, database, authentication, external API or change the tech stack without written approval.
- Do not install or update dependencies, or modify `package.json`, lockfiles, `.gitignore` or this instruction file without approval.
- Do not delete or weaken existing tests.
- Do not commit `node_modules/`, `dist/`, `.env` or credentials.
- Do not push, merge, deploy, force-push, rewrite history, or run destructive commands without explicit human approval.
- Do not fabricate test logs, findings, UI verification or release evidence.

## Human review requirements

- Show proposed non-trivial code changes and diffs to the repository owner before applying them.
- Limit edits to the approved scope; require a fresh approval for each separate operation.
- Run and report real test/build checks after changes.
- Review UI changes in code and, where possible, in an actual browser or preview. State clearly if browser testing was not performed.
- Distinguish observed facts from plausible risks and unsupported AI assertions; disclose residual risks.

## Agent readiness

- **Level 1 — Run and report:** supported by safe commands and documented setup.
- **Level 2 — Scoped edits with review:** supported under this file's review and approval requirements.
- **Level 3 — Unreviewed autonomous changes:** not approved. Human review remains mandatory and UI/integration coverage is limited.

**Current readiness assessment: Level 2.**
