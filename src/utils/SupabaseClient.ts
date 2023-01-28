import { createClient } from "@supabase/supabase-js";
import { Database } from "./types/Database";

const url = "https://zohajorwfvbnckhjqhbh.supabase.co";
const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvaGFqb3J3ZnZibmNraGpxaGJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ4NTk2NTQsImV4cCI6MTk5MDQzNTY1NH0.A3orxxZfRPvPHklDhPYQu6KZ92zfZAuRP8-PxKi8joQ";
const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvaGFqb3J3ZnZibmNraGpxaGJoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NDg1OTY1NCwiZXhwIjoxOTkwNDM1NjU0fQ.RVfLz4c27aCkXO9A4Mq2B8kV0jSSnM-8UpeX_lRDxqw"
export const supabase = createClient<Database>(url, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
  }
});