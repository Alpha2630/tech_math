import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://techmathguide.com"),
  title: {
    default: "TechMathGuide — Maths, Anglais & Tech interconnectés",
    template: "%s | TechMathGuide",
  },
  description:
    "Plateforme éducative qui explique clairement le lien entre les mathématiques, l'anglais technique et la technologie. Cybersécurité, IA, Data Science, Robotique, Web, Mobile et plus.",
  keywords: [
    "mathématiques",
    "programmation",
    "cybersécurité",
    "machine learning",
    "data science",
    "anglais technique",
    "tech education",
    "apprentissage programmation",
  ],
  authors: [{ name: "TechMathGuide" }],
  openGraph: {
    title: "TechMathGuide",
    description:
      "Comprendre comment les maths et l'anglais technique s'interconnectent avec la tech dans le monde réel.",
    type: "website",
    locale: "fr_FR",
    url: "https://techmathguide.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechMathGuide",
    description:
      "Comprendre comment les maths et l'anglais technique s'interconnectent avec la tech dans le monde réel.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-theme="techmath">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-base-100`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}