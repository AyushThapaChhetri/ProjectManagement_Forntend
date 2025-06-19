import { useParams } from "react-router";
import Project from "./Project";

export default function ProjectWrapper() {
  const { projectId } = useParams<{ projectId: string }>();
  if (!projectId) return null;
  return <Project projectId={projectId} />;
}
