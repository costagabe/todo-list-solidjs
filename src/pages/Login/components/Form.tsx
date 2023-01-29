import { useLocation, useNavigate } from "@solidjs/router";
import { Button, Grid, Stack, TextField } from "@suid/material";
import { AuthResponse } from "@supabase/supabase-js";
import { Component, Show } from "solid-js";
import { useForm } from "../../../contexts/form";
import { ILoginForm } from "../Login";

export const Form: Component = () => {
  const [state, actions] = useForm<ILoginForm, AuthResponse>();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async () => {
    const { error } = await actions.submit();
    if (!error) {
      navigate("/");
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
      <Stack spacing={2}>
        <TextField
          label="Email"
          type="email"
          placeholder="Email"
          variant="outlined"
          fullWidth
          size="medium"
          value={state.email}
          onChange={({ target: { value } }) => {
            actions.setState((prev) => ({ ...prev, email: value }));
          }}
        />
        <TextField
          label="Password"
          type="password"
          placeholder="Password"
          variant="outlined"
          fullWidth
          size="medium"
          value={state.password}
          onChange={({ target: { value } }) => {
            actions.setState((prev) => ({ ...prev, password: value }));
          }}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          fullWidth
          disabled={state.loading}>
          {location.pathname === "/login" ? "Login" : "Sign Up"}
        </Button>

        <Show when={location.pathname === "/login"}>
          <Grid
            container
            justifyContent="space-between">
            <Grid
              item
              md="auto">
              <Button
                onClick={() => alert("To be implemented")}
                color="primary">
                Forgot password?
              </Button>
            </Grid>
            <Grid
              item
              md="auto">
              <Button
                color="primary"
                onClick={() => navigate("/signup")}>
                Create account
              </Button>
            </Grid>
          </Grid>
        </Show>
      </Stack>
    </form>
  );
};
