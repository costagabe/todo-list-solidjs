import { Button, Stack, TextField } from "@suid/material";
import { Component, createEffect, Show } from "solid-js";
import { produce } from "solid-js/store";
import { useForm } from "../../../contexts/form";
import { useTaskStore } from "../../../stores/task";

export interface iTaskForm {
  name: string;
  description: string;
  status?: "done" | "pending";
  id?: number | null;
}

export const Form: Component = () => {
  const [state, actions] = useForm<iTaskForm, any>();
  const { selectedTask, selectedField, setSelectedTask } = useTaskStore;
  const fields = { name: null as any, description: null as any };

  createEffect(() => {
    if (selectedTask()) {
      actions.setState("name", selectedTask()!.name!);
      actions.setState("description", selectedTask()!.description!);
    }
  });

  createEffect(() => {
    if (selectedField()) {
      fields[selectedField() as keyof typeof fields].focus();
    }
  });

  createEffect(() => {
    if (selectedTask() && selectedTask()!.id) {
      setSelectedTask(
        produce((task) => {
          task.description = state.description;
          task.name = state.name;
          task.status = state.status;
        })
      );
    }
  });

  return (
    <form
      style={{ display: "flex", flex: 1 }}
      onsubmit={(e) => {
        e.preventDefault();
        actions.submit();
        actions.setState((v) => ({
          description: "",
          name: "",
        }));
      }}>
      <Stack
        spacing={2}
        direction="row"
        flex={1}>
        <TextField
          size="medium"
          label="Title"
          sx={{ flex: "1" }}
          value={state.name}
          inputRef={(el) => {
            fields.name = el;
          }}
          required
          onChange={({ target: { value } }) => {
            actions.setState("name", value);
          }}
        />
        <TextField
          size="medium"
          label="Description"
          value={state.description}
          inputRef={(el) => (fields.description = el)}
          required
          onChange={({ target: { value } }) => {
            actions.setState("description", value);
          }}
          sx={{ flex: "2" }}
        />
        <Show when={selectedTask().id}>
          <Button
            variant="contained"
            color="error">
            Delete
          </Button>
        </Show>
        <Button
          variant="contained"
          type="submit">
          submit
        </Button>
      </Stack>
    </form>
  );
};
