/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import App from "./App";
import { Router } from "@solidjs/router";
import { Toaster } from "solid-toast";
import { Typography } from "@suid/material";

render(
  () => (
    <Router>
      <App />
      <Typography>
        <Toaster />
      </Typography>
    </Router>
  ),
  document.getElementById("root") as HTMLElement
);
