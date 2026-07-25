import { siteConfig } from "@/data/site";
import type { ProjectCaseStudy } from "@/data/projects";

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.title,
    url: siteConfig.url,
  };
}

export function generateSoftwareSchema(project: ProjectCaseStudy) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    applicationCategory: "BusinessApplication",
  };
}
