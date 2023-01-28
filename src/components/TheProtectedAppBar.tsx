import { useNavigate } from "@solidjs/router";
import { Button, Typography, useTheme } from "@suid/material";
import { Component } from "solid-js";
import { useAuthStore } from "../stores/auth";
import { TheAppBar } from "./TheAppBar";

export const TheProtectedAppBar: Component = () => {
  const auth = useAuthStore;
  const navigate = useNavigate();
  const theme = useTheme();

  async function handleClick() {
    await auth.signOut();
    navigate("/login");
  }
  return (
    <TheAppBar>
      <Button
        color="primary"
        variant="outlined"
        sx={{ "&:hover": { backgroundColor: theme.palette.primary.dark } }}
        onclick={handleClick}>
        <Typography color="primary.contrastText">Logout</Typography>
      </Button>
    </TheAppBar>
  );
};
