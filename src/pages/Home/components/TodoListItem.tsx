import { Box, Checkbox, Grid, Paper, Stack, Typography } from "@suid/material";
import { Component, createEffect, createSignal, Suspense } from "solid-js";
import { Task, useTaskStore } from "../../../stores/task";
import type { ITaksFormStatus } from "./Form";

export interface ITodoListItemProps {
  task: Task;
}

export const TodoListItem: Component<ITodoListItemProps> = (props) => {
  const { updateTask, loading, setSelectedTask, setSelectedField } =
    useTaskStore;
  const [field, sedField] = createSignal("");
  const handleChange = async () => {
    const statusObj = { done: "pending", pending: "done" };
    const status = statusObj[
      props.task.status as keyof typeof statusObj
    ] as ITaksFormStatus;

    await updateTask(
      {
        description: props.task.description ?? "",
        name: props.task.name,
        status: status,
      },
      props.task.id
    );
  };
  const checked = () => props.task.status === "done";

  function handleClick(e: MouseEvent, field: string) {
    if (e.detail === 2) {
      sedField(field);
    }
  }

  createEffect(() => {
    if (field) {
      setSelectedField("");
      setSelectedField(field);
    }
    setSelectedTask({
      description: props.task.description ?? "",
      name: props.task.name,
      status: props.task.status as ITaksFormStatus,
      id: props.task.id,
    });
  });
  return (
    <Grid
      item
      md={12}
      component="div">
      <Paper>
        <Box
          justifyContent="space-between"
          alignItems="center"
          sx={{ display: "flex" }}>
          <Suspense>
            <Stack
              direction="row"
              justifyContent="space-between"
              flex="1"
              classList={{ pending: loading() }}
              component="div"
              onClick={(e) => handleClick(e, "")}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  bgcolor: "grey.300",
                },
              }}>
              <div style={{ display: "flex", flex: "1", "flex-wrap": "wrap" }}>
                <Typography
                  component="div"
                  variant="h6"
                  sx={{ p: 1, flexBasis: "100%" }}
                  onClick={(e) => handleClick(e, "name")}>
                  {props.task.name}
                </Typography>
                <Typography
                  component="div"
                  variant="caption"
                  sx={{ p: 1, flexBasis: "100%" }}
                  onClick={(e) => handleClick(e, "description")}>
                  {props.task.description}
                </Typography>
              </div>
              <Checkbox
                value={checked()}
                checked={checked()}
                onChange={handleChange}
              />
            </Stack>
          </Suspense>
        </Box>
      </Paper>
    </Grid>
  );
};
