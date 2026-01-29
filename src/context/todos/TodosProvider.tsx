// src/context/todos/TodosProvider.tsx
import React, { useCallback, useEffect, useMemo, useReducer } from "react";
import type { Todo } from "../../types/todo";
import { tasksApi } from "../../api/tasksApi";
import { TodosContext, type TodosContextValue } from "./todosContext";

type Action =
  | { type: "setAll"; todos: Todo[] }
  | { type: "delete"; id: string }
  | { type: "clearCompleted" }
  | { type: "add"; todo: Todo }
  | { type: "update"; todo: Todo };

function todosReducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case "setAll":
      return action.todos;

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

export function TodosProvider({ children }: { children: React.ReactNode }) {
  const [todos, dispatch] = useReducer(todosReducer, []);

  const reloadTodos = useCallback(async () => {
    const data = await tasksApi.list();
    dispatch({ type: "setAll", todos: data });
  }, []);

  useEffect(() => {
    void reloadTodos();
  }, [reloadTodos]);

  const addTodo = useCallback(async (input: Omit<Todo, "id">) => {
    const created = await tasksApi.create(input);
    dispatch({ type: "add", todo: created });
  }, []);

  const updateTodo = useCallback(async (todo: Todo) => {
    const { id, ...payload } = todo;
    const updated = await tasksApi.replace(id, payload);
    dispatch({ type: "update", todo: updated });
  }, []);

  const toggleTodo = useCallback(
    async (id: string) => {
      const current = todos.find((t) => t.id === id);
      if (!current) return;

      const updated = await tasksApi.patch(id, { completed: !current.completed });
      dispatch({ type: "update", todo: updated });
    },
    [todos]
  );

  const deleteTodo = useCallback(async (id: string) => {
    await tasksApi.remove(id);
    dispatch({ type: "delete", id });
  }, []);

  const clearCompleted = useCallback(async () => {
    const completed = todos.filter((t) => t.completed);
    await Promise.all(completed.map((t) => tasksApi.remove(t.id)));
    dispatch({ type: "clearCompleted" });
  }, [todos]);

  const value: TodosContextValue = useMemo(
    () => ({
      todos,
      toggleTodo,
      deleteTodo,
      clearCompleted,
      addTodo,
      updateTodo,
      reloadTodos,
    }),
    [todos, toggleTodo, deleteTodo, clearCompleted, addTodo, updateTodo, reloadTodos]
  );

  return <TodosContext.Provider value={value}>{children}</TodosContext.Provider>;
}
