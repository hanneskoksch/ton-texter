"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { getURL } from "@/utils/utils";

export async function signup(formData: FormData) {
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const invitationCode = formData.get("invitationCode") as string;

  if (invitationCode !== process.env.INVITATION_CODE) {
    return redirect("/sign-up?message=Ungültiger Einladungscode");
  }

  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      emailRedirectTo: `${getURL()}auth/confirm`,
    },
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return redirect("/sign-up?message=Benutzer konnte nicht erstellt werden");
  }

  revalidatePath("/", "layout");
  return redirect(
    "/sign-up?message=Bitte überprüfen Sie Ihre E-Mails, um den Anmeldevorgang fortzusetzen",
  );
}
