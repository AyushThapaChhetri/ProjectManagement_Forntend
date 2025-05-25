import { TaskContext } from "@/components/Cards/context/TaskContext";
import { useContext } from "react";

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
}
