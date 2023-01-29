import { Route, Router, Routes, useMatch } from "@solidjs/router";
import { Typography } from "@suid/material";
import { Component } from "solid-js";
import { Toaster } from "solid-toast";
import { PrivateRoute } from "./components/PrivateRoute";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";

const App: Component = () => {
  return (
    <>
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
      <Typography>
        <Toaster />
      </Typography>
    </>
  );
};

export default App;
