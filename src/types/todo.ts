//src/types/todo.ts
import type { TodoSubject } from "../constants/todos";

export type Todo = {
  id: string;
  name: string;
  subject: TodoSubject;
  priority: number;
  date: string; // YYYY-MM-DD
  completed: boolean;
};

