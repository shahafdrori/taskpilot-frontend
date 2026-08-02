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

const AppHeader = () => {
  const location = useLocation();
  const active = getActiveTab(location.pathname);

  // dont use static position
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
          {routes.map((route) => (
            <Tab key={route.to} label={route.label} component={RouterLink} to={route.to} />
          ))}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader
