export interface LocalizedString {
  es: string;
  en: string;
}

export interface GalleryItem {
  type: "video" | "image";
  src: string;
  poster?: string;
  caption: LocalizedString | string;
}

export interface Project {
  slug: string;
  title: string;
  category: LocalizedString | string;
  year: string;
  description: LocalizedString | string;
  fullDescription: LocalizedString | string;
  color: string;
  techStack: string[];
  video?: string;
  poster?: string;
  image: string;
  liveUrl?: string;
  gallery: GalleryItem[];
}

export const PROJECTS: Project[] = [
  {
    slug: "epifron",
    title: "Epifron",
    category: {
      es: "Fintech & IA",
      en: "Fintech & AI"
    },
    year: "2026",
    description: {
      es: "Sistema operativo financiero bimonetario (ARS/USD). Control patrimonial, tracking de cuotas y categorización de gastos mediante asistente conversacional con IA.",
      en: "Bimonetary (ARS/USD) personal finance operating system. Net worth management, installment tracking, and expense categorization via conversational AI assistant."
    },
    color: "#10b981", // Emerald Green (Finances)
    techStack: ["Python 3.12", "Flask", "SQLite WAL", "Tailwind CSS", "Groq / LLaMA 3.3", "Telegram Bot API"],
    video: "/media/epifron-chat.webm",
    poster: "/media/epifron-chat-poster.webp",
    image: "/media/epifron-dash.webp",
    gallery: [
      {
        type: 'video',
        src: '/media/epifron-chat.webm',
        poster: '/media/epifron-chat-poster.webp',
        caption: {
          es: 'Demo del Asistente Flotante Epi: Registro de gastos y consulta en lenguaje natural',
          en: 'Floating Assistant Epi Demo: Natural language expense logging and queries'
        }
      },
      {
        type: 'image',
        src: '/media/epifron-dash.webp',
        caption: {
          es: 'Dashboard Swiss Archival: Hero bimonetario ARS/USD, asset allocation y métricas Bento',
          en: 'Swiss Archival Dashboard: Bimonetary ARS/USD Hero, asset allocation, and Bento metrics'
        }
      },
      {
        type: 'image',
        src: '/media/epifron-cuotas.webp',
        caption: {
          es: 'Módulo de Tarjetas y Cuotas: Tarjetas estilo Apple Wallet y amortización',
          en: 'Cards & Installments Module: Apple Wallet-style cards and amortization schedules'
        }
      },
      {
        type: 'image',
        src: '/media/epifron-movimientos.webp',
        caption: {
          es: 'Libro Mayor Forense: Filtros interactivos con chips, búsqueda y conciliación',
          en: 'Forensic General Ledger: Interactive chip filters, full-text search, and reconciliation'
        }
      },
      {
        type: 'image',
        src: '/media/epifron-inv.webp',
        caption: {
          es: 'Portafolio de Inversiones: CEDEARs, Cripto y Dólares con cotizaciones en vivo',
          en: 'Investment Portfolio: CEDEARs, Crypto, and Dollars with real-time market rates'
        }
      },
      {
        type: 'image',
        src: '/media/epifron-proy.webp',
        caption: {
          es: 'Proyecciones Financieras: Comparativa real vs proyectado mes a mes',
          en: 'Financial Forecasts: Month-over-month actual vs projected comparison'
        }
      },
      {
        type: 'image',
        src: '/media/epifron-tarjetas.webp',
        caption: {
          es: 'Gestión de Tarjetas: Límites de consumo y alertas de vencimiento',
          en: 'Card Management: Spending limits and due-date alerts'
        }
      }
    ],
    fullDescription: {
      es: "Epifron es un SaaS de finanzas personales y gestión patrimonial bimonetaria (ARS/USD) diseñado bajo la estética Swiss Vintage Archival / Obsidian Matte. Integra un asistente conversacional flotante (Epi) para registrar transacciones en lenguaje natural con inferencia ultrarrápida, complementado por un dashboard con Hero de patrimonio neto, cuadrícula Bento, tarjetas estilo Apple Wallet y libro mayor forense de alta densidad.",
      en: "Epifron is a bimonetary (ARS/USD) personal finance and wealth management SaaS built under a Swiss Vintage Archival / Obsidian Matte aesthetic. It integrates a floating conversational assistant (Epi) to log transactions in natural language with ultra-fast inference, complemented by a net-worth Hero dashboard, Bento grid, Apple Wallet-style installment cards, and a high-density forensic general ledger."
    }
  },
  {
    slug: "talos",
    title: "Talos",
    category: {
      es: "Seguridad IA & QA",
      en: "AI Security & QA"
    },
    year: "2026",
    description: {
      es: "Bastión de contención y QA para agentes de IA empresariales. Auditorías continuas con paradigma LLM-as-a-Judge, 7 motores TOSCA-AI y red-teaming OWASP.",
      en: "Containment bastion and QA testing suite for enterprise AI agents. Continuous audits via LLM-as-a-Judge, 7 TOSCA-AI engines, and OWASP red-teaming."
    },
    color: "#c5a880", // Bronze Hefesto (Athen / Talos)
    techStack: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "SQLite WAL", "LLM-as-a-Judge", "OWASP Top 10"],
    video: "/media/talos-tour.webm",
    poster: "/media/talos-tour-poster.webp",
    image: "/media/talos-dash.webp",
    gallery: [
      {
        type: 'video',
        src: '/media/talos-tour.webm',
        poster: '/media/talos-tour-poster.webp',
        caption: {
          es: 'Recorrido Interactivo: Dashboard Bento, suites, inspector de auditoría y telemetría',
          en: 'Interactive Tour: Bento dashboard, test suites, audit inspector, and telemetry'
        }
      },
      {
        type: 'image',
        src: '/media/talos-dash.webp',
        caption: {
          es: 'Panel de Control: Métricas de adherencia, quality gates y estadísticas globales',
          en: 'Control Panel: Adherence metrics, quality gates, and global performance statistics'
        }
      },
      {
        type: 'image',
        src: '/media/talos-suites.webp',
        caption: {
          es: 'Gestor de Suites: Casos de prueba con progressive disclosure y preview de prompts',
          en: 'Suite Manager: Test cases with progressive disclosure and prompt previews'
        }
      },
      {
        type: 'image',
        src: '/media/talos-runs.webp',
        caption: {
          es: 'Consola de Auditoría: Inspector turn-by-turn del LLM Judge con veredictos PASS/FAIL/WARN',
          en: 'Audit Console: Turn-by-turn LLM Judge inspector with PASS/FAIL/WARN verdicts'
        }
      },
      {
        type: 'image',
        src: '/media/talos-interactions.webp',
        caption: {
          es: 'Observabilidad en Vivo: Trazas de ejecución de agentes, latencia y telemetría HTTP',
          en: 'Live Observability: Agent execution traces, latency metrics, and HTTP telemetry'
        }
      },
      {
        type: 'image',
        src: '/media/talos-adversarial.webp',
        caption: {
          es: 'Módulo de Auto-Red-Teaming: Pruebas generativas contra OWASP Top 10 for LLMs',
          en: 'Auto-Red-Teaming Module: Generative adversarial test runs against OWASP Top 10 for LLMs'
        }
      }
    ],
    fullDescription: {
      es: "Talos es una plataforma integral para certificar, auditar y contener agentes autónomos de IA en entornos corporativos. Implementa el paradigma LLM-as-a-Judge para evaluar fidelidad a directivas (ground truth), defensas contra jailbreaks y prompt injection (OWASP LLM01), contención de tool-calling en sandbox y telemetría de ejecución multi-canal en tiempo real.",
      en: "Talos is an end-to-end platform for certifying, auditing, and containing autonomous AI agents in corporate environments. It implements the LLM-as-a-Judge paradigm to evaluate directive fidelity (ground truth), jailbreak and prompt injection defenses (OWASP LLM01), sandboxed tool-calling containment, and real-time multi-channel telemetry."
    }
  },
  {
    slug: "aevni",
    title: "AEVNI",
    category: {
      es: "Herramienta IA",
      en: "AI Tool"
    },
    year: "2026",
    description: {
      es: "Herramienta optimizadora, creadora y editora de prompts. Maximiza la calidad de las interacciones con LLMs mediante ingeniería de prompts avanzada.",
      en: "Prompt optimization, creation, and editing workbench. Maximizes LLM output quality through advanced prompt engineering and token efficiency."
    },
    color: "#8b5cf6", // Purple (AI)
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Anthropic Claude API", "Framer Motion"],
    video: "/media/aevni-optimizar.webm",
    poster: "/media/aevni-optimizar-poster.webp",
    image: "/media/aevni.webp",
    gallery: [
      {
        type: 'video',
        src: '/media/aevni-optimizar.webm',
        poster: '/media/aevni-optimizar-poster.webp',
        caption: {
          es: 'Demo: Optimización de Prompts y Ahorro de Tokens',
          en: 'Demo: Prompt Optimization and Token Savings'
        }
      },
      {
        type: 'image',
        src: '/media/aevni.webp',
        caption: {
          es: 'Vista Principal: Selector de Proveedores y Modos',
          en: 'Main View: Provider and Mode Selector'
        }
      },
      {
        type: 'image',
        src: '/media/aevni-crear.webp',
        caption: {
          es: 'Creador de Prompts con Descripción y Tono',
          en: 'Prompt Creator with Persona and Tone Tuning'
        }
      },
      {
        type: 'image',
        src: '/media/aevni-diff.webp',
        caption: {
          es: 'Análisis y Comparación de Diferencias en el Prompt',
          en: 'Diff Analysis and Structural Prompt Comparison'
        }
      },
      {
        type: 'image',
        src: '/media/aevni-resultado.webp',
        caption: {
          es: 'Resultado de Optimización y Evaluación de Tokens',
          en: 'Optimization Output and Token Usage Evaluation'
        }
      },
      {
        type: 'image',
        src: '/media/aevni-directorio.webp',
        caption: {
          es: 'Directorio de Modelos Recomendados',
          en: 'Recommended LLM Models Directory'
        }
      }
    ],
    fullDescription: {
      es: "AEVNI actúa como un meta-asistente para mejorar la interacción con los LLMs. Reduce significativamente el conteo de tokens (hasta un 40% de ahorro) reestructurando y optimizando los prompts antes de enviarlos a modelos de producción, manteniendo intacta la intención y calidad original de las instrucciones.",
      en: "AEVNI functions as a meta-assistant designed to elevate LLM interactions. It cuts token consumption by up to 40% by restructuring and optimizing prompts before dispatching them to production models, preserving original instruction intent and fidelity."
    }
  },
  {
    slug: "career-tracker",
    title: "Career Tracker",
    category: {
      es: "Productividad",
      en: "Productivity"
    },
    year: "2026",
    description: {
      es: "Sistema para el seguimiento del avance académico y profesional. Gestiona notas, cronogramas y progreso de la cursada universitaria en tiempo real.",
      en: "Academic and professional progress tracking system. Manages grades, schedules, and university degree progression in real time."
    },
    color: "#ff6b00", // Bright Orange
    techStack: ["React", "TypeScript", "Tailwind CSS", "Zustand", "Vite"],
    video: "/media/career-tour.webm",
    poster: "/media/career-tour-poster.webp",
    image: "/media/career.webp",
    gallery: [
      {
        type: 'video',
        src: '/media/career-tour.webm',
        poster: '/media/career-tour-poster.webp',
        caption: {
          es: 'Recorrido por la Aplicación',
          en: 'Application Walkthrough'
        }
      },
      {
        type: 'image',
        src: '/media/career.webp',
        caption: {
          es: 'Grafo de Correlativas: Estructura del Plan de Estudios',
          en: 'Prerequisite Graph: Degree Plan Curriculum Structure'
        }
      },
      {
        type: 'image',
        src: '/media/career-avance.webp',
        caption: {
          es: 'Avance de Carrera y Distribución de Notas',
          en: 'Degree Progress Metrics and Grade Distribution'
        }
      },
      {
        type: 'image',
        src: '/media/career-cronograma.webp',
        caption: {
          es: 'Armado Automático de Horario sin Superposiciones',
          en: 'Automated Schedule Generator without Time Overlaps'
        }
      },
      {
        type: 'image',
        src: '/media/career-planificador.webp',
        caption: {
          es: 'Planificador: Materias Ordenadas por Impacto',
          en: 'Semester Planner: Courses Ranked by Critical Impact'
        }
      }
    ],
    fullDescription: {
      es: "Career Tracker es una solución interactiva para estudiantes universitarios, transformando planes de estudio estáticos en grafos interactivos donde se visualizan trabas, correlativas y rutas críticas. Facilita la planificación cuatrimestral resolviendo conflictos de horarios de forma automática.",
      en: "Career Tracker is an interactive productivity platform for university students, converting static curricula into dynamic visual dependency graphs highlighting prerequisites, bottlenecks, and critical paths. It streamlines semester planning by automatically resolving schedule clashes."
    }
  }
];

export function getLocalizedText(field: LocalizedString | string, lang: "es" | "en"): string {
  if (typeof field === "string") return field;
  return field[lang] || field.es || "";
}
