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
  Typography,
} from "@mui/material";
import {
  TODO_PRIORITIES,
  TODO_SUBJECTS,
  type TodoSubject,
  getTodayISODate,
} from "../../constants/todos";
import type { LonLat } from "../../types/todo";
import MapPicker from "../map/MapPicker";

export type TodoFormValues = {
  name: string;
  subject: TodoSubject;
  priority: number;
  date: string;
  location: LonLat | null;
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
  location: null,
};

function formatCoord(n: number) {
  return Number.isFinite(n) ? n.toFixed(5) : "";
}

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
  const [location, setLocation] = React.useState<LonLat | null>(values.location);

  React.useEffect(() => {
    if (!open) return;
    setName(values.name);
    setSubject(values.subject);
    setPriority(values.priority);
    setDate(values.date);
    setLocation(values.location);
  }, [
    open,
    values.name,
    values.subject,
    values.priority,
    values.date,
    values.location,
  ]);

  const canSave = name.trim().length > 0 && location !== null;

  const handleSave = () => {
    if (!canSave) return;
    onSubmit({
      name: name.trim(),
      subject,
      priority,
      date,
      location,
    });
  };

  const lon = location?.[0];
  const lat = location?.[1];

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

          <Stack spacing={1}>
            <Typography variant="subtitle2">
              Location (click on the map)
            </Typography>
            <MapPicker value={location} onChange={setLocation} />
            <Stack direction="row" spacing={1}>
              <TextField
                size="small"
                label="Lon"
                value={lon === undefined ? "" : formatCoord(lon)}
                InputProps={{ readOnly: true }}
                fullWidth
              />
              <TextField
                size="small"
                label="Lat"
                value={lat === undefined ? "" : formatCoord(lat)}
                InputProps={{ readOnly: true }}
                fullWidth
              />
            </Stack>
          </Stack>
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
