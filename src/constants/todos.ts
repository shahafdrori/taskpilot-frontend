//src/constants/todos.ts
export const TODO_SUBJECTS = ["Work", "Study", "Personal", "Health"] as const;
export type TodoSubject = (typeof TODO_SUBJECTS)[number];

export const TODO_PRIORITIES = [1,2,3,4,5,6,7,8,9,10] as const;

export function getTodayISODate() {
  return new Date().toISOString().slice(0, 10);
}
