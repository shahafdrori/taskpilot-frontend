// src/pages/HomePage.tsx
import { Box, Container, Paper } from "@mui/material";
import { useMemo, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import TodoList from "../components/todos/TodoList";
import TodoToolbar from "../components/todos/TodoToolbar";
import { useTodos } from "../context/todos/TodosContext";
import TodoDialog from "../components/todos/TodoDialog";
import { useTodoDialogController } from "../hooks/useTodoDialogController";

export default function HomePage() {
  const { todos, toggleTodo, deleteTodo, clearCompleted, addTodo, updateTodo } =
    useTodos();

  const [search, setSearch] = useState("");
  const [hideDone, setHideDone] = useState(false);
  const debouncedSearch = useDebounce(search, 300);

  const dialog = useTodoDialogController({ todos, addTodo, updateTodo });

  const completedCount = todos.filter((t) => t.completed).length;
  const normalizedSearch = debouncedSearch.trim().toLowerCase();

  const visibleTodos = useMemo(() => {
    return todos
      .filter((t) => t.name.toLowerCase().includes(normalizedSearch))
      .filter((t) => (hideDone ? !t.completed : true));
  }, [todos, normalizedSearch, hideDone]);

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <TodoToolbar
        search={search}
        onSearchChange={setSearch}
        hideDone={hideDone}
        onHideDoneChange={setHideDone}
        completedCount={completedCount}
        onClearCompleted={clearCompleted}
        onAddClick={dialog.openAdd}
      />

      <Paper sx={{ mt: 2 }}>
        <Box sx={{ p: 1 }}>
          <TodoList
            todos={visibleTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={dialog.openEdit}
          />
        </Box>
      </Paper>

      <TodoDialog
        open={dialog.dialogOpen}
        mode={dialog.dialogMode}
        initialValues={dialog.initialValues}
        onClose={dialog.closeDialog}
        onSubmit={dialog.handleSubmit}
      />
    </Container>
  );
}
