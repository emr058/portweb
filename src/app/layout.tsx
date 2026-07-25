import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/language-context";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/data/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Emir Aydın",
    "AI Automation Engineer",
    "Full Stack Software Engineer",
    "Kyrenia University",
    "Girne Üniversitesi",
    "Dentech Medikal",
    "CarryHub",
    "AI Agents",
    "Python",
    "Next.js",
    "FastAPI",
    "TypeScript",
  ],
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}/profile.jpg`,
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Kyrenia University (Girne Üniversitesi)",
    },
    worksFor: {
      "@type": "Organization",
      name: "Dentech Medikal",
    },
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
    knowsAbout: [
      "AI Automation",
      "Software Product Building",
      "AI Agents",
      "Python Automation",
      "Backend Architecture",
      "SaaS Engineering",
    ],
  };

  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.className} bg-[#08090a] text-gray-100 min-h-screen flex flex-col antialiased`}
        suppressHydrationWarning
      >
        <LanguageProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
