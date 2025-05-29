import { ProjectProvider } from "@/components/Cards/context/ProjectProvider";
import { TaskProvider } from "@/components/Cards/context/TaskProvider";
import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const AppProvider = ({ children }: Props) => {
  return (
    <ProjectProvider>
      <TaskProvider>{children}</TaskProvider>
    </ProjectProvider>
  );
};

export default AppProvider;
