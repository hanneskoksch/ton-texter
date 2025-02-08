"use client";

import { Button, Link as LinkNextUI } from "@nextui-org/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";
import { logOut } from "./actions";

export default function AuthButton({ isMobile }: { isMobile?: boolean }) {
  const [user, setUser] = useState<boolean | null>(null);

  useEffect(() => {
    // Check cookies for user token to conditionally render buttons
    // without
    const isUserLoggedIn = document.cookie
      .split("; ")
      .find((row) => row.startsWith("sb-xhdqftekwkdlwzrouhul-auth-token="));
    setUser(!!isUserLoggedIn);
  });

  const signOut = async () => {
    logOut();
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
