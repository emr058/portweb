export interface TechCategory {
  id: string;
  title: string;
  items: string[];
}

export const techStack: TechCategory[] = [
  {
    id: "languages",
    title: "Languages",
    items: ["TypeScript", "Python", "Java", "C++", "JavaScript", "Go"],
  },
  {
    id: "frameworks",
    title: "Frameworks",
    items: ["Next.js", "React", "Spring Boot", "FastAPI", "Flask", "Node.js"],
  },
  {
    id: "ai",
    title: "AI",
    items: ["OpenAI API", "LangChain", "PyTorch", "OpenCV", "RAG", "Vector DBs"],
  },
  {
    id: "databases",
    title: "Databases",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Supabase"],
  },
  {
    id: "cloud",
    title: "Cloud",
    items: ["Vercel", "AWS", "Docker", "Cloudflare", "Railway"],
  },
  {
    id: "devops",
    title: "DevOps",
    items: ["Git", "GitHub Actions", "CI/CD", "Monitoring", "Linux"],
  },
  {
    id: "automation",
    title: "Automation",
    items: ["n8n", "Webhooks", "Cron jobs", "ESP32/IoT", "WebSockets"],
  },
];
