import { useNavigate } from "@solidjs/router";
import { Button, Grid, Stack, TextField } from "@suid/material";
import { AuthResponse } from "@supabase/supabase-js";
import { Component, createEffect } from "solid-js";
import { useForm } from "../../../contexts/form";
import { ILoginForm } from "../Login";

interface iFormProps {}
export const Form: Component<iFormProps> = () => {
  const [state, actions] = useForm<ILoginForm, AuthResponse>();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const { data, error } = await actions.submit();
    if (!error) {
      navigate("/");
    }
  };
  return (
    <form
      onsubmit={(e) => {
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
          Login {state.loading}
        </Button>
        {state.hasError && <span> Deu ruim</span>}
        <Grid
          container
          justifyContent="space-between">
          <Grid
            item
            md="auto">
            <Button color="primary">Forgot password?</Button>
          </Grid>
          <Grid
            item
            md="auto">
            <Button color="primary">Create account</Button>
          </Grid>
        </Grid>
      </Stack>
    </form>
  );
};
