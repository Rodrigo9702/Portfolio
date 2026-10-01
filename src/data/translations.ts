export type Language = "es" | "en";

export interface ProjectTranslation {
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  galleryCaptions: string[];
}

export const translations = {
  es: {
    nav: {
      about: "Sobre mí",
      experience: "Experiencia",
      skills: "Skills",
      projects: "Proyectos",
      contact: "Contacto",
      cvUrl: "/cv_es.pdf",
      cvLabel: "CV ↗",
      langAria: "Cambiar idioma",
    },
    hero: {
      available: "Disponible para proyectos · Buenos Aires",
      titleLine1: "AI AGENT",
      titleLine2: "DEVELOPER",
      description: "Especialista en sistemas conversacionales avanzados, orquestación de flujos agénticos (LLMs) y arquitectura de software escalable.",
      githubPrefix: "Construyendo en",
      linkedinPrefix: "Trayectoria en",
      scrollDown: "Desliza para explorar ↓",
    },
    about: {
      headingPart1: "Diseñando",
      headingPart2: "el Futuro",
      headingPart3: "Conversacional",
      p1: "Soy AI Agent Developer Ssr. enfocado en crear, implementar y optimizar soluciones conversacionales basadas en Inteligencia Artificial. Combino mi experiencia en desarrollo de software con una sólida mentalidad analítica proveniente de mi formación en QA Automation para construir sistemas escalables y libres de errores.",
      p2: "Mi especialidad radica en diseñar arquitecturas complejas de intenciones, orquestar Agentic Workflows, automatizar procesos con LangChain y n8n, y conectar LLMs a herramientas corporativas mediante MCP (Model Context Protocol).",
      p3: "Estudiante de 3.º año de Ingeniería en Informática (UNLaM). Disfruto colaborar junto a equipos de Producto y Negocio bajo metodologías ágiles, aportando resolución rápida de problemas y aprendizaje autónomo para transformar necesidades en agentes virtuales inteligentes.",
      cards: [
        {
          title: "AI & Agentic Workflows",
          desc: "Orquestación de LLMs, MCP y flujos multi-agente.",
        },
        {
          title: "Integraciones & Dev",
          desc: "Node.js, Python, APIs y automatización en n8n.",
        },
        {
          title: "QA & Robustez",
          desc: "Automatización, testing estructurado y confiabilidad.",
        },
      ],
    },
    experience: {
      sectionLabel: "TRAYECTORIA",
      sectionTitle: "Experiencia Laboral",
      eduLabel: "FORMACIÓN",
      eduTitle: "Educación",
      certLabel: "LOGROS & VALIDACIONES",
      certTitle: "Certificaciones Destacadas",
      previewAlt: "Vista previa del certificado",
      noPreview: "Certificación profesional verificada",
      jobs: [
        {
          role: "AI Agent Developer Ssr",
          company: "Botmaker",
          date: "Abril 2025 - Actualidad",
          desc: [
            "Lidero el diseño y despliegue de soluciones agénticas de IA escalables, integrando la lógica de negocio con LLMs.",
            "Desarrollo ecosistemas conversacionales de alta complejidad mediante la definición de intenciones y orquestación de Agentic Workflows.",
            "Implemento MCP (Model Context Protocol) para integración segura de herramientas corporativas.",
            "Automatizo procesos y construyo integraciones robustas en JavaScript, Node.js y Python.",
          ],
        },
        {
          role: "QA Tester Jr / Analista de Testing",
          company: "QActions Group",
          date: "Septiembre 2024 - Marzo 2025",
          desc: [
            "Diseñé y ejecuté casos de prueba manuales y automatizados para sistemas críticos.",
            "Automaticé procesos de testing con Tricentis Tosca (certificaciones AS1 y AS2).",
            "Identifiqué y documenté defectos en el ciclo de vida del software (SDLC).",
            "Trabajé en equipos técnicos bajo marcos Agile y Scrum.",
          ],
        },
      ],
      education: [
        {
          degree: "Ingeniería en Informática",
          institution: "Universidad Nacional de La Matanza",
          date: "2022 - Actualidad (3.º año)",
        },
        {
          degree: "Técnico Electrónico",
          institution: "Escuela Secundaria Técnica N.° 6",
          date: "2015 - 2021",
        },
      ],
      certifications: [
        {
          title: "Foundation: Introduction to Deep Agents",
          issuer: "LangChain",
        },
        {
          title: "Claude 101",
          issuer: "Anthropic",
        },
        {
          title: "AI Fluency: Framework & Foundations",
          issuer: "Anthropic",
        },
        {
          title: "n8n Course Level 2",
          issuer: "n8n",
        },
        {
          title: "n8n Course Level 1",
          issuer: "n8n",
        },
        {
          title: "Gestión de Proyectos y Fundamentos Agile",
          issuer: "Santander Open Academy",
        },
        {
          title: "Programación orientada a objetos con IA",
          issuer: "EducacionIT",
        },
        {
          title: "Tricentis Tosca Fundamentals (AS2)",
          issuer: "Tricentis",
        },
        {
          title: "Tricentis Tosca Fundamentals (AS1)",
          issuer: "Tricentis",
        },
        {
          title: "Deep Learning",
          issuer: "CACIC",
        },
      ],
    },
    skills: {
      sectionLabel: "STACK TECNOLÓGICO",
      sectionTitle: "Habilidades & Herramientas",
      categories: [
        "IA & Soluciones Agénticas",
        "LLMs & APIs",
        "Software & Desarrollo Web",
        "QA & Cloud",
      ],
    },
    projects: {
      sectionLabel: "PROYECTOS SELECCIONADOS",
      sectionTitle: "Trabajos Destacados",
      disclaimer: "* Muestras y capturas de carácter ilustrativo para demostración técnica.",
    },
    contact: {
      sectionLabel: "¿TIENES UN PROYECTO EN MENTE?",
      titleLine1: "Iniciemos una",
      titleLine2: "conversación",
      description: "Disponible para colaborar en desarrollo de agentes de IA, integraciones y soluciones a medida.",
      copyEmail: "Copiar correo",
      copied: "Copiado al portapapeles",
      location: "Ubicación",
      locationValue: "Buenos Aires, Argentina",
      channels: "Canales",
      devDesign: "Desarrollo & Diseño",
    },
    projectDetail: {
      back: "VOLVER A PROYECTOS",
      live: "Live en producción",
      roleLabel: "Rol / Responsabilidad",
      roleValue: "Arquitectura & Desarrollo",
      categoryLabel: "Categoría",
      yearLabel: "Año",
      accessLabel: "Acceso",
      accessLive: "Sitio público",
      accessPrivate: "Demo / Privado",
      techStackLabel: "TECNOLOGÍAS:",
      galleryLabel: "RECORRIDO VISUAL & CAPTURAS",
      galleryTitle: "Galería de Módulos",
      previewPrefix: "PREVIEW",
      nextLabel: "SIGUIENTE PROYECTO",
      viewCaseStudy: "Ver Caso de Estudio",
    },
  },
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
      cvUrl: "/cv_en.pdf",
      cvLabel: "CV ↗",
      langAria: "Switch language",
    },
    hero: {
      available: "Available for projects · Buenos Aires",
      titleLine1: "AI AGENT",
      titleLine2: "DEVELOPER",
      description: "Specialist in advanced conversational systems, agentic workflow orchestration (LLMs), and scalable software architecture.",
      githubPrefix: "Building on",
      linkedinPrefix: "Career on",
      scrollDown: "Scroll to explore ↓",
    },
    about: {
      headingPart1: "Designing",
      headingPart2: "the Future",
      headingPart3: "Conversational",
      p1: "I am a Mid-Senior AI Agent Developer focused on creating, deploying, and optimizing conversational solutions powered by Artificial Intelligence. I combine my software engineering background with a strong analytical mindset from QA Automation to engineer robust, scalable, error-free systems.",
      p2: "My expertise centers on designing complex intent architectures, orchestrating Agentic Workflows, automating processes with LangChain and n8n, and connecting LLMs to enterprise toolchains via MCP (Model Context Protocol).",
      p3: "Computer Science & Engineering student (3rd year at UNLaM). I enjoy partnering with Product and Business stakeholders under agile methodologies, bringing rapid problem-solving and self-directed learning to transform complex requirements into intelligent virtual agents.",
      cards: [
        {
          title: "AI & Agentic Workflows",
          desc: "LLM orchestration, MCP, and multi-agent workflows.",
        },
        {
          title: "Integrations & Dev",
          desc: "Node.js, Python, APIs, and n8n workflow automation.",
        },
        {
          title: "QA & Robustness",
          desc: "Automation, structured testing, and system reliability.",
        },
      ],
    },
    experience: {
      sectionLabel: "CAREER PATH",
      sectionTitle: "Work Experience",
      eduLabel: "EDUCATION",
      eduTitle: "Academic Background",
      certLabel: "CREDENTIALS & HONORS",
      certTitle: "Featured Certifications",
      previewAlt: "Certificate preview",
      noPreview: "Verified professional credential",
      jobs: [
        {
          role: "AI Agent Developer Ssr",
          company: "Botmaker",
          date: "April 2025 - Present",
          desc: [
            "Lead the design and deployment of scalable agentic AI solutions, bridging business logic with LLMs.",
            "Architect high-complexity conversational ecosystems through intent design and Agentic Workflow orchestration.",
            "Implement MCP (Model Context Protocol) for secure enterprise tool integration.",
            "Automate processes and build robust backend integrations in JavaScript, Node.js, and Python.",
          ],
        },
        {
          role: "Junior QA Tester / Test Analyst",
          company: "QActions Group",
          date: "September 2024 - March 2025",
          desc: [
            "Designed and executed manual and automated test suites for mission-critical enterprise systems.",
            "Automated testing pipelines with Tricentis Tosca (holding AS1 and AS2 certifications).",
            "Identified, documented, and tracked defects throughout the Software Development Life Cycle (SDLC).",
            "Collaborated within cross-functional technical teams under Agile and Scrum frameworks.",
          ],
        },
      ],
      education: [
        {
          degree: "B.S. in Computer Science & Software Engineering",
          institution: "Universidad Nacional de La Matanza",
          date: "2022 - Present (3rd Year)",
        },
        {
          degree: "Electronic Technician",
          institution: "Technical High School No. 6",
          date: "2015 - 2021",
        },
      ],
      certifications: [
        {
          title: "Foundation: Introduction to Deep Agents",
          issuer: "LangChain",
        },
        {
          title: "Claude 101",
          issuer: "Anthropic",
        },
        {
          title: "AI Fluency: Framework & Foundations",
          issuer: "Anthropic",
        },
        {
          title: "n8n Course Level 2",
          issuer: "n8n",
        },
        {
          title: "n8n Course Level 1",
          issuer: "n8n",
        },
        {
          title: "Project Management and Agile Foundations",
          issuer: "Santander Open Academy",
        },
        {
          title: "Object-Oriented Programming with AI",
          issuer: "EducacionIT",
        },
        {
          title: "Tricentis Tosca Fundamentals (AS2)",
          issuer: "Tricentis",
        },
        {
          title: "Tricentis Tosca Fundamentals (AS1)",
          issuer: "Tricentis",
        },
        {
          title: "Deep Learning",
          issuer: "CACIC",
        },
      ],
    },
    skills: {
      sectionLabel: "TECH STACK",
      sectionTitle: "Skills & Toolset",
      categories: [
        "AI & Agentic Solutions",
        "LLMs & APIs",
        "Software & Web Dev",
        "QA & Cloud",
      ],
    },
    projects: {
      sectionLabel: "SELECTED PROJECTS",
      sectionTitle: "Featured Work",
      disclaimer: "* Demos and screenshots are illustrative for technical showcase.",
    },
    contact: {
      sectionLabel: "HAVE A PROJECT IN MIND?",
      titleLine1: "Let's start a",
      titleLine2: "conversation",
      description: "Available to collaborate on AI agent development, integrations, and custom solutions.",
      copyEmail: "Copy email",
      copied: "Copied to clipboard",
      location: "Location",
      locationValue: "Buenos Aires, Argentina",
      channels: "Channels",
      devDesign: "Development & Design",
    },
    projectDetail: {
      back: "BACK TO PROJECTS",
      live: "Live in production",
      roleLabel: "Role / Responsibility",
      roleValue: "Architecture & Development",
      categoryLabel: "Category",
      yearLabel: "Year",
      accessLabel: "Access",
      accessLive: "Public Site",
      accessPrivate: "Demo / Private",
      techStackLabel: "TECH STACK:",
      galleryLabel: "VISUAL WALKTHROUGH & SCREENSHOTS",
      galleryTitle: "Module Gallery",
      previewPrefix: "PREVIEW",
      nextLabel: "NEXT PROJECT",
      viewCaseStudy: "View Case Study",
    },
  },
};

export type Translations = typeof translations.es;
