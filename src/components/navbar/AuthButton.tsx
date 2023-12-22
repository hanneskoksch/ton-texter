import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button, Link as LinkNextUI } from "@nextui-org/react";
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
      Hey, {user.email}!
      <form action={signOut}>
        <Button type="submit" color="danger" size="sm">
          Logout
        </Button>
      </form>
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
