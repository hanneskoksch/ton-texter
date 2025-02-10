"use client";

import { trpc } from "@/app/_trpc/client";
import { CircularProgress } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

/**
 * React component handling authentication callback, redirecting based on authentication status using trpc queries.
 *
 * * If the user is not logged in, it will redirect the user to the login page.
 * * If the user is logged in, but not synced to the database,
 * it will show a loading screen and sync the user to the database.
 * * If the user is logged in and synced to the database, it will redirect the user to the dashboard.
 **/
const Page = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  const { status, error } = trpc.authCallback.useQuery();

  if (status === "success") {
    // user is synced to database
    router.push(origin ? `/${origin}` : "/dashboard");
    return;
  }

  if (status === "error") {
    if (error.data?.code === "UNAUTHORIZED") {
      router.push("/login");
      //window.location.href = "/api/auth/login?";
    }
  }

  return (
    <div className="mt-24 flex w-full justify-center">
      <div className="flex flex-col items-center gap-2">
        <CircularProgress size="md" aria-label="Loading..." />
        <h3 className="text-xl font-semibold">
          Dein Account wird eingerichtet...
        </h3>
        <p>Du wirst automatisch weitergeleitet.</p>
      </div>
    </div>
  );
};

// Wrapping the page component in a Suspense component to show a loading spinner while the page is loading.
// see https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
const PageWrapper = () => {
  return (
    <Suspense fallback={<CircularProgress size="md" aria-label="Loading..." />}>
      <Page />
    </Suspense>
  );
};

export default PageWrapper;
