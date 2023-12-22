import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

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
    <MaxWidthWrapper className="flex flex-col items-center justify-center mb-12 text-center mt-28 sm:mt-40">
      <h1 className="mb-6 text-4xl font-bold">Login</h1>
      <div className="flex flex-col justify-center flex-1 w-full gap-2 px-8 sm:max-w-md">
        <form
          className="flex flex-col justify-center flex-1 w-full gap-2 animate-in text-foreground"
          action={signIn}
        >
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="px-4 py-2 mb-6 border rounded-md bg-inherit"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label className="text-md" htmlFor="password">
            Passwort
          </label>
          <input
            className="px-4 py-2 mb-6 border rounded-md bg-inherit"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />

          <button className="p-2 text-white bg-primary">Login</button>

          {searchParams?.message && (
            <p className="p-4 mt-4 text-center bg-foreground/10 text-foreground">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </MaxWidthWrapper>
  );
}
