import Login from "./pages/auth/Login";
import { Routes, Route } from "react-router";
import Home from "./pages/home/Home";
import "@/styles/globals.css";
// import { Provider } from "./components/ui/provider";

function App() {
  // return <Login />;
  return (
    <Routes>
      <Route index element={<Home />} />
      {/* <Route path="about" element={<About />} /> */}

      {/* <Route element={<AuthLayout />}> */}
      <Route path="login" element={<Login />} />
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
