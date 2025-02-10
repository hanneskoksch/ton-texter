"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SearchParamsMessage from "@/components/SearchParamsMessage";
import { Button, Input } from "@heroui/react";
import { Suspense } from "react";
import { login } from "./actions";

export default function Login() {
  return (
    <MaxWidthWrapper className="mb-12 mt-28 flex flex-col items-center justify-center text-center sm:mt-40">
      <h1 className="mb-6 text-4xl font-bold">Login</h1>
      <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
        <form
          className="flex w-full flex-1 flex-col justify-center gap-2 text-foreground"
          action={login}
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

          <Button className="mt-4 bg-primary p-2 text-white" type="submit">
            Login
          </Button>

          <Suspense>
            <SearchParamsMessage />
          </Suspense>
        </form>
      </div>
    </MaxWidthWrapper>
  );
}
