import { ILoginForm } from "../pages/Login/Login";
import { supabase } from "../utils/SupabaseClient";

export class AuthService {
  public static async signIn({ email, password }: ILoginForm) {
    return await supabase.auth.signInWithPassword({ email, password });
  }

  public static async signUp({ email, password }: ILoginForm) {
    return await supabase.auth.signUp({ email, password });
  }

  public static async signOut() {
    return await supabase.auth.signOut();
  }

}