//src/components/todos/TodoToolbar.tsx
import { Button, IconButton, Stack, TextField, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
};

export default function TodoToolbar({ search, onSearchChange }: Props) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <TextField
        size="small"
        fullWidth
        label="Search"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
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
