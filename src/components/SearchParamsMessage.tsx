"use client";

import { useSearchParams } from "next/navigation";

function SearchParamsMessage() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  return (
    <p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">
      {message}
    </p>
  );
}

export default SearchParamsMessage;
