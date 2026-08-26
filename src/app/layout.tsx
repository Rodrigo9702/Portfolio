import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Rodrigo Castillo | AI Agent Developer",
  description: "Portafolio de Rodrigo Castillo, AI Agent Developer y QA Automation. Especialista en soluciones conversacionales con LLMs.",
  keywords: ["AI Agent Developer", "QA Automation", "LangChain", "n8n", "Portfolio", "Rodrigo Castillo", "Anthropic", "OpenAI"],
  authors: [{ name: "Rodrigo Castillo" }],
  openGraph: {
    title: "Rodrigo Castillo | AI Agent Developer",
    description: "Portafolio de Rodrigo Castillo, AI Agent Developer y QA Automation. Especialista en soluciones conversacionales con LLMs.",
    url: "https://tu-dominio.com",
    siteName: "Rodrigo Castillo Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rodrigo Castillo | AI Agent Developer",
    description: "Portafolio de Rodrigo Castillo, AI Agent Developer y QA Automation.",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="flex flex-col selection:bg-white/30 selection:text-white">
        
        <Preloader />
        <Navbar />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
