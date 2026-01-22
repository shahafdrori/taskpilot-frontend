//src/components/todos/TodoToolbar.tsx
import { Button, FormControlLabel, Stack, Switch, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;

  hideDone: boolean;
  onHideDoneChange: (value: boolean) => void;
};

export default function TodoToolbar({
  search,
  onSearchChange,
  hideDone,
  onHideDoneChange,
}: Props) {
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={{ flexWrap: "wrap" }}
    >
      <TextField
        size="small"
        label="Search"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ flex: 1, minWidth: 220 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={hideDone}
            onChange={(e) => onHideDoneChange(e.target.checked)}
          />
        }
        label="Hide done"
      />

      <Button variant="contained" startIcon={<AddIcon />} disabled>
        Add
      </Button>
    </Stack>
  );
}
