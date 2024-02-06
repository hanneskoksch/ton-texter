import Providers from "@/components/Providers";
import { getURL } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Ton-Texter",
    default: "Ton-Texter",
  },
  description:
    "Navigiere spielend durch deine Inhalte und finde genau das, was du suchst – dank Ton-Texter Transkriptionen. Vereinfache deine Arbeitsweise und behalte stets den Überblick über deine Videoprojekte.",
  robots: "noindex,nofollow",
  openGraph: {
    images: [
      {
        url: `${getURL()}ton-texter-og.png`,
        width: 1920,
        height: 1080,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <link
          rel="icon"
          type="image/svg+xml"
          href="/tontexter_logo_small.svg"
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
