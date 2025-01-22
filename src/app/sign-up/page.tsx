"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, Input } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { signup } from "./actions";

export default function Login() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  return (
    <MaxWidthWrapper className="mb-8 mt-28 flex flex-col items-center justify-center text-center sm:mt-40">
      <h1 className="mb-6 text-4xl font-bold">Registrieren</h1>
      <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
        <form
          className="flex w-full flex-1 flex-col justify-center gap-2 text-foreground"
          action={signup}
        >
          <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
            <Input
              name="email"
              type="email"
              label="E-Mail"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
            <Input
              name="password"
              type="password"
              label="Passwort"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
            <Input
              name="invitationCode"
              type="password"
              label="Einladungscode"
              placeholder="••••••••"
              required
            />
          </div>

          <Button className="mt-4 bg-primary p-2 text-white" type="submit">
            Registrieren
          </Button>

          {message && (
            <p className="mt-4 rounded-md bg-foreground/10 p-4 text-center text-foreground">
              {message}
            </p>
          )}
        </form>
      </div>
    </MaxWidthWrapper>
  );
}
