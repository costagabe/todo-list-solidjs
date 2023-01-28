import { iTaskForm } from "../pages/Home/components/Form";
import { useAuthStore } from "../stores/auth";
import { Task } from "../stores/task";
import { supabase } from "../utils/SupabaseClient";
import { Database } from "../utils/types/Database";

export class TaskService {
  static deleteTask(id: number) {
    return supabase.from('task').delete().match({ id })
  }
  public static async createTask(task: Database["public"]["Tables"]["task"]["Insert"]) {
    return await supabase.from("task").insert(task);
  }

  public static async updateTask(id: number, task: iTaskForm) {
    return await supabase
      .from("task")
      .update({
        description: task.description,
        name: task.name,
        status: task.status,
      })
      .match({ id });

  }

  public static async fetchTasks(showFinished: boolean) {
    const { userUUID } = useAuthStore;
    const id = userUUID();
    let query = supabase
      .from("user_table")
      .select("task!inner(*) ")
      .filter("uuid", "eq", id);

    if (!showFinished) {
      query = query.filter("task.status", "not.eq", "done");
    }
    const { data, error } = await query.order("id", {
      ascending: false,
      foreignTable: "task",
    });
    const data2 = data as Array<{ task: Array<Task> }>;
    return {
      data: data2, error
    };

  }
}