//src/context/todos/useTodos.ts
import { useContext } from "react";
import { TodosContext } from "./todosContext";

export function useTodos() {
  const ctx = useContext(TodosContext);
  if (!ctx) throw new Error("useTodos must be used inside TodosProvider");
  return ctx;
}
