import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user != null && user != undefined) {
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

  return <div>no user</div>;
}
