// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
// const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// export const supabase = createClient(
//   supabaseUrl,
//   supabaseAnonKey
// );
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

console.log("SUPABASE URL:", supabaseUrl);
console.log(
  "SUPABASE KEY:",
  supabaseAnonKey ? supabaseAnonKey.substring(0, 25) + "..." : "undefined"
);

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);