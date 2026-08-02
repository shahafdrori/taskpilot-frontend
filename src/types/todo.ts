import type { TodoSubject } from "../constants/todos";

export type LonLat = [number, number];

export type Todo = { // delete comment after remembering the format
  id: string;
  name: string;
  subject: TodoSubject;
  priority: number;
  date: string; // YYYY-MM-DD
  completed: boolean;
  location: LonLat;
};


