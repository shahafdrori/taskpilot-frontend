//src/context/todos/todosContext.ts
import { createContext } from "react";
import type { Todo } from "../../types/todo";

export type TodosContextValue = {
  todos: Todo[];
  toggleTodo: (id: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  clearCompleted: () => Promise<void>;
  addTodo: (todo: Omit<Todo, "id">) => Promise<void>;
  updateTodo: (todo: Todo) => Promise<void>;
  reloadTodos: () => Promise<void>;
};

export const TodosContext = createContext<TodosContextValue | undefined>(
  undefined
);
