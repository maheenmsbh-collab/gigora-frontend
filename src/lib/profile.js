import { supabase } from "./supabaseClient";

export async function updateProfileName(fullName) {
  const { data, error } = await supabase.auth.updateUser({
    data: { full_name: fullName.trim() },
  });

  if (error) throw error;
  return data.user;
}

export async function requestPasswordReset(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/login`,
  });

  if (error) throw error;
}
