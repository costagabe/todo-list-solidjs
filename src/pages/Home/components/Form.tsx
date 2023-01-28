import { Button, Stack, TextField, Typography } from "@suid/material";
import { Component, createEffect, createSignal, Show } from "solid-js";
import { produce } from "solid-js/store";
import { ConfirmDialog } from "../../../components/ConfirmDialog";
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
  const { selectedTask, selectedField, setSelectedTask, deleteTask } =
    useTaskStore;
  const [showModal, setShowModal] = createSignal(false);
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

  async function confirmDelete(value: boolean) {
    if (value) {
      await deleteTask(selectedTask()!.id!);
    }
  }

  return (
    <>
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
              color="error"
              onClick={() => setShowModal(true)}>
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
      <ConfirmDialog
        onClose={confirmDelete}
        open={showModal}
        setOpen={setShowModal}
        title="Delete Task">
        <Typography>Are you sure you want to delete this task?</Typography>
      </ConfirmDialog>
    </>
  );
};
