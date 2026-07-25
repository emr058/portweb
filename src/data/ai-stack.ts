export type AIStatus = "production" | "current" | "learning" | "planned";

export interface AITechItem {
  name: string;
  category: "LLM Models" | "Orchestration & Frameworks" | "Automation & Workflows" | "Agent Architecture";
  status: AIStatus;
  description: {
    en: string;
    tr: string;
  };
  tags: string[];
}

export const aiStackData: AITechItem[] = [
  {
    name: "OpenAI (GPT-4o / O3)",
    category: "LLM Models",
    status: "production",
    description: {
      en: "Used in live customer agents with structured JSON outputs and function calling.",
      tr: "Canlı müşteri ajanlarında yapılandırılmış JSON çıktıları ve fonksiyon çağırma ile aktif kullanılıyor.",
    },
    tags: ["Structured Outputs", "Function Calling", "Embeddings"],
  },
  {
    name: "Anthropic Claude (3.5 Sonnet / Haiku)",
    category: "LLM Models",
    status: "production",
    description: {
      en: "Primary model for complex code reasoning, architecture analysis, and long-context processing.",
      tr: "Karmaşık kod mantığı, mimari analiz ve uzun bağlam işleme için temel model.",
    },
    tags: ["Code Generation", "System Prompts", "Artifacts"],
  },
  {
    name: "Google Gemini (1.5 Pro / Flash)",
    category: "LLM Models",
    status: "production",
    description: {
      en: "Multimodal audio/video ingestion and high-throughput background processing.",
      tr: "Çok modlu ses/video işleme ve yüksek hacimli arka plan veri analizi.",
    },
    tags: ["Multimodal", "Large Context", "Video OCR"],
  },
  {
    name: "Model Context Protocol (MCP)",
    category: "Orchestration & Frameworks",
    status: "production",
    description: {
      en: "Connecting LLM agents to internal databases, file systems, and external tools securely.",
      tr: "Yapay zeka ajanlarını iç veritabanlarına, dosya sistemlerine ve harici araçlara güvenle bağlama.",
    },
    tags: ["Protocol", "Tool Integration", "Context Routing"],
  },
  {
    name: "LangGraph / LangChain",
    category: "Orchestration & Frameworks",
    status: "current",
    description: {
      en: "Cyclic multi-agent orchestration, state persistence, and human-in-the-loop nodes.",
      tr: "Döngüsel çoklu-ajan orkestrasyonu, durum kalıcılığı ve insan onaylı düğümler.",
    },
    tags: ["Multi-Agent", "Graph State", "Human-in-loop"],
  },
  {
    name: "n8n (Self-Hosted Workflow Engine)",
    category: "Automation & Workflows",
    status: "production",
    description: {
      en: "Event-driven workflow automation connecting webhooks, databases, and AI nodes.",
      tr: "Web hook'ları, veritabanlarını ve AI modüllerini bağlayan olay güdümlü otomasyon motoru.",
    },
    tags: ["Webhooks", "Custom JS/Python", "API Integration"],
  },
  {
    name: "Hermes Agent Framework",
    category: "Orchestration & Frameworks",
    status: "learning",
    description: {
      en: "Exploring lightweight autonomous execution environments and local tool execution.",
      tr: "Hafif otonom çalıştırma ortamları ve yerel araç çalıştırma üzerine çalışmalar.",
    },
    tags: ["Local Agents", "Autonomous Execution"],
  },
  {
    name: "Prompt Engineering & Evaluation",
    category: "Agent Architecture",
    status: "production",
    description: {
      en: "System prompt optimization, few-shot conditioning, and structured output enforcement.",
      tr: "Sistem istemi optimizasyonu, az örnekli şartlandırma ve tutarlı veri çıktısı garantisi.",
    },
    tags: ["Few-Shot", "Guardrails", "Eval Suites"],
  },
  {
    name: "Function Calling & Tool Use",
    category: "Agent Architecture",
    status: "production",
    description: {
      en: "Enabling agents to execute SQL queries, trigger webhooks, and call REST endpoints.",
      tr: "Ajanların SQL sorgulaması yapmasını, webhook tetiklemesini ve REST endpoint çağırmasını sağlama.",
    },
    tags: ["JSON Schema", "Dynamic Tools", "API Triggers"],
  },
  {
    name: "Agentic Memory Systems",
    category: "Agent Architecture",
    status: "current",
    description: {
      en: "Short-term conversation buffers, Redis session state, and long-term vector memory.",
      tr: "Kısa süreli konuşma arabellekleri, Redis oturum durumu ve uzun süreli vektör hafıza.",
    },
    tags: ["Redis", "Conversation History", "State Store"],
  },
  {
    name: "RAG & Vector Search (Pinecone / PgVector)",
    category: "Agent Architecture",
    status: "production",
    description: {
      en: "Chunking, embedding, hybrid BM25 + dense search for enterprise document retrieval.",
      tr: "Metin parçalama, embedding ve kurumsal belge sorgulama için hibrit vektör araması.",
    },
    tags: ["PgVector", "Pinecone", "Hybrid Search"],
  },
  {
    name: "Fine-Tuning & Local LLMs (Ollama / vLLM)",
    category: "LLM Models",
    status: "planned",
    description: {
      en: "On-premise LLM hosting and task-specific LoRA fine-tuning for privacy-sensitive data.",
      tr: "Gizlilik hassasiyeti yüksek veriler için yerel LLM barındırma ve LoRA ince ayarı.",
    },
    tags: ["Ollama", "vLLM", "LoRA"],
  },
];
