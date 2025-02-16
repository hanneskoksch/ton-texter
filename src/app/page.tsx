"use client";

import { CompareSlider } from "@/components/compareSlider/CompareSlider";
import FileIcons from "@/components/FileIcons";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Image as NextUiImage } from "@heroui/react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div
        className="pointer-events-none relative -z-10 h-52 w-full transform-gpu md:h-80"
        aria-hidden="true"
      >
        <div className="animate-fade-in-slow">
          <div className="absolute left-0 right-0 top-8 mx-auto h-64 w-64 rounded-full bg-[#45A4FF] opacity-50 mix-blend-multiply blur-3xl md:top-32 md:h-[24rem] md:w-[36rem]"></div>
        </div>

        <div className="isolate flex justify-center pt-16">
          <Image
            priority={true}
            src="/tontexter_logo_easy.svg"
            alt="TonTexter Logo"
            className="w-52 md:w-96"
            width={50}
            height={50}
          />
        </div>
      </div>
      <MaxWidthWrapper className="mb-12 mt-28 flex flex-col items-center justify-center text-center sm:mt-40">
        <p className="mb-6 text-4xl text-default-700">Mehr Power im Schnitt:</p>
        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
          Magie des{" "}
          <span className="text-primary-600">textbasierten Editings</span>
        </h1>
        <p className="mt-8 max-w-prose text-default-500 sm:text-xl">
          Navigiere spielend durch deine Inhalte und finde genau das, was du
          suchst – dank Ton-Texter Transkriptionen. Vereinfache deine
          Arbeitsweise und behalte stets den Überblick über deine Videoprojekte.
        </p>
      </MaxWidthWrapper>

      {/* Slider section */}
      <div className="mx-auto mb-72 mt-32 max-w-5xl sm:mt-56">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-6 mt-2 text-4xl font-bold text-default-900 sm:text-5xl">
              Verwandle deine Audios und Videos blitzschnell in Text
            </h2>
          </div>
          <CompareSlider />
        </div>
      </div>

      {/* File formats section */}
      <div className="mx-auto mb-72 mt-32 max-w-5xl sm:mt-56">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-6 mt-2 text-4xl font-bold text-default-900 sm:text-5xl">
              Unterstützte Dateiformate
            </h2>
            <p className="mt-4 text-lg text-default-600">
              Das Transkript kann als <code>.docx</code>, <code>.srt</code> oder{" "}
              <code>.txt</code> heruntergeladen werden
            </p>
          </div>
          <FileIcons />
        </div>
      </div>

      {/* Feature section */}
      <div className="mx-auto mb-32 mt-32 max-w-5xl sm:mt-56">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="mt-2 text-4xl font-bold text-default-900 sm:text-5xl">
              Benutze dein Transkript in Minuten
            </h2>
            <p className="mt-4 text-lg text-default-600">
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
        <div className="px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="mt-2 text-4xl font-bold text-default-900 sm:text-5xl">
              Das Team hinter Ton-Texter
            </h2>
            <p className="mb-12 mt-4 text-lg text-default-600">
              Wir sind ein kleines Team aus Berlin, das sich auf die Entwicklung
              von Software für die Videoproduktion spezialisiert hat.
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto mb-60 flex max-w-5xl flex-col items-center gap-8 p-10 text-center sm:flex-row sm:items-start">
        <div>
          <NextUiImage
            width={500}
            loading="lazy"
            alt="NextUI hero Image"
            className="mb-2"
            src="/images/team/Hannes.avif"
          />
          <p>Hannes Human</p>
          <p className="text-sm text-default-500">
            Abteilung Internet & Telemedien
          </p>
        </div>
        <div>
          <NextUiImage
            width={500}
            loading="lazy"
            alt="NextUI hero Image"
            className="mb-2"
            src="/images/team/Niko.avif"
          />
          <p>Niko Naturbursche</p>
          <p className="text-sm text-default-500">Chief of Cloud Operations</p>
        </div>
        <div>
          <NextUiImage
            width={500}
            loading="lazy"
            alt="NextUI hero Image"
            className="mb-2"
            src="/images/team/Torben.avif"
          />
          <p>Torben Taubenschlag</p>
          <p className="text-sm text-default-500">
            Principal Engineer of Cutting-Edge Storage Solutions
          </p>
        </div>
      </div>

      {/* Motivation section */}
      <div className="mx-auto mb-80 mt-32 max-w-5xl sm:mt-56">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-2xl sm:text-center">
            <h2 className="mt-2 text-4xl font-bold text-default-900 sm:text-5xl">
              Unsere Motivation
            </h2>
            <p className="mt-4 text-lg text-default-600">
              Videoproduktion ist unsere Leidenschaft.
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-prose text-default-700 sm:text-center sm:text-xl">
            Wir haben Ton-Texter entwickelt, um die Videoproduktion zu
            vereinfachen. Unsere Vision ist es, dass jeder Videoproduzent
            Ton-Texter verwendet, um seine Videos zu erstellen. Wir glauben,
            dass jede Videoproduktion mit Ton-Texter einen deutlichen
            Qualitätssprung machen kann.
            <br />
            <br />
            Ton-Texter bietet den entscheidenden Konkurrenzvorteil.
          </p>
        </div>
      </div>
    </>
  );
}
