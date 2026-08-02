import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delayMs: number) { // dont use T
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  // dont create timer (a function) inside useEffect, do it outside of possible
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      window.clearTimeout(timer);
    };
  }, [value, delayMs]);

  return debouncedValue;
}
