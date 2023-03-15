import logo from "./logo.svg";
import "./App.css";
import Home from "./Components/Home";
import SignUp from "./Components/Register";
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              currentUser? <Home/>: <Login/>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
