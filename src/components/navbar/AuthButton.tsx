import { createClient } from "@/lib/supabase/server";
import { Button, Link as LinkNextUI } from "@nextui-org/react";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default async function AuthButton({ isMobile }: { isMobile?: boolean }) {
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

  const buttonSize = isMobile ? "md" : "sm";

  return user ? (
    <div className="flex items-center gap-4">
      <Button
        fullWidth={isMobile}
        color="primary"
        size={buttonSize}
        as={LinkNextUI}
        href="/dashboard"
      >
        Dashboard
      </Button>
      <LogoutButton signOut={signOut} size={buttonSize} />
    </div>
  ) : (
    <div>
      <Button
        fullWidth={isMobile}
        className={isMobile ? "mb-3" : "mr-2"}
        as={LinkNextUI}
        color="primary"
        href="/login"
        variant="bordered"
        size={buttonSize}
      >
        Login
      </Button>
      <Button
        fullWidth={isMobile}
        as={LinkNextUI}
        color="primary"
        href="/sign-up"
        variant="solid"
        size={buttonSize}
      >
        Registrieren
      </Button>
    </div>
  );
}
