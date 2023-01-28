import { Box, Paper, Stack, Typography, useTheme } from "@suid/material";
import {
  Accessor,
  Component,
  createEffect,
  Setter,
  Suspense,
  useTransition,
} from "solid-js";
import { TheFooter } from "../../components/TheFooter";
import { TheProtectedAppBar } from "../../components/TheProtectedAppBar";
import { FormProvider } from "../../contexts/form";
import { useAuthStore } from "../../stores/auth";
import { Task, useTaskStore } from "../../stores/task";
import { CenteredContainer } from "../Login/Login";
import { Form, iTaskForm } from "./components/Form";
import { TaskList } from "./components/TaskList";

export type TaskSignal = Task & {
  checked: Accessor<boolean>;
  setChecked: Setter<boolean>;
};

export const Home: Component = () => {
  const auth = useAuthStore;

  const { fetchAll, createTask, selectedTask } = useTaskStore;

  createEffect(() => {
    const id = auth.userUUID();
    if (id) {
      fetchAll();
    }
  });

  async function handleSubmit(values: iTaskForm) {
    await createTask(values);
    fetchAll();
  }

  return (
    <>
      <TheProtectedAppBar />
      <CenteredContainer>
        <Stack
          justifyContent="flex-start"
          height="100%"
          width="100%"
          direction="column">
          <Paper sx={{ p: 2, mt: 8 }}>
            <Box>
              <Typography variant="h6">Add new</Typography>
              <FormProvider<iTaskForm, any>
                submit={handleSubmit}
                initialState={selectedTask()}>
                <Form />
              </FormProvider>
            </Box>
          </Paper>
          <TaskList />
        </Stack>
      </CenteredContainer>
      <TheFooter />
    </>
  );
};
