//src/context/todos/TodosContext.tsx
import React, { createContext, useContext, useReducer } from "react";
import type { Todo } from "../../types/todo";
import { MOCK_TODOS } from "../../data/mockTodos";

type Action =
  | { type: "toggle"; id: string }
  | { type: "delete"; id: string }
  | { type: "clearCompleted" }
  | { type: "add"; todo: Todo }
  | { type: "update"; todo: Todo };

function todosReducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case "toggle":
      return state.map((t) =>
        t.id === action.id ? { ...t, completed: !t.completed } : t
      );
    case "delete":
      return state.filter((t) => t.id !== action.id);
    case "clearCompleted":
      return state.filter((t) => !t.completed);
    case "add":
      return [action.todo, ...state];
    case "update":
      return state.map((t) => (t.id === action.todo.id ? action.todo : t));
    default:
      return state;
  }
}

type TodosContextValue = {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  clearCompleted: () => void;
  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
};

const TodosContext = createContext<TodosContextValue | undefined>(undefined);

export function TodosProvider({ children }: { children: React.ReactNode }) {
  const [todos, dispatch] = useReducer(todosReducer, MOCK_TODOS);

  const value: TodosContextValue = {
    todos,
    toggleTodo: (id) => dispatch({ type: "toggle", id }),
    deleteTodo: (id) => dispatch({ type: "delete", id }),
    clearCompleted: () => dispatch({ type: "clearCompleted" }),
    addTodo: (todo) => dispatch({ type: "add", todo }),
    updateTodo: (todo) => dispatch({ type: "update", todo }),
  };

  return <TodosContext.Provider value={value}>{children}</TodosContext.Provider>;
}

export function useTodos() {
  const ctx = useContext(TodosContext);
  if (!ctx) throw new Error("useTodos must be used inside TodosProvider");
  return ctx;
}
