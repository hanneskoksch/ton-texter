import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { db } from "@/db";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if user is not logged in, redirect to auth-callback
  if (!user || !user.id) redirect("/auth-callback?origin=dashboard");

  // check if user is in database
  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  // if user is not in database, redirect to auth-callback
  if (!dbUser) redirect("/auth-callback?origin=dashboard");

  return (
    <MaxWidthWrapper className="flex flex-col items-center justify-center mb-12 text-center mt-28 sm:mt-40">
      <p className="mb-6 text-lg text-default-700">User is logged in:</p>
      <p className="text-lg text-default-400">UserId</p>
      <p className="mb-6 text-lg text-default-700">{user.id}</p>
      <p className="text-lg text-default-400">Email</p>
      <p className="mb-6 text-lg text-default-700">{user.email}</p>
    </MaxWidthWrapper>
  );
}
