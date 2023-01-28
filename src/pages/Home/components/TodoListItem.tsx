import { Box, Checkbox, Grid, Paper, Stack, Typography } from "@suid/material";
import { Component, createEffect, onMount, Setter, Suspense } from "solid-js";
import { Task, useTaskStore } from "../../../stores/task";
import { supabase } from "../../../utils/SupabaseClient";
import { iTaskForm } from "./Form";

export interface ITodoListItemProps {
  task: Task;
}

export const TodoListItem: Component<ITodoListItemProps> = ({ task }) => {
  const { updateTask, loading, setSelectedTask, setSelectedField } =
    useTaskStore;
  const handleChange = async () => {
    const status = { done: "pending", pending: "done" }[task.status]! as
      | "done"
      | "pending";

    await updateTask(
      { description: task.description!, name: task.name, status: status! },
      task.id
    );
  };
  const checked = () => task.status === "done";

  function handleClick(e: MouseEvent, field: string) {
    if (e.detail === 2) {
      setSelectedTask((v) => ({
        description: task.description!,
        name: task.name,
        status: task.status! as "done" | "pending",
        id: task.id,
      }));
      if (!!field) {
        setSelectedField("");
        setSelectedField(field);
      }
    }
  }
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
                  {task.name}
                </Typography>
                <Typography
                  component="div"
                  variant="caption"
                  sx={{ p: 1, flexBasis: "100%" }}
                  onClick={(e) => handleClick(e, "description")}>
                  {task.description}
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
