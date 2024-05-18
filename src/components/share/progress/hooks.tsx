import { useContext } from "react";
import { ProgressContext } from "./ProgressProvider";

export function useProgresses() {
  return useContext(ProgressContext).progresses;
}

export function useProgress(id: string) {
  const progresses = useProgresses();
  return progresses.find((progress) => progress.getId() === id);
}
