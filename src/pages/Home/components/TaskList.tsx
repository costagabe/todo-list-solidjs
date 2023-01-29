import { Grid, Stack, Switch, Typography, useTheme } from "@suid/material";
import { Component, For, Suspense } from "solid-js";
import { useTaskStore } from "../../../stores/task";
import { TodoListItem } from "./TodoListItem";

export const TaskList: Component = () => {
  const theme = useTheme();
  const { tasks, showFinished, setShowFinished } = useTaskStore;

  return (
    <Grid
      container
      mt={2}
      gap={2}
      p={2}
      sx={{
        backgroundColor: theme.palette.grey.A100,
        boxShadow: theme.shadows[1],
        borderRadius: "5px",
      }}>
      <Suspense>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flex={1}
          component="div">
          <Typography variant="body1">Double click to edit</Typography>
          <Stack
            direction="row"
            alignItems="center">
            <Typography>Show Finished </Typography>
            <Switch
              value={showFinished()}
              onChange={() => setShowFinished((v) => !v)}
            />
          </Stack>
        </Stack>
      </Suspense>
      <For each={tasks}>{(task) => <TodoListItem task={task} />}</For>
    </Grid>
  );
};
