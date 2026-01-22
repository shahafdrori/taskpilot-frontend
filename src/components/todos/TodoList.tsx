//src/components/todos/TodoList.tsx
import React from "react";
import { Divider, List } from "@mui/material";
import type { Todo } from "../../types/todo";
import TodoItem from "./TodoItem";

type Props = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
};

export default function TodoList({ todos, onToggle, onDelete, onEdit }: Props) {
  return (
    <List disablePadding>
      {todos.map((todo, idx) => (
        <React.Fragment key={todo.id}>
          <TodoItem
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
          {idx < todos.length - 1 && <Divider component="li" />}
        </React.Fragment>
      ))}
    </List>
  );
}
