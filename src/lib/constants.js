export const APP_NAME = "Gigora";
export const PREFERENCES_KEY = "gigora-preferences";

export const environmentStatus = {
  supabaseUrl: Boolean(process.env.REACT_APP_SUPABASE_URL),
  supabaseKey: Boolean(process.env.REACT_APP_SUPABASE_ANON_KEY),
  geminiKey: Boolean(process.env.REACT_APP_GEMINI_API_KEY),
};

export const hasSupabaseConfiguration =
  environmentStatus.supabaseUrl && environmentStatus.supabaseKey;
