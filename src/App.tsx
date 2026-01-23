//src/App.tsx
import { CssBaseline } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import AppHeader from "./components/layout/AppHeader";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";

export default function App() {
  return (
    <>
      <CssBaseline />
      <AppHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

