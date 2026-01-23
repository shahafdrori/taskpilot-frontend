//src/components/layout/AppHeader.tsx
import { AppBar, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

const routes = [
  { label: "Home", to: "/" },
  { label: "Admin", to: "/admin" },
];

function getActiveTab(pathname: string) {
  const idx = routes.findIndex((r) =>
    r.to === "/" ? pathname === "/" : pathname.startsWith(r.to)
  );
  return idx === -1 ? 0 : idx;
}

export default function AppHeader() {
  const location = useLocation();
  const active = getActiveTab(location.pathname);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">TaskPilot</Typography>

        <Tabs
          value={active}
          textColor="inherit"
          indicatorColor="secondary"
          sx={{ ml: 2 }}
        >
          {routes.map((r) => (
            <Tab key={r.to} label={r.label} component={RouterLink} to={r.to} />
          ))}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}

