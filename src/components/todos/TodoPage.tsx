// src/components/todos/TodoPage.tsx
import { Box, Container, Paper } from "@mui/material";
import { useState } from "react";
import { MOCK_TODOS } from "../../data/mockTodos";
import type { Todo } from "../../types/todo";
import TodoList from "./TodoList";
import TodoToolbar from "./TodoToolbar";

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>(() => MOCK_TODOS);
  const [search, setSearch] = useState("");
  const [hideDone, setHideDone] = useState(false);

  const handleToggle = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const normalizedSearch = search.trim().toLowerCase();

  const visibleTodos = todos
    .filter((t) => t.title.toLowerCase().includes(normalizedSearch))
    .filter((t) => (hideDone ? !t.completed : true));

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <TodoToolbar
        search={search}
        onSearchChange={setSearch}
        hideDone={hideDone}
        onHideDoneChange={setHideDone}
      />

      <Paper sx={{ mt: 2 }}>
        <Box sx={{ p: 1 }}>
          <TodoList
            todos={visibleTodos}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        </Box>
      </Paper>
    </Container>
  );
}
