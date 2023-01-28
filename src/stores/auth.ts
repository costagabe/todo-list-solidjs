import { useNavigate } from "@solidjs/router";
import { createSignal, createRoot, createEffect } from "solid-js";
import toast from "solid-toast";
import { ILoginForm } from "../pages/Login/Login";
import { AuthService } from "../services/AuthService";
import { supabase } from "../utils/SupabaseClient";


const publicRoutes = ["/login", "/register"];
function createUseAuth() {
  const [loading, setLoading] = createSignal(false);
  const [userUUID, setUserUUID] = createSignal<String>();
  const [userId, setUserId] = createSignal<number>();

  //Pathname is the current path path is the path to protect came from the route
  async function protectRoute(pathName: string, path: string) {
    if (pathName !== path) return;

    setLoading(true);

    const navigate = useNavigate();

    const { data, error } = await supabase.auth.getSession();
    setLoading(false);
    if (error || !data || !data.session) {
      if (!publicRoutes.includes(pathName)) {
        navigate("/login");
      }
      return;
    }
    setUserUUID(data.session.user.id)

    if (publicRoutes.includes(path)) {
      navigate("/");
    }
  }

  async function signIn({ email, password }: ILoginForm) {
    setLoading(true);

    const res = await AuthService.signIn({ email, password });
    setLoading(false);
    if (!res.error) {
      setUserUUID(res.data.user!.id)
    } else {
      if (res.error.message === "Email not confirmed") {
        toast.error("Please verify your email")
        return;
      }
      toast.error("Invalid credentials");
    }

    return res;
  }

  async function signOut() {
    setLoading(true);
    await AuthService.signOut();
    setUserUUID(undefined)
    setLoading(false);
  }

  async function signUp({ email, password }: ILoginForm) {
    setLoading(true);
    const res = await AuthService.signUp({ email, password });
    if (!res.error) {
      setUserUUID(res.data.user!.id)
    }
    toast.success("User created successfully, please verify your email")
    setLoading(false);

    return res;
  }

  createEffect(() => {
    if (!userUUID()) return;
    supabase
      .from("user_table")
      .select("id")
      .filter("uuid", "eq", userUUID()).then(({ data, error }) => {
        if (!error) {
          setUserId(data![0].id);
        }
      });
  })

  return { signIn, loading, protectRoute, signOut, signUp, userUUID, userId };
}

export const useAuthStore = createRoot(createUseAuth);
