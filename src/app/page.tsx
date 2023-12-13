import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function Home() {
  return (
    <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
      <p className="text-4xl mb-6 text-zinc-700">Mehr Power im Schnitt:</p>
      <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
        Magie des{" "}
        <span className="text-primary-600">textbasierten Editings</span>
      </h1>
      <p className="mt-6 max-w-prose text-zinc-700 sm:text-xl ">
        Navigiere spielend durch deine Inhalte und finde genau das, was du
        suchst – dank Ton-Texter Transkriptionen. Vereinfache deine Arbeitsweise
        und behalte stets den Überblick über deine Videoprojekte.
      </p>
    </MaxWidthWrapper>
  );
}
