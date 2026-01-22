// src/components/todos/TodoPage.tsx
import { Box, Container, Paper } from "@mui/material";
import { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import TodoList from "./TodoList";
import TodoToolbar from "./TodoToolbar";
import { useTodos } from "../../context/todos/TodosContext";

export default function TodoPage() {
  const { todos, toggleTodo, deleteTodo, clearCompleted } = useTodos();

  const [search, setSearch] = useState("");
  const [hideDone, setHideDone] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  const completedCount = todos.filter((t) => t.completed).length;
  const normalizedSearch = debouncedSearch.trim().toLowerCase();

  const visibleTodos = todos
    .filter((t) => t.name.toLowerCase().includes(normalizedSearch))
    .filter((t) => (hideDone ? !t.completed : true));

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <TodoToolbar
        search={search}
        onSearchChange={setSearch}
        hideDone={hideDone}
        onHideDoneChange={setHideDone}
        completedCount={completedCount}
        onClearCompleted={clearCompleted}
      />

      <Paper sx={{ mt: 2 }}>
        <Box sx={{ p: 1 }}>
          <TodoList
            todos={visibleTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        </Box>
      </Paper>
    </Container>
  );
}
