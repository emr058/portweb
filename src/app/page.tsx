import React from "react";
import { HeroSection } from "@/components/hero-section";
import { ThingsIBuild } from "@/components/things-i-build";
import { CurrentlyBuilding } from "@/components/currently-building";
import { AboutMindsetSection } from "@/components/about-mindset-section";
import { ProjectsSection } from "@/components/projects-section";
import { AIStackSection } from "@/components/ai-stack-section";
import { EngineeringPrinciplesSection } from "@/components/engineering-principles-section";
import { ServicesSection } from "@/components/services-section";
import { CareerTimelineSection } from "@/components/career-timeline-section";
import { ContactSection } from "@/components/contact-section";

export default function HomePage() {
  return (
    <div className="space-y-4">
      <HeroSection />
      <ThingsIBuild />
      <CurrentlyBuilding />
      <AboutMindsetSection />
      <ProjectsSection limit={4} />
      <AIStackSection isPreview={true} />
      <EngineeringPrinciplesSection />
      <ServicesSection />
      <CareerTimelineSection />
      <ContactSection />
    </div>
  );
}
