import { supabase } from "./supabaseClient";

export const USER_FALLBACK_NAME = "Gigora User";

export function getUserDisplayName(user) {
  return (
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email ||
    USER_FALLBACK_NAME
  );
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) return USER_FALLBACK_NAME;
  return getUserDisplayName(data.user);
}
