import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Image } from "@nextui-org/react";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
        <p className="text-4xl mb-6 text-zinc-700">Mehr Power im Schnitt:</p>
        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
          Magie des{" "}
          <span className="text-primary-600">textbasierten Editings</span>
        </h1>
        <p className="mt-6 max-w-prose text-zinc-700 sm:text-xl ">
          Navigiere spielend durch deine Inhalte und finde genau das, was du
          suchst – dank Ton-Texter Transkriptionen. Vereinfache deine
          Arbeitsweise und behalte stets den Überblick über deine Videoprojekte.
        </p>
      </MaxWidthWrapper>

      {/* Feature section */}
      <div className="mx-auto mb-32 mt-32 max-w-5xl sm:mt-56">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="mt-2 font-bold text-4xl text-default-900 sm:text-5xl">
              Benutze dein Transkript in Minuten
            </h2>
            <p className="mt4 text-lg text-default-600">
              Das Arbeiten mit Transkripten war noch nie so einfach wie mit
              Ton-Texter.
            </p>
          </div>
        </div>

        {/* steps */}
        <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-primary">
                Schritt 1
              </span>
              <span className="text-xl font-semibold">
                Anmelden für ein Benutzerkonto
              </span>
              <span className="mt-2 text-default-500">
                Starte mit unserem Free-Plan.
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-primary">
                Schritt 2
              </span>
              <span className="text-xl font-semibold">
                Lade deine Audio- oder Video-Datei hoch
              </span>
              <span className="mt-2 text-default-500">
                Wir transkribieren deine Datei und stellen dir die Transkripte
                zur Verfügung.
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-primary">
                Schritt 3
              </span>
              <span className="text-xl font-semibold">
                Verwende das Transkript
              </span>
              <span className="mt-2 text-default-500">
                Lade das Transkript als <code>.docx</code>, <code>.srt</code>{" "}
                oder <code>.txt</code> herunter und verwende es für deine
                Videos.
              </span>
            </div>
          </li>
        </ol>
      </div>

      {/* Team section */}
      <div className="mx-auto mt-32 max-w-5xl sm:mt-56">
        <div className=" px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="mt-2 font-bold text-4xl text-default-900 sm:text-5xl">
              Das Team hinter Ton-Texter
            </h2>
            <p className="mt4 text-lg text-default-600 mb-12">
              Wir sind ein kleines Team aus Berlin, das sich auf die Entwicklung
              von Software für die Videoproduktion spezialisiert hat.
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-5xl mb-60 items-center sm:items-start flex flex-col gap-8 sm:flex-row p-10">
        <div>
          <Image
            width={500}
            alt="NextUI hero Image"
            className="mb-2"
            src="/images/team/Hannes.jpg"
          />
          <p>Hannes Human</p>
          <p className="text-default-500 text-sm">
            Abteilung Internet & Telemedien
          </p>
        </div>
        <div>
          <Image
            width={500}
            alt="NextUI hero Image"
            className="mb-2"
            src="/images/team/Niko.jpg"
          />
          <p>Niko Naturbursche</p>
          <p className="text-default-500 text-sm">Chief of Cloud Operations</p>
        </div>
        <div>
          <Image
            width={500}
            alt="NextUI hero Image"
            className="mb-2"
            src="/images/team/Torben.jpg"
          />
          <p>Torben Taubenschlag</p>
          <p className="text-default-500 text-sm">
            Principal Engineer of Cutting-Edge Storage Solutions
          </p>
        </div>
      </div>

      {/* Motivation section */}
      <div className="mx-auto mb-80 mt-32 max-w-5xl sm:mt-56">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center mb-10">
            <h2 className="mt-2 font-bold text-4xl text-default-900 sm:text-5xl">
              Unsere Motivation
            </h2>
            <p className="mt4 text-lg text-default-600">
              Videoproduktion ist unsere Leidenschaft.
            </p>
          </div>
          <p className="mt-6 max-w-prose text-default-700 sm:text-xl mx-auto">
            Wir haben Ton-Texter entwickelt, um die Videoproduktion zu
            vereinfachen. Unsere Vision ist es, dass jeder Videoproduzent
            Ton-Texter verwendet, um seine Videos zu erstellen. Wir glauben,
            dass jede Videoproduktion mit Ton-Texter einen deutlichen
            Qualitätssprung machen kann.
            <br />
            <br />
            Ton-Texter bietet den entscheidenden Konkurenzvorteil.
          </p>
        </div>
      </div>
    </>
  );
}
