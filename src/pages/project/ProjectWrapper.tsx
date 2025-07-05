import { useParams } from "react-router";
import Project from "./Project";

export default function ProjectWrapper() {
  const { projectUid } = useParams<{ projectUid: string }>();
  if (!projectUid) return null;
  return <Project projectUid={projectUid} />;
}
