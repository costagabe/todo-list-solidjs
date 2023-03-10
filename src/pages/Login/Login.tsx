import { useLocation } from "@solidjs/router";
import { Box, Container, Paper, Stack, Typography } from "@suid/material";
import { ContainerProps } from "@suid/material/Container";
import { PaperProps } from "@suid/material/Paper";
import { AuthResponse } from "@supabase/supabase-js";
import { Component } from "solid-js";
import { TheAppBar } from "../../components/TheAppBar";
import { TheFooter } from "../../components/TheFooter";
import { FormProvider } from "../../contexts/form";
import { useAuthStore } from "../../stores/auth";
import { Form } from "./components/Form";

export interface ILoginForm {
  email: string;
  password: string;
}

export const LoginFormHeader = () => {
  const location = useLocation();
  return (
    <Paper
      sx={{
        bgcolor: "primary.main",
        padding: 2,
        borderEndEndRadius: 0,
        borderEndStartRadius: 0,
      }}>
      <Typography
        variant="h6"
        component="div"
        color={"primary.contrastText"}>
        {location.pathname === "/login" ? "Login" : "Sign Up"}
      </Typography>
    </Paper>
  );
};

export const CenteredContainer: Component<ContainerProps> = (props) => {
  return (
    <Container
      sx={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flex: "1 0",
        flexDirection: "column",
      }}
      {...props}
    />
  );
};

export const LoginFormFieldsContainer: Component<PaperProps> = (props) => {
  return (
    <Paper
      sx={{ p: 2, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
      {...props}
    />
  );
};

export const LoginFormContainer: Component = () => {
  const auth = useAuthStore;
  const location = useLocation();
  return (
    <Box sx={{ display: "flex", flex: "1 0" }}>
      <CenteredContainer>
        <Stack
          spacing={0}
          width={400}>
          <LoginFormHeader />
          <LoginFormFieldsContainer>
            <FormProvider<ILoginForm, Promise<AuthResponse>>
              submit={
                location.pathname === "/login" ? auth.signIn : auth.signUp
              }
              initialState={{
                email: "",
                password: "",
              }}>
              <Form />
            </FormProvider>
          </LoginFormFieldsContainer>
        </Stack>
      </CenteredContainer>
    </Box>
  );
};

export const Login: Component = () => {
  return (
    <>
      <TheAppBar />
      <LoginFormContainer />
      <TheFooter />
    </>
  );
};
