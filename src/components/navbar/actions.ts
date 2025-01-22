"use server";

import { createClient } from "@/lib/supabase/server";

export const logOut = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
};

export const getUser = async () => {
  const supabase = await createClient();
  return await supabase.auth.getUser();
};
