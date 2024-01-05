import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";
import TonTexterNavbar from "@/components/navbar/TonTexterNavbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | Ton-Texter',
    default: 'Ton-Texter',
  },
  description: "Navigiere spielend durch deine Inhalte und finde genau das, was du suchst – dank Ton-Texter Transkriptionen. Vereinfache deine Arbeitsweise und behalte stets den Überblick über deine Videoprojekte."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head />
      <body className={inter.className}>
      <div className="flex flex-col min-h-screen">
        <Providers>
          <TonTexterNavbar />
          <main className="flex-1">{children}</main>
        </Providers>
        <Footer />

        </div>
      </body>
    </html>
  );
}
