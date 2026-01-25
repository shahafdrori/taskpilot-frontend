//src/data/mockTodos.ts
import type { Todo } from "../types/todo";
import { getTodayISODate } from "../constants/todos";

export const MOCK_TODOS: Todo[] = [
  {
    id: "1",
    name: "Build UI with React + MUI",
    subject: "Work",
    priority: 5,
    date: getTodayISODate(),
    completed: false,
    location: [34.7818, 32.0853],
  },
  {
    id: "2",
    name: "Install MUI",
    subject: "Study",
    priority: 3,
    date: getTodayISODate(),
    completed: true,
    location: [35.2137, 31.7683],
  },
  {
    id: "3",
    name: "Split UI into components",
    subject: "Work",
    priority: 6,
    date: getTodayISODate(),
    completed: false,
    location: [34.9896, 32.794],
  },
];
