export interface Project {
    id: string;
    title: string;
    problem: string;
    systemFlow: string;
    role: string;
    stack: string[];
    links: {
        github: string;
        demo?: string;
    };
    category: "featured" | "robotics" | "ai" | "fullstack";
}

export interface Experience {
    id: string;
    company: string;
    role: string;
    period: string;
    description: string;
    tech: string[];
}

export interface PlaybookItem {
    id: string;
    title: string;
    description: string;
}

export interface PortfolioContent {
    personal: {
        name: string;
        title: string;
        tagline: string;
        socials: {
            github: string;
            linkedin: string;
            email: string;
        };
    };
    hero: {
        badges: string[];
        cta: {
            projects: string;
            contact: string;
        };
        pathSelector: {
            id: string;
            title: string;
            desc: string;
        }[];
    };
    projects: Project[];
    playbook: PlaybookItem[];
    about: {
        title: string;
        description: string;
        skills: string[];
        stats: {
            ai: string;
            robotics: string;
            vehicle: string;
            fullstack: string;
        }
    };
    experience: Experience[];
    contact: {
        title: string;
        subtitle: string;
        cta: string;
    }
}

export const portfolioData: Record<"tr" | "en", PortfolioContent> = {
    tr: {
        personal: {
            name: "Emir Aydın",
            title: "AI & Robotik Mühendisi",
            tagline: "Araç yazılımları, robotik otomasyonları ve yapay zeka entegrasyonları geliştiriyorum.",
            socials: {
                github: "https://github.com/emr058",
                linkedin: "https://linkedin.com/in/emir-aydn",
                email: "mailto:emraydin058@gmail.com",
            },
        },
        hero: {
            badges: ["Robotik Otomasyon", "AI Entegrasyonu", "Araç Yazılımı"],
            cta: {
                projects: "Projeleri Gör",
                contact: "İletişim",
            },
            pathSelector: [
                { id: "robotics", title: "Robotik", desc: "Otonom sistemler ve kontrol algoritmaları" },
                { id: "ai", title: "AI Entegrasyon", desc: "ML pipeline kurulumu ve edge çıkarım" },
                { id: "fullstack", title: "Full-Stack", desc: "Dashboard ve uzaktan kontrol arayüzleri" },
            ]
        },
        projects: [
            {
                id: "1",
                title: "Otonom Araç Görünümü",
                problem: "Düşük görüş koşullarında gerçek zamanlı nesne tespiti.",
                systemFlow: "LiDAR/Kamera -> Füzyon -> CNN -> Kontrol",
                role: "Lider Algı Mühendisi",
                stack: ["Python", "PyTorch", "ROS2", "C++"],
                links: { github: "#", demo: "#" },
                category: "featured",
            },
            {
                id: "2",
                title: "Endüstriyel Robot Dijital İkiz",
                problem: "Üretim robotları için kestirimci bakım.",
                systemFlow: "PLC Sensörler -> MQTT -> TimescaleDB -> Next.js",
                role: "Full Stack Geliştirici",
                stack: ["Next.js", "Three.js", "Node.js", "PostgreSQL"],
                links: { github: "#" },
                category: "featured",
            },
            {
                id: "3",
                title: "LLM Tabanlı Filo Asistanı",
                problem: "Filo yönetimi için doğal dil arayüzü.",
                systemFlow: "Ses -> Whisper -> GPT-4 -> Aksiyonlar",
                role: "AI Mühendisi",
                stack: ["OpenAI API", "Python", "FastAPI", "React"],
                links: { github: "#", demo: "#" },
                category: "featured",
            },
            {
                id: "r1",
                title: "Depo Drone Sürüsü",
                problem: "3D alanda toplama rotalarının optimizasyonu.",
                systemFlow: "Sürü Algoritması -> Yerel Ağ -> Drone",
                role: "Algoritma Mühendisi",
                stack: ["C++", "ROS", "Gazebo"],
                links: { github: "#" },
                category: "robotics",
            },
            {
                id: "a1",
                title: "Defekt Tespit API",
                problem: "Montaj hatları için otomatik kalite kontrol.",
                systemFlow: "Kamera -> Edge Cihaz -> Çıkarım",
                role: "ML Ops",
                stack: ["TensorFlow Lite", "Python", "Docker"],
                links: { github: "#" },
                category: "ai",
            },
            {
                id: "f1",
                title: "Teleoperasyon Paneli",
                problem: "Düşük gecikmeli uzaktan kontrol arayüzü.",
                systemFlow: "WebRTC -> WebSocket -> Robot",
                role: "Frontend Mimarı",
                stack: ["React", "WebRTC", "Socket.io"],
                links: { github: "#" },
                category: "fullstack",
            }
        ],
        playbook: [
            {
                id: "p1",
                title: "Model → Servis → Gözlemlenebilirlik",
                description: "Model versiyonlama, latency takibi ve drift detection ile üretim seviyesi AI servisleri.",
            },
            {
                id: "p2",
                title: "Robotik Otomasyon Mimarisi",
                description: "Event-driven mimariler, güvenlik/yedek mekanizmaları ve gerçek zamanlı kontrol döngüleri.",
            },
            {
                id: "p3",
                title: "Ürünleştirme",
                description: "Net API kontratları, kapsamlı testler, CI/CD pipeline'ları ve konteynerizasyon stratejileri.",
            },
        ],
        about: {
            title: "Hakkımda",
            description: "Robotik sistemler, araç otomasyonları ve yazılım tabanlı kontrol sistemlerine özel ilgi duyuyorum. Üniversite eğitimim ve staj deneyimlerim sırasında yazılım geliştirme, algoritma tasarımı ve temel seviye yapay zeka uygulamaları üzerinde çalıştım. Gerçek sistemler üzerinde öğrenmeye açık, teknik gelişimini sahada ilerletmeyi hedefleyen bir mühendis adayıyım.",
            skills: ["Python", "Java", "C++", "JavaScript", "React", "Vue", "MySQL", "PostgreSQL", "MongoDB", "Git", "Docker", "ROS"],
            stats: {
                ai: "AI Projeleri",
                robotics: "Robotik Yığını",
                vehicle: "Araç OS",
                fullstack: "Full Stack"
            }
        },
        experience: [
            {
                id: "32bit",
                company: "32Bit Bilgisayar",
                role: "Fullstack Web Geliştirici",
                period: "Haziran 2025 - Temmuz 2025",
                description: "Bir e-ticaret projesinin backend ve frontend geliştirme süreçlerinde sorumluluk üstlendim. Proje kapsamındaki ilerlemeler ve teknik güncellemeler hakkında haftalık koordinasyon toplantılarında kapsamlı raporlamalar gerçekleştirdim.",
                tech: ["Spring Boot", "React", "PostgreSQL", "Java", "JavaScript"]
            },
            {
                id: "novelty",
                company: "Novelty Yapay Zeka",
                role: "Yapay Zeka Mühendisliği Stajyeri",
                period: "Haziran 2024 - Ağustos 2024",
                description: "Sağlık sektörüne yönelik geliştirilen full-stack bir web sitesinin teslim sürecinde aktif rol aldım. Basit düzeyde yapay zeka projelerinde görev alarak makine öğrenimi ve Flask gibi teknolojilerle ilk deneyimlerimi edindim.",
                tech: ["Python", "Flask", "OpenCV", "C#", "Blazorise"]
            }
        ],
        contact: {
            title: "İletişime Geç",
            subtitle: "Projeleriniz veya iş birlikleri için iletişime geçin.",
            cta: "Hemen İletişime Geç"
        }
    },
    en: {
        personal: {
            name: "Emir Aydın",
            title: "AI & Robotics Engineer",
            tagline: "Building vehicle software, robotic automations, and AI integrations.",
            socials: {
                github: "https://github.com/emr058",
                linkedin: "https://linkedin.com/in/emir-aydn",
                email: "mailto:emraydin058@gmail.com",
            },
        },
        hero: {
            badges: ["Robotics Automation", "AI Integration", "Vehicle Software"],
            cta: {
                projects: "View Projects",
                contact: "Contact Me",
            },
            pathSelector: [
                { id: "robotics", title: "Robotics", desc: "Autonomous systems & control algorithms" },
                { id: "ai", title: "AI Integrations", desc: "ML pipelines & edge inference" },
                { id: "fullstack", title: "Full-Stack", desc: "Dashboards & remote interfaces" },
            ]
        },
        projects: [
            {
                id: "1",
                title: "Autonomous Vehicle Perception",
                problem: "Real-time object detection in low visibility conditions.",
                systemFlow: "LiDAR/Camera -> Fusion -> CNN -> Control",
                role: "Lead Perception Engineer",
                stack: ["Python", "PyTorch", "ROS2", "C++"],
                links: { github: "#", demo: "#" },
                category: "featured",
            },
            {
                id: "2",
                title: "Industrial Arm Digital Twin",
                problem: "Predictive maintenance for manufacturing robots.",
                systemFlow: "PLC Sensors -> MQTT -> TimescaleDB -> Next.js",
                role: "Full Stack Developer",
                stack: ["Next.js", "Three.js", "Node.js", "PostgreSQL"],
                links: { github: "#" },
                category: "featured",
            },
            {
                id: "3",
                title: "LLM-Based Fleet Assistant",
                problem: "Natural language interface for fleet management.",
                systemFlow: "Voice -> Whisper -> GPT-4 -> Actions",
                role: "AI Engineer",
                stack: ["OpenAI API", "Python", "FastAPI", "React"],
                links: { github: "#", demo: "#" },
                category: "featured",
            },
            {
                id: "r1",
                title: "Warehouse Drone Swarm",
                problem: "Optimizing picking routes in 3D space.",
                systemFlow: "Swarm Algo -> Local Network -> Drone",
                role: "Algorithm Engineer",
                stack: ["C++", "ROS", "Gazebo"],
                links: { github: "#" },
                category: "robotics",
            },
            {
                id: "a1",
                title: "Defect Detection API",
                problem: "Automated QC for assembly lines.",
                systemFlow: "Camera -> Edge Device -> Inference",
                role: "ML Ops",
                stack: ["TensorFlow Lite", "Python", "Docker"],
                links: { github: "#" },
                category: "ai",
            },
            {
                id: "f1",
                title: "Teleoperation Dashboard",
                problem: "Low-latency remote control interface.",
                systemFlow: "WebRTC -> WebSocket -> Robot",
                role: "Frontend Architect",
                stack: ["React", "WebRTC", "Socket.io"],
                links: { github: "#" },
                category: "fullstack",
            }
        ],
        playbook: [
            {
                id: "p1",
                title: "Model → Service → Observability",
                description: "Production-grade AI services with model versioning, latency tracking, and drift detection.",
            },
            {
                id: "p2",
                title: "Robotic Automation Architecture",
                description: "Event-driven architectures, safety/fallback mechanisms, and real-time control loops.",
            },
            {
                id: "p3",
                title: "Productization",
                description: "Clear API contracts, comprehensive testing, CI/CD pipelines, and containerization strategies.",
            },
        ],
        about: {
            title: "About Me",
            description: "I have a special interest in robotic systems, vehicle automation, and software-based control systems. During my university education and internships, I worked on software development, algorithm design, and basic-level AI applications. I am an engineer candidate open to learning on real systems and aiming to advance my technical development in the field.",
            skills: ["Python", "Java", "C++", "JavaScript", "React", "Vue", "MySQL", "PostgreSQL", "MongoDB", "Git", "Docker", "ROS"],
            stats: {
                ai: "AI Projects",
                robotics: "Robotics Stack",
                vehicle: "Vehicle OS",
                fullstack: "Full Stack"
            }
        },
        experience: [
            {
                id: "32bit",
                company: "32Bit Computer",
                role: "Fullstack Web Developer",
                period: "June 2025 - July 2025",
                description: "Took responsibility in the backend and frontend development processes of an e-commerce project. Carried out comprehensive reporting on progress and technical updates in weekly coordination meetings.",
                tech: ["Spring Boot", "React", "PostgreSQL", "Java", "JavaScript"]
            },
            {
                id: "novelty",
                company: "Novelty Design & AI",
                role: "AI Engineering Intern",
                period: "June 2024 - August 2024",
                description: "Took an active role in the delivery process of a full-stack web site developed for the health sector. Gained my first experiences with technologies such as machine learning and Flask by taking part in basic level artificial intelligence projects.",
                tech: ["Python", "Flask", "OpenCV", "C#", "Blazorise"]
            }
        ],
        contact: {
            title: "Let's Connect",
            subtitle: "Reach out for projects or collaborations.",
            cta: "Contact Now"
        }
    },
};
