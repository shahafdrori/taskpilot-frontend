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
};

export default function TodoItem({ todo }: Props) {
  return (
    <ListItem
      secondaryAction={
        <Stack direction="row" spacing={0.5}>
          <IconButton edge="end" aria-label="edit" disabled>
            <EditIcon />
          </IconButton>
          <IconButton edge="end" aria-label="delete" disabled>
            <DeleteIcon />
          </IconButton>
        </Stack>
      }
    >
      <ListItemIcon>
        <Checkbox edge="start" checked={todo.completed} disabled />
      </ListItemIcon>

      <ListItemText
        primary={todo.title}
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
