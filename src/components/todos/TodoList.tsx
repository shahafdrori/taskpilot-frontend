//src/components/todos/TodoList.tsx
import React from "react";
import { Divider, List } from "@mui/material";
import type { Todo } from "../../types/todo";
import TodoItem from "./TodoItem";

type Props = {
  todos: Todo[];
};

export default function TodoList({ todos }: Props) {
  return (
    <List disablePadding>
      {todos.map((todo, idx) => (
        <React.Fragment key={todo.id}>
          <TodoItem todo={todo} />
          {idx < todos.length - 1 && <Divider component="li" />}
        </React.Fragment>
      ))}
    </List>
  );
}
