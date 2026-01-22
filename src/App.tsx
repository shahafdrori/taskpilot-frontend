//src/App.tsx
import { CssBaseline } from "@mui/material";
import AppHeader from "./components/layout/AppHeader";
import TodoPage from "./components/todos/TodoPage";

export default function App() {
  return (
    <>
      <CssBaseline />
      <AppHeader />
      <TodoPage />
    </>
  );
}
