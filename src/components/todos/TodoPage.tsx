// src/components/todos/TodoPage.tsx
// src/components/todos/TodoPage.tsx
import { Box, Container, Paper } from "@mui/material";
import { useMemo, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import TodoList from "./TodoList";
import TodoToolbar from "./TodoToolbar";
import { useTodos } from "../../context/todos/TodosContext";
import TodoDialog, { type TodoFormValues } from "./TodoDialog";
import { TODO_SUBJECTS, getTodayISODate } from "../../constants/todos";

function makeId() {
  if (
    typeof globalThis.crypto !== "undefined" &&
    typeof globalThis.crypto.randomUUID === "function"
  ) {
    return globalThis.crypto.randomUUID();
  }
  return String(Date.now());
}

export default function TodoPage() {
  const { todos, toggleTodo, deleteTodo, clearCompleted, addTodo, updateTodo } =
    useTodos();

  const [search, setSearch] = useState("");
  const [hideDone, setHideDone] = useState(false);
  const debouncedSearch = useDebounce(search, 300);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [editingId, setEditingId] = useState<string | null>(null);

  const completedCount = todos.filter((t) => t.completed).length;
  const normalizedSearch = debouncedSearch.trim().toLowerCase();

  const visibleTodos = useMemo(() => {
    return todos
      .filter((t) => t.name.toLowerCase().includes(normalizedSearch))
      .filter((t) => (hideDone ? !t.completed : true));
  }, [todos, normalizedSearch, hideDone]);

  const editingTodo = editingId
    ? todos.find((t) => t.id === editingId)
    : undefined;

  const openAdd = () => {
    setDialogMode("add");
    setEditingId(null);
    setDialogOpen(true);
  };

  const openEdit = (id: string) => {
    setDialogMode("edit");
    setEditingId(id);
    setDialogOpen(true);
  };

  const closeDialog = () => setDialogOpen(false);

  const initialValues: TodoFormValues =
    dialogMode === "edit" && editingTodo
      ? {
          name: editingTodo.name,
          subject: editingTodo.subject,
          priority: editingTodo.priority,
          date: editingTodo.date,
        }
      : {
          name: "",
          subject: TODO_SUBJECTS[0],
          priority: 5,
          date: getTodayISODate(),
        };

  const handleSubmit = (values: TodoFormValues) => {
    if (dialogMode === "add") {
      addTodo({
        id: makeId(),
        completed: false,
        ...values,
      });
    } else if (dialogMode === "edit" && editingTodo) {
      updateTodo({
        ...editingTodo,
        ...values,
      });
    }
    setDialogOpen(false);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <TodoToolbar
        search={search}
        onSearchChange={setSearch}
        hideDone={hideDone}
        onHideDoneChange={setHideDone}
        completedCount={completedCount}
        onClearCompleted={clearCompleted}
        onAddClick={openAdd}
      />

      <Paper sx={{ mt: 2 }}>
        <Box sx={{ p: 1 }}>
          <TodoList
            todos={visibleTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={openEdit}
          />
        </Box>
      </Paper>

      <TodoDialog
        open={dialogOpen}
        mode={dialogMode}
        initialValues={initialValues}
        onClose={closeDialog}
        onSubmit={handleSubmit}
      />
    </Container>
  );
}
