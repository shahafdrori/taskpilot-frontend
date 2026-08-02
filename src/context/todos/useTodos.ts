import { useContext } from "react";

import { TodosContext } from "./todosContext";

export function useTodos() {
  const context = useContext(TodosContext);
  if (!context) throw new Error("useTodos must be used inside TodosProvider");
  return context;
}
