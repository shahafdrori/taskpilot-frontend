//src/pages/AdminPage.tsx
import {
  Box,
  Button,
  Checkbox,
  Container,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import { useTodos } from "../context/todos/TodosContext";
import type { Todo } from "../types/todo";
import TodoDialog, { type TodoFormValues } from "../components/todos/TodoDialog";
import { TODO_SUBJECTS, getTodayISODate } from "../constants/todos";
import { useDebounce } from "../hooks/useDebounce";
import { makeId } from "../utils/makeId";

export default function AdminPage() {
  const { todos, toggleTodo, deleteTodo, addTodo, updateTodo } = useTodos();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [editingId, setEditingId] = useState<string | null>(null);

  const editingTodo = editingId
    ? todos.find((t) => t.id === editingId)
    : undefined;

  const openAdd = () => {
    setDialogMode("add");
    setEditingId(null);
    setDialogOpen(true);
  };

  const openEdit = (id: string) => {
    setDialogMode("edit");
    setEditingId(id);
    setDialogOpen(true);
  };

  const closeDialog = () => setDialogOpen(false);

  const initialValues: TodoFormValues =
    dialogMode === "edit" && editingTodo
      ? {
          name: editingTodo.name,
          subject: editingTodo.subject,
          priority: editingTodo.priority,
          date: editingTodo.date,
        }
      : {
          name: "",
          subject: TODO_SUBJECTS[0],
          priority: 5,
          date: getTodayISODate(),
        };

  const handleSubmit = (values: TodoFormValues) => {
    if (dialogMode === "add") {
      addTodo({
        id: makeId(),
        completed: false,
        ...values,
      });
    } else if (dialogMode === "edit" && editingTodo) {
      updateTodo({
        ...editingTodo,
        ...values,
      });
    }
    setDialogOpen(false);
  };

  const columns = useMemo<ColumnDef<Todo>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: (info) => String(info.getValue()),
      },
      {
        accessorKey: "subject",
        header: "Subject",
        cell: (info) => String(info.getValue()),
      },
      {
        accessorKey: "priority",
        header: "Priority",
        cell: (info) => String(info.getValue()),
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: (info) => String(info.getValue()),
      },
      {
        accessorKey: "completed",
        header: "Done",
        cell: ({ row }) => (
          <Checkbox
            checked={row.original.completed}
            onChange={() => toggleTodo(row.original.id)}
          />
        ),
        enableSorting: true,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <Stack direction="row" spacing={0.5}>
            <IconButton aria-label="edit" onClick={() => openEdit(row.original.id)}>
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => deleteTodo(row.original.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        ),
        enableSorting: false,
      },
    ],
    [deleteTodo, toggleTodo]
  );

  const table = useReactTable({
    data: todos,
    columns,
    state: {
      sorting,
      globalFilter: debouncedSearch,
    },
    onSortingChange: setSorting,
    globalFilterFn: (row, _columnId, filterValue) => {
      const v = String(filterValue ?? "").trim().toLowerCase();
      if (!v) return true;
      return row.original.name.toLowerCase().includes(v);
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const rows = table.getRowModel().rows;

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h5" fontWeight={600}>
        Admin
      </Typography>

      <Paper sx={{ mt: 2, p: 2 }}>
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
          <TextField
            size="small"
            label="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flex: 1, minWidth: 260 }}
          />

          <Button variant="contained" startIcon={<AddIcon />} onClick={openAdd}>
            Add todo
          </Button>
        </Stack>

        <TableContainer sx={{ mt: 2 }}>
          <Table size="small">
            <TableHead>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((header) => {
                    const canSort = header.column.getCanSort();
                    const sorted = header.column.getIsSorted();
                    const direction =
                      sorted === "desc" ? "desc" : "asc";

                    return (
                      <TableCell key={header.id}>
                        {header.isPlaceholder ? null : (
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            {canSort ? (
                              <TableSortLabel
                                active={!!sorted}
                                direction={direction}
                                onClick={header.column.getToggleSortingHandler()}
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                              </TableSortLabel>
                            ) : (
                              flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )
                            )}
                          </Box>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id} hover>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}

              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    No todos found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <TodoDialog
        open={dialogOpen}
        mode={dialogMode}
        initialValues={initialValues}
        onClose={closeDialog}
        onSubmit={handleSubmit}
      />
    </Container>
  );
}
