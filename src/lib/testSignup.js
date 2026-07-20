import { supabase } from "./supabaseClient";

window.testSignup = async () => {
  const response = await supabase.auth.signUp({
    email: "random123456789@gmail.com",
    password: "Password123!",
  });

  console.log(response);
};