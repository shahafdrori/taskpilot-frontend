//src/pages/AdminPage.tsx
import { Container, Typography } from "@mui/material";

export default function AdminPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h5" fontWeight={600}>
        Admin
      </Typography>
      <Typography sx={{ mt: 1 }}>
        Coming next: table with sorting, search, add, edit, delete.
      </Typography>
    </Container>
  );
}
