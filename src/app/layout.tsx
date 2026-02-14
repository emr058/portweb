import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export const metadata: Metadata = {
  title: "Emir Aydın | AI & Robotics Engineer",
  description:
    "Emir Aydın - Yapay zekâ, robotik otomasyon ve araç yazılımları alanında mühendislik portföyü. AI & Robotics Engineering Portfolio.",
  metadataBase: new URL("https://www.emirr.com.tr"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Emir Aydın | AI & Robotics Engineer",
    description:
      "Yapay zekâ, robotik otomasyon ve araç yazılımları alanında mühendislik portföyü.",
    type: "website",
    url: "https://www.emirr.com.tr",
    siteName: "Emir Aydın Portfolio",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary",
    title: "Emir Aydın | AI & Robotics Engineer",
    description:
      "Yapay zekâ, robotik otomasyon ve araç yazılımları alanında mühendislik portföyü.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.jpg",
  },
};

import { LanguageProvider } from "@/components/LanguageContext";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
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
