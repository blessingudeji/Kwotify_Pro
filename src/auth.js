import { createClient } from "@supabase/supabase-js";

const options = {
  db: {
    schema: "public",
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: { "x-my-custom-header": "my-app-name" },
  },
};
const supabase = createClient(
  "https://mfufugiokobwxmtqflba.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mdWZ1Z2lva29id3htdHFmbGJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI5MzUwOTMsImV4cCI6MjAxODUxMTA5M30.I77uLa_EfkTl6ugLqeFXyB8sMNdrl1pETfLfvYo_haU",
  options
);

export default supabase;
