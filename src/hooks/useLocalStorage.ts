"use client";
import { useState, useEffect } from "react";

export default function useLocalStorage<T>(key: string, initialValue: T, suspenseValue: T) {
  const [state, setState] = useState<T>(suspenseValue);

  useEffect(() => {
    try {
      const value = window.localStorage.getItem(key);
      if (value) {
        setState(JSON.parse(value));
      } else {
        setState(initialValue);
      }
    } catch (error) {
      console.error(error);
    }
  }, [key]);

  const setValue = (value: T) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      setState(value);
    } catch (error) {
      console.error(error);
    }
  };

  return [state, setValue] as const;
}
