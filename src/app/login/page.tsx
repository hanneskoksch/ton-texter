import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { createClient } from "@/lib/supabase/server";
import { Button, Input } from "@nextui-org/react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login",
};

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/dashboard");
  };

  return (
    <MaxWidthWrapper className="mb-12 mt-28 flex flex-col items-center justify-center text-center sm:mt-40">
      <h1 className="mb-6 text-4xl font-bold">Login</h1>
      <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
        <form
          className="flex w-full flex-1 flex-col justify-center gap-2 text-foreground"
          action={signIn}
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

          {searchParams?.message && (
            <p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </MaxWidthWrapper>
  );
}
