import { createBrowserClient } from "@supabase/ssr";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || url === "your-project-url") {
  console.warn(
    "[Assemble] NEXT_PUBLIC_SUPABASE_URL is not set. " +
      "Copy your Project URL from Supabase → Project Settings → API and add it to .env.local."
  );
}

export function createClient() {
  return createBrowserClient(
    url ?? "https://placeholder.supabase.co",
    key ?? "placeholder-key"
  );
}
