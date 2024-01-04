import Dashboard from "@/components/Dashboard";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { db } from "@/db";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
};

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
    <MaxWidthWrapper>
      <Dashboard />
    </MaxWidthWrapper>
  );
}
