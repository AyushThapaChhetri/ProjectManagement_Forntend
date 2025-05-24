import Login from "./pages/auth/Login";
import { Routes, Route } from "react-router";
import Home from "./pages/home/Home";
import "@/styles/globals.css";
import SignUp from "./pages/auth/SignUp";
import BoardView from "./pages/board/BoardView";
import "react-datepicker/dist/react-datepicker.css"; // Default styles first
import "./styles/date-picker-overrides.css"; // Your overrides last to ensure they apply
// import { Provider } from "./components/ui/provider";

function App() {
  // return <Login />;
  return (
    <Routes>
      <Route index element={<Home />} />
      {/* <Route path="about" element={<About />} /> */}

      {/* <Route element={<AuthLayout />}> */}
      <Route path="login" element={<Login />} />
      <Route path="signUp" element={<SignUp />} />
      <Route path="board" element={<BoardView />} />
      {/* <Route path="register" element={<Register />} /> */}
      {/* </Route> */}

      {/* <Route path="concerts">
    <Route index element={<ConcertsHome />} />
    <Route path=":city" element={<City />} />
    <Route path="trending" element={<Trending />} />
  </Route> */}
    </Routes>
  );
}

export default App;
