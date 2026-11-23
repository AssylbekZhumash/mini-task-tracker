# AGENTS.md — Mini Task Tracker

Instructions for any AI agent (or human contributor) working in this repository.
Read this file before making any change.

## Project purpose

A small React 18 + Vite task-tracking web app for a Software Engineering
university assignment. Users can add tasks, mark them complete, delete them,
search by title, and filter by status. Tasks persist in the browser's
`localStorage`. There is no backend, no database, no authentication, and no
external API. Keep changes small, well-justified, and consistent with this
baseline.

## Architecture

```
mini-task-tracker/
├── index.html              # Vite HTML entry; loads /src/main.jsx
├── vite.config.js          # Vite + @vitejs/plugin-react
├── package.json            # Scripts and dependencies
├── src/
│   ├── main.jsx            # React DOM bootstrap (StrictMode)
│   ├── App.jsx             # Main component: state, search, filter, save-error banner
│   ├── App.css             # All styling (single stylesheet, CSS variables)
│   ├── components/
│   │   ├── TaskForm.jsx    # New-task input + Add button
│   │   ├── TaskList.jsx    # Renders the list or an empty message
│   │   └── TaskItem.jsx    # One row: checkbox + delete button
│   └── utils/
│       ├── tasks.js        # Pure task helpers + localStorage I/O (with backup fallback)
│       └── tasks.test.js   # Vitest unit tests for the helpers
└── AGENTS.md               # This file
```

Key design choices:

- **Pure-helper separation.** All task logic (add, toggle, delete, filter,
  load, save) lives in `src/utils/tasks.js` as plain functions outside React.
  This keeps the logic testable without rendering components. Do not move this
  logic into components.
- **State ownership.** `App.jsx` owns the task array in React state and passes
  data + callbacks down to the presentational components.
- **Persistence.** `saveTasks` writes a backup copy before the primary
  `localStorage` key; `loadTasks` falls back to the backup when the primary is
  corrupt. `saveTasks` returns `true`/`false` so the UI can surface a warning
  when storage is unavailable.
- **No backend.** Do not add a database, server, or network calls.

## Safe commands

| Command            | Purpose                              | Expected result                     |
| ------------------ | ------------------------------------ | ----------------------------------- |
| `npm install`      | Install dependencies.                | `node_modules` populated.           |
| `npm test`         | Run the Vitest suite.                | All tests pass, exit code 0.        |
| `npm run build`    | Produce a production build in `dist`.| Build succeeds, exit code 0.        |
| `npm run preview`  | Preview the production build.        | Local preview server starts.        |

Run `npm test` and `npm run build` before declaring any change complete.
Both must pass. Do not run `npm run dev` inside this environment.

## Coding conventions

- Plain JSX + plain CSS. No TypeScript, no CSS-in-JS, no UI framework.
- Match the existing import style, formatting, and naming.
- Keep task logic in `src/utils/tasks.js` as pure functions.
- Prefer editing existing files over creating new ones.
- Keep functions pure where possible; pass dependencies as arguments
  (e.g. the `storage` parameter on `loadTasks`/`saveTasks`).
- Default to no comments. Add one only to explain a non-obvious "why"
  (a hidden constraint, a subtle invariant, or a workaround).
- Do not introduce abstractions or patterns unless there are at least two
  concrete call sites that share a clear shape.
- Keep dependencies minimal. Do not add a library without explicit approval.
- No emojis in source files, comments, or user-facing text.

## Test expectations

- `npm test` must pass before any change is merged.
- Every new or changed code path in `src/utils/tasks.js` must be accompanied
  by tests in `src/utils/tasks.test.js`.
- Tests must be deterministic and not require a real browser; use the fake
  storage pattern already present in the test file.
- Do not delete or weaken existing tests; extend them.
- Component-level tests are not currently required, but any change to
  `App.jsx` or the components should be verified by re-reading the edited
  files, since there is no browser in this environment.

## Prohibited operations

- Do NOT delete or rename existing tests; extend them instead.
- Do NOT add a backend, database, authentication, or external API without
  explicit written approval.
- Do NOT change the tech stack (React / Vite / Vitest) or introduce TypeScript.
- Do NOT remove the pure-helper separation in `src/utils/tasks.js`.
- Do NOT commit or push `dist/`, `node_modules/`, or `.env` (see `.gitignore`).
- Do NOT push to any remote or run destructive git operations (force-push,
  history rewrite, branch deletion on the main branch).
- Do NOT run `rm -rf` or any destructive filesystem command.
- Do NOT modify `AGENTS.md`, `.gitignore`, or `package.json` without approval.
- Do NOT introduce large frameworks, state libraries, or new dependencies.
- Do NOT fabricate test or build output. Report only real results.

## Human review requirements

- Before applying any non-trivial code change, show the proposed diff to the
  owner and wait for approval.
- After applying a change, run `npm test` and `npm run build` and report the
  real stdout/stderr and exit codes.
- New or changed logic in `src/utils/tasks.js` must be accompanied by tests.
- UI changes must be verified by re-reading the edited files (no browser here).
- Report verified facts vs. assumptions explicitly. Mark anything not
  verified as "Needs verification". Never claim a check passed unless it was
  actually executed in the current session.
- Approval is per-run. A prior approval does not carry forward to later work.

## Agent readiness

- **Level 1 — Run & report:** execute safe commands, read files, report
  results. Ready now.
- **Level 2 — Scoped edits with review:** make small, well-scoped changes and
  show diffs before applying. Ready now, governed by this file.
- **Level 3 — Autonomous multi-file changes without pre-approval:** NOT ready.
  The owner requires review-before-apply, and component-level test coverage
  is not yet in place.

**Current readiness: Level 2.**
