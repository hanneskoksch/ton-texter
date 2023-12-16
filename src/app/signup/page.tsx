"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import OAuthButtons from "@/components/auth/OAuthButtons";
import SignUpForm from "@/components/auth/SignUpForm";

export default function SignUp() {
  return (
    <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold m-8">Registrieren</h1>
      <OAuthButtons />
      <SignUpForm />
    </MaxWidthWrapper>
  );
}
