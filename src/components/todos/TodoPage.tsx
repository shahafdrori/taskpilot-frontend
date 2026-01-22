//src/components/todos/TodoPage.tsx
import { Box, Container, Paper } from "@mui/material";
import { MOCK_TODOS } from "../../data/mockTodos";
import TodoList from "./TodoList";
import TodoToolbar from "./TodoToolbar";

export default function TodoPage() {
  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <TodoToolbar />
      <Paper sx={{ mt: 2 }}>
        <Box sx={{ p: 1 }}>
          <TodoList todos={MOCK_TODOS} />
        </Box>
      </Paper>
    </Container>
  );
}
