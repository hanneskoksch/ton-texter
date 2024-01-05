import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button, Link as LinkNextUI } from "@nextui-org/react";
import LogoutButton from "./LogoutButton";
export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4">
      <Button color="primary" size="sm" as={LinkNextUI} href="/dashboard">
        Dashboard
      </Button>
      <LogoutButton signOut={signOut} />
    </div>
  ) : (
    <div>
      <Button
        className="mr-3"
        as={LinkNextUI}
        color="primary"
        href="/login"
        variant="bordered"
        size="sm"
      >
        Login
      </Button>
      <Button
        as={LinkNextUI}
        color="primary"
        href="/sign-up"
        variant="solid"
        size="sm"
      >
        Registrieren
      </Button>
    </div>
  );
}
