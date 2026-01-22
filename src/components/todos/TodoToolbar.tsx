//src/components/todos/TodoToolbar.tsx
import { Button, IconButton, Stack, TextField, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function TodoToolbar() {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <TextField
        size="small"
        fullWidth
        label="Search"
        placeholder="Static for now"
        disabled
      />
      <Tooltip title="Filters (next step)">
        <span>
          <IconButton disabled>
            <FilterListIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Button variant="contained" startIcon={<AddIcon />} disabled>
        Add
      </Button>
    </Stack>
  );
}
