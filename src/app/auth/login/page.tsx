import AuthCard from "@/components/AuthCard";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function Login() {
  return (
    <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
      <AuthCard />
    </MaxWidthWrapper>
  );
}
