//src/components/todos/TodoItem.tsx
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import type { Todo } from "../../types/todo";

type Props = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  const secondary = `${todo.subject} · Priority ${todo.priority} · ${todo.date}`;

  return (
    <ListItem
      secondaryAction={
        <Stack direction="row" spacing={0.5}>
          <IconButton edge="end" aria-label="edit" disabled>
            <EditIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => onDelete(todo.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      }
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
      </ListItemIcon>

      <ListItemText
        primary={todo.name}
        secondary={secondary}
        primaryTypographyProps={{
          sx: {
            textDecoration: todo.completed ? "line-through" : "none",
            color: todo.completed ? "text.secondary" : "text.primary",
          },
        }}
      />
    </ListItem>
  );
}
