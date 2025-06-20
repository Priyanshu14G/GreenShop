import { createClient } from "./supabase/Client";

// Create a singleton instance for client-side usage
let supabaseInstance = null;

export const supabase = (() => {
  if (typeof window === "undefined") {
    // Server-side: create new instance each time
    return createClient();
  }

  // Client-side: use singleton
  if (!supabaseInstance) {
    supabaseInstance = createClient();
  }
  return supabaseInstance;
})();

export default supabase;