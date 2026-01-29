//src/hooks/useTodoDialogController.ts
import { useCallback, useMemo, useState } from "react";
import type { Todo, LonLat } from "../types/todo";
import type { TodoFormValues } from "../components/todos/TodoDialog";
import { TODO_SUBJECTS, getTodayISODate } from "../constants/todos";

type Mode = "add" | "edit";

export function useTodoDialogController(params: {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, "id">) => Promise<void>;
  updateTodo: (todo: Todo) => Promise<void>;
}) {
  const { todos, addTodo, updateTodo } = params;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<Mode>("add");
  const [editingId, setEditingId] = useState<string | null>(null);

  const editingTodo = useMemo(
    () => (editingId ? todos.find((t) => t.id === editingId) : undefined),
    [editingId, todos]
  );

  const openAdd = useCallback(() => {
    setDialogMode("add");
    setEditingId(null);
    setDialogOpen(true);
  }, []);

  const openEdit = useCallback((id: string) => {
    setDialogMode("edit");
    setEditingId(id);
    setDialogOpen(true);
  }, []);

  const closeDialog = useCallback(() => setDialogOpen(false), []);

  const initialValues: TodoFormValues = useMemo(() => {
    if (dialogMode === "edit" && editingTodo) {
      return {
        name: editingTodo.name,
        subject: editingTodo.subject,
        priority: editingTodo.priority,
        date: editingTodo.date,
        location: editingTodo.location,
      };
    }
    return {
      name: "",
      subject: TODO_SUBJECTS[0],
      priority: 5,
      date: getTodayISODate(),
      location: null,
    };
  }, [dialogMode, editingTodo]);

  const handleSubmit = useCallback(
    (values: TodoFormValues) => {
      void (async () => {
        if (!values.location) return;

        const location: LonLat = values.location;

        try {
          if (dialogMode === "add") {
            await addTodo({
              name: values.name.trim(),
              subject: values.subject,
              priority: values.priority,
              date: values.date,
              completed: false,
              location,
            });
          } else if (dialogMode === "edit" && editingTodo) {
            await updateTodo({
              ...editingTodo,
              name: values.name.trim(),
              subject: values.subject,
              priority: values.priority,
              date: values.date,
              location,
            });
          }

          setDialogOpen(false);
        } catch (e) {
          const msg = e instanceof Error ? e.message : "Failed to save";
          window.alert(msg);
        }
      })();
    },
    [addTodo, updateTodo, dialogMode, editingTodo]
  );

  return {
    dialogOpen,
    dialogMode,
    initialValues,
    openAdd,
    openEdit,
    closeDialog,
    handleSubmit,
  };
}
