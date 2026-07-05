import type { Metadata, Viewport } from "next";
import { Archivo, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";
import SmoothScroll from "@/components/SmoothScroll";

// Display / headings
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Corpo de texto
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Rótulos / código
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://joaovritter.vercel.app"),
  title: `${profile.name} — ${profile.shortRole}`,
  description: profile.heroTagline,
  keywords: [
    "João Vitor Ritter",
    "Desenvolvedor Full Stack",
    "Front-end",
    "React",
    "Next.js",
    "Santa Maria",
    "Portfólio",
  ],
  authors: [{ name: profile.fullName }],
  openGraph: {
    title: `${profile.name} — ${profile.shortRole}`,
    description: profile.heroTagline,
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.shortRole}`,
    description: profile.heroTagline,
  },
};

export const viewport: Viewport = {
  themeColor: "#13110E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${archivo.variable} ${hanken.variable} ${mono.variable}`}
    >
      <body className="font-sans antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
