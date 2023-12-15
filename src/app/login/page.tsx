"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

import LoginForm from "@/components/auth/LoginForm";

export default function Login() {

  return (
    <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
      <LoginForm />
    </MaxWidthWrapper>
  );
}
