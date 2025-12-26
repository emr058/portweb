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

export const metadata: Metadata = {
  title: "Emir Aydın | AI & Robotics Engineer",
  description: "Portfolyo: Robotik otomasyon, AI entegrasyonu ve araç yazılımları.",
  openGraph: {
    title: "Emir Aydın | AI & Robotics Engineer",
    description: "Robotik otomasyon, AI entegrasyonu ve araç yazılımları.",
    type: "website",
  },
};

import { LanguageProvider } from "@/components/LanguageContext";
import { ThemeProvider } from "@/components/ThemeProvider";

// ... imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
