import { Button, Stack, TextField, Typography } from "@suid/material";
import { Component, createEffect, createSignal, Show } from "solid-js";
import { produce } from "solid-js/store";
import { ConfirmDialog } from "../../../components/ConfirmDialog";
import { useForm } from "../../../contexts/form";
import { useTaskStore } from "../../../stores/task";

export type ITaksFormStatus = "done" | "pending";
export interface iTaskForm {
  name: string;
  description: string;
  status?: ITaksFormStatus;
  id?: number | null;
}

export const Form: Component = () => {
  const [state, actions] = useForm<iTaskForm, object>();
  const { selectedTask, selectedField, setSelectedTask, deleteTask } =
    useTaskStore;
  const [showModal, setShowModal] = createSignal(false);
  const fields = { name: {} as HTMLElement, description: {} as HTMLElement };

  createEffect(() => {
    if (selectedTask()) {
      actions.setState("name", selectedTask().name);
      actions.setState("description", selectedTask().description);
    }
  });

  createEffect(() => {
    if (selectedField()) {
      fields[selectedField() as keyof typeof fields].focus();
    }
  });

  createEffect(() => {
    if (selectedTask() && selectedTask().id) {
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
    if (value && selectedTask() && selectedTask().id) {
      await deleteTask(selectedTask().id as number);
    }
  }

  return (
    <>
      <form
        style={{ display: "flex", flex: 1 }}
        onSubmit={(e) => {
          e.preventDefault();
          actions.submit();
          actions.setState(() => ({
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
