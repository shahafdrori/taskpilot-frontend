//src/api/tasksApi.ts
import type { Todo } from "../types/todo";

const DEFAULT_BASE_URL = "/api";

function getBaseUrl() {
  const env = import.meta.env.VITE_API_BASE_URL as string | undefined;
  return env && env.trim() ? env.trim().replace(/\/$/, "") : DEFAULT_BASE_URL;
}

type ApiErrorPayload = {
  error?: { code?: string; message?: string; details?: unknown };
};

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const base = getBaseUrl();
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;

  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });

  if (res.ok) {
    return (await res.json()) as T;
  }

  let message = `Request failed (${res.status})`;
  try {
    const data = (await res.json()) as ApiErrorPayload;
    if (data?.error?.message) message = data.error.message;
  } catch {
    // ignore
  }
  throw new Error(message);
}

export type CreateTodoInput = Omit<Todo, "id">;
export type ReplaceTodoInput = Omit<Todo, "id">;
export type PatchTodoInput = Partial<Omit<Todo, "id">>;

export const tasksApi = {
  list: () => request<Todo[]>("/tasks"),
  getById: (id: string) => request<Todo>(`/tasks/${id}`),

  create: (input: CreateTodoInput) =>
    request<Todo>("/tasks", { method: "POST", body: JSON.stringify(input) }),

  replace: (id: string, input: ReplaceTodoInput) =>
    request<Todo>(`/tasks/${id}`, { method: "PUT", body: JSON.stringify(input) }),

  patch: (id: string, patch: PatchTodoInput) =>
    request<Todo>(`/tasks/${id}`, { method: "PATCH", body: JSON.stringify(patch) }),

  remove: (id: string) =>
    request<{ message: string }>(`/tasks/${id}`, { method: "DELETE" }),
};
