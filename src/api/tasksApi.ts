import type { Todo } from "../types/todo";

const DEFAULT_BASE_URL = "/api"; // export to a constants file

const getBaseUrl = (): string => {
  const env = import.meta.env.VITE_API_BASE_URL as string | undefined;

  return env?.trim()
    ? env.trim().replace(/\/$/, "")
    : DEFAULT_BASE_URL;
};

type ApiErrorPayload = {
  error?: {
    code?: string;
    message?: string;
    details?: unknown;
  };
};

// try not using T in this whole function
const request = async <T>(
  path: string,
  init: RequestInit = {},
): Promise<T> => {
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

  const defaultMessage = `Request failed (${res.status})`;

  try {
    const data = (await res.json()) as ApiErrorPayload;

    throw new Error(
      data.error?.message
        ? data.error.message
        : defaultMessage,
    );
  } catch (error) {
    throw error instanceof Error && error.message !== "Unexpected end of JSON input"
      ? error
      : new Error(defaultMessage);
  }
};

export type CreateTodoInput = Omit<Todo, "id">;
export type ReplaceTodoInput = Omit<Todo, "id">;
export type PatchTodoInput = Partial<Omit<Todo, "id">>;

export const tasksApi = {
  list: (): Promise<Todo[]> =>
    request<Todo[]>("/tasks"),

  getById: (id: string): Promise<Todo> =>
    request<Todo>(`/tasks/${id}`),

  create: (input: CreateTodoInput): Promise<Todo> =>
    request<Todo>("/tasks", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  replace: (id: string, input: ReplaceTodoInput): Promise<Todo> =>
    request<Todo>(`/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(input),
    }),

  patch: (id: string, patch: PatchTodoInput): Promise<Todo> =>
    request<Todo>(`/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(patch),
    }),

  remove: (id: string): Promise<{ message: string }> =>
    request<{ message: string }>(`/tasks/${id}`, {
      method: "DELETE",
    }),
};

export default tasksApi;