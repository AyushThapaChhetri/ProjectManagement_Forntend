import { ProjectContext } from "@/components/Cards/context/ProjectContext";
import { useContext } from "react";

export function useProjectContext() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjectContext must be used within a TaskProvider");
  }
  return context;
}
