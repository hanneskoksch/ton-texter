import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { createClient } from "@/lib/supabase/server";
import { getURL } from "@/lib/utils";
import { Button, Input } from "@nextui-org/react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Registrieren",
};

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signUp = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const invitationCode = formData.get("invitationCode") as string;

    if (invitationCode !== process.env.INVITATION_CODE) {
      return redirect("/sign-up?message=Ungültiger Einladungscode");
    }

    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${getURL()}auth/confirm`,
      },
    });

    if (error) {
      return redirect(
        "/sign-up?message=Benutzer konnte nicht authentifiziert werden",
      );
    }

    return redirect(
      "/sign-up?message=Bitte überprüfen Sie Ihre E-Mails, um den Anmeldevorgang fortzusetzen",
    );
  };

  return (
    <MaxWidthWrapper className="mb-8 mt-28 flex flex-col items-center justify-center text-center sm:mt-40">
      <h1 className="mb-6 text-4xl font-bold">Registrieren</h1>
      <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
        <form
          className="animate-in flex w-full flex-1 flex-col justify-center gap-2 text-foreground"
          action={signUp}
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

          {searchParams?.message && (
            <p className="mt-4 rounded-md bg-foreground/10 p-4 text-center text-foreground">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </MaxWidthWrapper>
  );
}
