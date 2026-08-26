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

import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Rodrigo Castillo | AI Agent Developer",
  description: "Portafolio de Rodrigo Castillo, AI Agent Developer y QA Automation.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="flex flex-col selection:bg-white/30 selection:text-white">
        <CustomCursor />
        <Preloader />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
