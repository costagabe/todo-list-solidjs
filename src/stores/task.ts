import { Setter } from "solid-js";
import { createSignal, createRoot } from "solid-js";
import { createStore, produce } from "solid-js/store";
import toast from "solid-toast";
import { iTaskForm } from "../pages/Home/components/Form";
import { TaskService } from "../services/TaskService";
import { Database } from "../utils/types/Database";
import { useAuthStore } from "./auth";

export type Task = Database["public"]["Tables"]["task"]["Row"];

const initialTaskValue: iTaskForm = { description: "", name: "", status: "pending", id: null };

function createUseTask() {
  const [loading, setLoading] = createSignal(false);
  const [tasks, setTasks] = createStore<Task[]>([]);
  const [showFinished, setShowFinished] = createSignal(false);
  const [selectedTask, setSelectedTask] = createSignal<iTaskForm>(initialTaskValue);
  const [selectedField, setSelectedField] = createSignal<string | null>(null);


  async function fetchAll() {
    setLoading(true);
    const { data, error } = await TaskService.fetchTasks(showFinished())!;

    const mappedTasks = data.flatMap((v) => {
      return v.task.map((t) => {
        const [checked, setChecked] = createSignal(t.status === "done");
        return { ...t, checked, setChecked };
      });
    });

    setTasks(() => mappedTasks ?? []);
    setLoading(false);
    if (error) {
      return;
    }
  }

  async function updateTask(task: iTaskForm, id: number) {
    setLoading(true);
    const { data, error } = await TaskService.updateTask(id, task);
    setLoading(false);
    setSelectedField(null);
    setSelectedTask(initialTaskValue);
    if (error) {
      return;
    }
    fetchAll();
    toast.success("Task updated successfully");

    return { data, error }
  }

  async function createTask(task: iTaskForm) {

    if (selectedTask().id) return updateTask(selectedTask() as iTaskForm, selectedTask()?.id!);
    setLoading(true);
    const { userId } = useAuthStore;
    if (!userId()) return;
    const newTask = {
      name: task.name,
      description: task.description,
      status: "pending",
      owner: userId()!,
      due_date: new Date().toISOString()
    }
    const { data, error } = await TaskService.createTask(newTask);
    setLoading(false);
    if (error) {
      return;
    }
    setSelectedTask(initialTaskValue);
    setSelectedField(null);
    toast.success("Task created successfully");
    fetchAll();
  }

  async function deleteTask(id: number) {
    setLoading(true);
    const { data, error } = await TaskService.deleteTask(id);
    setLoading(false);
    if (error) {
      return;
    }
    fetchAll();
    setSelectedTask(initialTaskValue);
    setSelectedField(null);
    toast.success("Task deleted successfully");
  }

  return {
    fetchAll,
    loading,
    tasks,
    updateTask,
    showFinished,
    setShowFinished,
    createTask,
    selectedTask,
    setSelectedTask,
    selectedField,
    setSelectedField,
    deleteTask
  };
}

export const useTaskStore = createRoot(createUseTask);
