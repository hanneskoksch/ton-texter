"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

import LoginForm from "@/components/auth/LoginForm";
import OAuthButtons from "@/components/auth/OAuthButtons";

export default function Login() {

  return (
    <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold m-8">Login</h1>
      <OAuthButtons/>
      <LoginForm />
    </MaxWidthWrapper>
  );
}
