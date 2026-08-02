export const TODO_SUBJECTS = ["Work", "Study", "Personal", "Health"];
export type TodoSubject = (typeof TODO_SUBJECTS)[number];

export const TODO_PRIORITIES = [1,2,3,4,5,6,7,8,9,10];

export function getTodayISODate() { // implicit return
  return new Date().toISOString().slice(0, 10);
}
