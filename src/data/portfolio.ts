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
            title: "Yapay Zeka ve Robotik Mühendisi",
            tagline: "Araç yazılımları, robotik otomasyon sistemleri ve yapay zekâ entegrasyonları geliştiriyorum.",
            socials: {
                github: "https://github.com/emr058",
                linkedin: "https://linkedin.com/in/emir-aydn",
                email: "mailto:emraydin058@gmail.com",
            },
        },
        hero: {
            badges: ["Robotik Otomasyon", "Yapay Zekâ Entegrasyonu", "Araç Yazılımı"],
            cta: {
                projects: "Projeleri Gör",
                contact: "İletişim",
            },
            pathSelector: [
                { id: "robotics", title: "Robotik", desc: "Otonom sistemler ve kontrol algoritmaları" },
                { id: "ai", title: "Yapay Zekâ", desc: "Makine öğrenimi altyapısı ve uç cihaz çıkarımı" },
                { id: "fullstack", title: "Full-Stack", desc: "Kontrol panelleri ve uzaktan erişim arayüzleri" },
            ]
        },
        projects: [
            {
                id: "1",
                title: "Yapay Zekâ Destekli Öğrenci Yoklama Sistemi",
                problem: "Yüz tanıma teknolojisiyle otomatik öğrenci yoklama ve takip sistemi.",
                systemFlow: "ESP32 Cam -> WebSocket -> Yüz Tanıma -> Kayıt",
                role: "Yapay Zekâ Geliştirici",
                stack: ["Python", "PyTorch", "ESP32", "OpenCV", "Websocket"],
                links: { github: "https://github.com/emr058/PyuzTanima", demo: "https://github.com/emr058/PyuzTanima" },
                category: "featured",
            },
            {
                id: "2",
                title: "E-Ticaret Web Sitesi",
                problem: "E-ticaret platformu için arka uç ve ön yüz geliştirme.",
                systemFlow: "Spring Boot -> PostgreSQL -> React",
                role: "Fullstack Geliştirici",
                stack: ["Spring Boot", "PostgreSQL", "React"],
                links: { github: "https://github.com/emr058/e-shop_app", demo: "https://github.com/emr058/e-shop_app" },
                category: "featured",
            },
            {
                id: "3",
                title: "Kişisel Portföy Web Sitesi",
                problem: "Kişisel portföy ve proje vitrin sitesi geliştirme.",
                systemFlow: "Next.js -> TypeScript -> Tailwind CSS",
                role: "Fullstack Geliştirici",
                stack: ["Next.js", "TypeScript", "Tailwind CSS"],
                links: { github: "https://github.com/emr058/portweb", demo: "emirr.com.tr" },
                category: "featured",
            },
            {
                id: "r1",
                title: "Yapay Zekâ Destekli Öğrenci Yoklama Sistemi",
                problem: "ESP32 Cam ile öğrenci takip ve yoklama sistemi.",
                systemFlow: "ESP32 Cam -> WebSocket -> Yüz Tanıma -> Kayıt",
                role: "Robotik Geliştirici",
                stack: ["Python", "PyTorch", "ESP32", "OpenCV", "Websocket"],
                links: { github: "https://github.com/emr058/PyuzTanima", demo: "https://github.com/emr058/PyuzTanima" },
                category: "robotics",
            },
            {
                id: "a1",
                title: "Yapay Zekâ Destekli Öğrenci Yoklama Sistemi",
                problem: "Öğrencilerin derse katılımını izlemek için yapay zekâ destekli bir sistem.",
                systemFlow: "ESP32 Cam -> WebSocket -> Yüz Tanıma -> Kayıt",
                role: "Yapay Zekâ Geliştirici",
                stack: ["Python", "PyTorch", "ESP32", "OpenCV", "Websocket"],
                links: { github: "https://github.com/emr058/PyuzTanima", demo: "https://github.com/emr058/PyuzTanima" },
                category: "ai",
            },
            {
                id: "f1",
                title: "Kişisel Portföy Web Sitesi",
                problem: "Kişisel portföy ve proje vitrin sitesi geliştirme.",
                systemFlow: "Next.js -> TypeScript -> Tailwind CSS",
                role: "Fullstack Geliştirici",
                stack: ["Next.js", "TypeScript", "Tailwind CSS"],
                links: { github: "#" },
                category: "fullstack",
            }
        ],
        playbook: [
            {
                id: "p1",
                title: "Görüntü İşleme ve Model Entegrasyonu",
                description: "OpenCV ve PyTorch kullanarak gerçek zamanlı yüz tanıma ve veri işleme süreçleri.",
            },
            {
                id: "p2",
                title: "IoT ve Gerçek Zamanlı İletişim",
                description: "ESP32 Cam ve WebSocket protokolü ile donanım ve yazılım arasında düşük gecikmeli veri aktarımı.",
            },
            {
                id: "p3",
                title: "Modern Frontend ve Performans",
                description: "Next.js ve Tailwind CSS ile optimize edilmiş, SEO dostu ve kullanıcı deneyimi yüksek web arayüzleri.",
            },
        ],
        about: {
            title: "Hakkımda",
            description: "Robotik sistemler, araç otomasyonları ve yazılım tabanlı kontrol sistemlerine özel ilgi duyuyorum. Üniversite eğitimim ve staj deneyimlerim süresince yazılım geliştirme, algoritma tasarımı ve temel düzeyde yapay zekâ uygulamaları üzerinde çalıştım. Gerçek sistemler üzerinde öğrenmeye açık, teknik gelişimimi sahada ilerletmeyi hedefleyen bir mühendis adayıyım.",
            skills: ["Python", "Java", "C++", "JavaScript", "React", "Vue", "MySQL", "PostgreSQL", "MongoDB", "Git", "Docker", "ROS"],
            stats: {
                ai: "Yapay Zekâ Projeleri",
                robotics: "Robotik Sistemler",
                vehicle: "Araç Yazılımı",
                fullstack: "Full Stack"
            }
        },
        experience: [
            {
                id: "32bit",
                company: "32Bit Bilgisayar",
                role: "Fullstack Web Geliştirici",
                period: "Haziran 2025 - Temmuz 2025",
                description: "Bir e-ticaret projesinin arka uç ve ön yüz geliştirme süreçlerinde sorumluluk üstlendim. Proje kapsamındaki ilerleme ve teknik güncellemeler hakkında haftalık koordinasyon toplantılarında kapsamlı raporlama yaptım.",
                tech: ["Spring Boot", "React", "PostgreSQL", "Java", "JavaScript"]
            },
            {
                id: "novelty",
                company: "Novelty Yapay Zeka",
                role: "Yapay Zekâ Mühendisliği Stajyeri",
                period: "Haziran 2024 - Ağustos 2024",
                description: "Sağlık sektörüne yönelik geliştirilen full-stack bir web sitesinin teslim sürecinde aktif rol aldım. Temel düzeyde yapay zekâ projelerinde görev alarak makine öğrenimi ve Flask gibi teknolojilerle ilk deneyimlerimi edindim.",
                tech: ["Python", "Flask", "OpenCV", "C#", "Blazorise"]
            }
        ],
        contact: {
            title: "İletişime Geç",
            subtitle: "Projeleriniz veya olası iş birlikleri için benimle iletişime geçebilirsiniz.",
            cta: "Hemen İletişime Geç"
        }
    },
    en: {
        personal: {
            name: "Emir Aydın",
            title: "AI & Robotics Engineer",
            tagline: "Developing vehicle software, robotic automation systems, and AI integrations.",
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
                title: "AI-Powered Student Attendance System",
                problem: "Automatic student attendance and tracking system using face recognition technology.",
                systemFlow: "ESP32 Cam -> WebSocket -> Face Recognition -> Record",
                role: "AI Developer",
                stack: ["Python", "PyTorch", "ESP32", "OpenCV", "Websocket"],
                links: { github: "https://github.com/emr058/PyuzTanima", demo: "https://github.com/emr058/PyuzTanima" },
                category: "featured",
            },
            {
                id: "2",
                title: "E-Commerce Website",
                problem: "Back-end and front-end development for an e-commerce platform.",
                systemFlow: "Spring Boot -> PostgreSQL -> React",
                role: "Fullstack Developer",
                stack: ["Spring Boot", "PostgreSQL", "React"],
                links: { github: "https://github.com/emr058/e-shop_app", demo: "https://github.com/emr058/e-shop_app" },
                category: "featured",
            },
            {
                id: "3",
                title: "Personal Portfolio Website",
                problem: "Personal portfolio and project showcase site development.",
                systemFlow: "Next.js -> TypeScript -> Tailwind CSS",
                role: "Fullstack Developer",
                stack: ["Next.js", "TypeScript", "Tailwind CSS"],
                links: { github: "https://github.com/emr058/portweb", demo: "emirr.com.tr" },
                category: "featured",
            },
            {
                id: "r1",
                title: "AI-Powered Student Attendance System",
                problem: "Student tracking and attendance system using ESP32 Cam.",
                systemFlow: "ESP32 Cam -> WebSocket -> Face Recognition -> Record",
                role: "Robotics Developer",
                stack: ["Python", "PyTorch", "ESP32", "OpenCV", "Websocket"],
                links: { github: "https://github.com/emr058/PyuzTanima", demo: "https://github.com/emr058/PyuzTanima" },
                category: "robotics",
            },
            {
                id: "a1",
                title: "AI-Powered Student Attendance System",
                problem: "An AI-powered system for monitoring student class attendance.",
                systemFlow: "ESP32 Cam -> WebSocket -> Face Recognition -> Record",
                role: "AI Developer",
                stack: ["Python", "PyTorch", "ESP32", "OpenCV", "Websocket"],
                links: { github: "https://github.com/emr058/PyuzTanima", demo: "https://github.com/emr058/PyuzTanima" },
                category: "ai",
            },
            {
                id: "f1",
                title: "Personal Portfolio Website",
                problem: "Personal portfolio and project showcase site development.",
                systemFlow: "Next.js -> TypeScript -> Tailwind CSS",
                role: "Fullstack Developer",
                stack: ["Next.js", "TypeScript", "Tailwind CSS"],
                links: { github: "#" },
                category: "fullstack",
            }
        ],
        playbook: [
            {
                id: "p1",
                title: "Image Processing & Model Integration",
                description: "Real-time face recognition and data processing pipelines using OpenCV and PyTorch.",
            },
            {
                id: "p2",
                title: "IoT & Real-Time Communication",
                description: "Low-latency data transfer between hardware and software via ESP32 Cam and WebSocket.",
            },
            {
                id: "p3",
                title: "Modern Frontend & Performance",
                description: "SEO-friendly, high-performance web interfaces optimized with Next.js and Tailwind CSS.",
            },
        ],
        about: {
            title: "About Me",
            description: "I have a keen interest in robotic systems, vehicle automation, and software-based control systems. Throughout my university education and internships, I have worked on software development, algorithm design, and foundational AI applications. I am an aspiring engineer eager to learn through hands-on experience and committed to advancing my technical skills in the field.",
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
                description: "Contributed to the back-end and front-end development of an e-commerce project. Delivered comprehensive progress and technical update reports during weekly coordination meetings.",
                tech: ["Spring Boot", "React", "PostgreSQL", "Java", "JavaScript"]
            },
            {
                id: "novelty",
                company: "Novelty Design & AI",
                role: "AI Engineering Intern",
                period: "June 2024 - August 2024",
                description: "Played an active role in delivering a full-stack website developed for the healthcare sector. Gained hands-on experience with machine learning and Flask by contributing to entry-level AI projects.",
                tech: ["Python", "Flask", "OpenCV", "C#", "Blazorise"]
            }
        ],
        contact: {
            title: "Let's Connect",
            subtitle: "Feel free to reach out for projects or collaborations.",
            cta: "Contact Now"
        }
    },
};
