# TaskPilot (Frontend)

TaskPilot is a React + TypeScript + MUI todo app built as part of a development onboarding exercise.

It has:
- **Home** for day-to-day usage (list + map)
- **Admin** for managing todos in a sortable/filterable table

## Features

### Home
- Add todo via Dialog (**name, subject, priority 1-10, date, location**)
- Edit existing todo (same dialog, prefilled values)
- Location picker with an interactive map (click to set **lon/lat**)
- Todos map view with markers (green = done, red = not done) + hover tooltip
- Toggle completed / uncompleted
- Delete todo
- Search by name (debounced)
- Hide done todos
- Clear done todos

### Admin
- Table view (TanStack Table)
- Sorting
- Search filter (debounced)
- Toggle done from the table
- Add / edit / delete actions from table

### Navigation
- React Router tabs (Home / Admin)

## Tech Stack
- React + TypeScript (Vite)
- MUI (Material UI)
- React Router
- TanStack Table
- OpenLayers (maps)

## Getting Started

```bash
npm install
npm run dev
````

## Scripts

* `npm run dev` - start dev server
* `npm run build` - production build
* `npm run lint` - eslint
* `npm run preview` - preview production build

## Project Structure (high level)

* `src/pages` - route pages (`HomePage`, `AdminPage`)
* `src/components/layout` - app header / navigation (`AppHeader`)
* `src/components/todos` - todo UI (`TodoDialog`, `TodoToolbar`, `TodoList`, `TodoItem`)
* `src/components/map` - map UI (`TodoMap`, `MapPicker`, marker icon helpers)
* `src/context/todos` - todos context + reducer (`TodosContext`)
* `src/data` - mock seed data (`mockTodos`)
* `src/hooks` - reusable hooks (`useDebounce`, `useTodoDialogController`)
* `src/constants` - app constants (subjects, priorities)
* `src/types` - shared types (`Todo`, `LonLat`)
* `src/utils` - small utilities (`makeId`)

## Notes / Roadmap

* Current state is **in-memory** via Context + Reducer (seeded with `mockTodos`).
* Next step: add persistence (backend API or localStorage) so todos survive refresh.