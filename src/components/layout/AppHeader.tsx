//src/components/layout/AppHeader.tsx
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function AppHeader() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">TaskPilot</Typography>
      </Toolbar>
    </AppBar>
  );
}
