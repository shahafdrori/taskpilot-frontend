//src/hooks/useTodoDialogController.ts
import { useCallback, useMemo, useState } from "react";
import type { Todo, LonLat } from "../types/todo";
import type { TodoFormValues } from "../components/todos/TodoDialog";
import { TODO_SUBJECTS, getTodayISODate } from "../constants/todos";
import { makeId } from "../utils/makeId";

type Mode = "add" | "edit";

// Temporary default location until Step 3 (dialog map picker) is implemented.
const DEFAULT_LOCATION: LonLat = [34.8, 31.9]; // [lon, lat] (Israel-ish)

export function useTodoDialogController(params: {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
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
      };
    }
    return {
      name: "",
      subject: TODO_SUBJECTS[0],
      priority: 5,
      date: getTodayISODate(),
    };
  }, [dialogMode, editingTodo]);

  const handleSubmit = useCallback(
    (values: TodoFormValues) => {
      if (dialogMode === "add") {
        addTodo({
          id: makeId(),
          completed: false,
          location: DEFAULT_LOCATION,
          ...values,
        });
      } else if (dialogMode === "edit" && editingTodo) {
        // values doesn't contain location yet, so editingTodo.location will stay as-is
        updateTodo({ ...editingTodo, ...values });
      }
      setDialogOpen(false);
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
