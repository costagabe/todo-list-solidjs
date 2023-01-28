import { Route, Router, Routes, useMatch } from "@solidjs/router";
import { Component } from "solid-js";
import { PrivateRoute } from "./components/PrivateRoute";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";

const App: Component = () => {
  return (
    <Routes>
      <PrivateRoute
        path="/"
        element={<Home />}
      />
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/signup"
        element={<Login />}
      />
    </Routes>
  );
};

export default App;
