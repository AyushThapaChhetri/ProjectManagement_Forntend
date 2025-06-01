import Login from "./pages/auth/Login";
import { Routes, Route } from "react-router";
import Home from "./pages/home/Home";
import "@/styles/globals.css";
import SignUp from "./pages/auth/SignUp";
import Body from "./pages/workspace/Body";
import "react-datepicker/dist/react-datepicker.css"; // Default styles first
import "./styles/date-picker-overrides.css"; // Your overrides last to ensure they apply
import Board from "./pages/board/Board";
import ProjectWrapper from "./pages/project/ProjectWrapper";

function App() {
  // return (
  //   <Routes>
  //     <Route index element={<Home />} />

  //     <Route path="login" element={<Login />} />
  //     <Route path="signUp" element={<SignUp />} />
  //     <Route path="body" element={<Body />} />
  //   </Routes>
  // );
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signUp" element={<SignUp />} />
      {/* workspace shell */}
      <Route path="body/*" element={<Body />}>
        {/* nested routes for the right‐pane */}
        <Route index element={<Board />} />
        <Route path="project/:projectId" element={<ProjectWrapper />} />
      </Route>
    </Routes>
  );
}

export default App;
