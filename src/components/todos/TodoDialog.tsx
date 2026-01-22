//src/components/todos/TodoDialog.tsx
import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { TODO_PRIORITIES, TODO_SUBJECTS, type TodoSubject, getTodayISODate } from "../../constants/todos";

export type TodoFormValues = {
  name: string;
  subject: TodoSubject;
  priority: number;
  date: string;
};

type Props = {
  open: boolean;
  mode: "add" | "edit";
  initialValues?: TodoFormValues;
  onClose: () => void;
  onSubmit: (values: TodoFormValues) => void;
};

const defaultValues: TodoFormValues = {
  name: "",
  subject: TODO_SUBJECTS[0],
  priority: 5,
  date: getTodayISODate(),
};

export default function TodoDialog({
  open,
  mode,
  initialValues,
  onClose,
  onSubmit,
}: Props) {
  const values = initialValues ?? defaultValues;

  const [name, setName] = React.useState(values.name);
  const [subject, setSubject] = React.useState<TodoSubject>(values.subject);
  const [priority, setPriority] = React.useState<number>(values.priority);
  const [date, setDate] = React.useState(values.date);

  React.useEffect(() => {
    if (!open) return;
    setName(values.name);
    setSubject(values.subject);
    setPriority(values.priority);
    setDate(values.date);
  }, [open, values.name, values.subject, values.priority, values.date]);

  const canSave = name.trim().length > 0;

  const handleSave = () => {
    if (!canSave) return;
    onSubmit({
      name: name.trim(),
      subject,
      priority,
      date,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{mode === "add" ? "Add todo" : "Edit todo"}</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            required
          />

          <TextField
            select
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value as TodoSubject)}
          >
            {TODO_SUBJECTS.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
          >
            {TODO_PRIORITIES.map((p) => (
              <MenuItem key={p} value={p}>
                {p}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave} disabled={!canSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
