import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getURL } from "@/lib/utils";
import { Button, Input } from "@nextui-org/react";
import { Metadata } from "next";

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
        "/sign-up?message=Benutzer konnte nicht authentifiziert werden"
      );
    }

    return redirect(
      "/sign-up?message=Bitte überprüfen Sie Ihre E-Mails, um den Anmeldevorgang fortzusetzen"
    );
  };

  return (
    <MaxWidthWrapper className="flex flex-col items-center justify-center mb-8 text-center mt-28 sm:mt-40">
      <h1 className="mb-6 text-4xl font-bold">Registrieren</h1>
      <div className="flex flex-col justify-center flex-1 w-full gap-2 px-8 sm:max-w-md">
        <form
          className="flex flex-col justify-center flex-1 w-full gap-2 animate-in text-foreground"
          action={signUp}
        >
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              name="email"
              type="email"
              label="E-Mail"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              name="password"
              type="password"
              label="Passwort"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              name="invitationCode"
              type="password"
              label="Einladungscode"
              placeholder="••••••••"
              required
            />
          </div>

          <Button className="mt-4 p-2 text-white bg-primary" type="submit">
            Registrieren
          </Button>

          {searchParams?.message && (
            <p className="p-4 mt-4 text-center bg-foreground/10 text-foreground rounded-md">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </MaxWidthWrapper>
  );
}
