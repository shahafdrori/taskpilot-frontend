# TaskPilot (Frontend)

TaskPilot is a React + TypeScript + MUI todo app built as part of a development onboarding exercise.
It includes a Home view for day-to-day usage and an Admin view with a sortable/filterable table.

## Features

Home
- Add todo via Dialog (name, subject, priority 1-10, date)
- Edit existing todo (same dialog, prefilled values)
- Toggle completed/uncompleted
- Delete todo
- Search by name (debounced)
- Hide done todos
- Clear done todos

Admin
- Table view (TanStack Table)
- Sorting
- Search filter (debounced)
- Add / edit / delete actions from table

Navigation
- React Router tabs (Home / Admin)

## Tech Stack

- React + TypeScript (Vite)
- MUI (Material UI)
- React Router
- TanStack Table

## Getting Started

```bash
npm install
npm run dev
````

## Scripts

* `npm run dev` - start dev server
* `npm run build` - production build
* `npm run lint` - eslint

## Project Structure (high level)

* `src/pages` - route pages (HomePage, AdminPage)
* `src/components` - UI components (dialog, list, toolbar, header)
* `src/context` - Todos context + reducer
* `src/hooks` - reusable hooks (useDebounce)
* `src/constants` - app constants (subjects, priorities)
* `src/utils` - small utilities (makeId)

## Notes / Roadmap

* Current state is in-memory via Context + Reducer (mock data).
* Next step: connect to backend (planned separate repo) for persistence.
