export const PROJECTS = [
  {
    slug: "epifron",
    title: "Epifron",
    category: "Fintech & AI",
    year: "2026",
    description: "Sistema operativo financiero bimonetario (ARS/USD). Control patrimonial, tracking de cuotas y categorización de gastos mediante asistente conversacional con IA.",
    color: "#10b981", // Emerald Green (Finances)
    techStack: ["Python 3.12", "Flask", "SQLite WAL", "Tailwind CSS", "Groq / LLaMA 3.3", "Telegram Bot API"],
    video: "/media/epifron-chat.webm",
    poster: "/media/epifron-chat-poster.webp",
    image: "/media/epifron-dash.webp",
    gallery: [
      { type: 'video', src: '/media/epifron-chat.webm', poster: '/media/epifron-chat-poster.webp', caption: 'Demo del Asistente Flotante Epi: Registro de gastos y consulta en lenguaje natural' },
      { type: 'image', src: '/media/epifron-dash.webp', caption: 'Dashboard Swiss Archival: Hero bimonetario ARS/USD, asset allocation y métricas Bento' },
      { type: 'image', src: '/media/epifron-cuotas.webp', caption: 'Módulo de Tarjetas y Cuotas: Tarjetas estilo Apple Wallet y amortización' },
      { type: 'image', src: '/media/epifron-movimientos.webp', caption: 'Libro Mayor Forense: Filtros interactivos con chips, búsqueda y conciliación' },
      { type: 'image', src: '/media/epifron-inv.webp', caption: 'Portafolio de Inversiones: CEDEARs, Cripto y Dólares con cotizaciones en vivo' },
      { type: 'image', src: '/media/epifron-proy.webp', caption: 'Proyecciones Financieras: Comparativa real vs proyectado mes a mes' },
      { type: 'image', src: '/media/epifron-tarjetas.webp', caption: 'Gestión de Tarjetas: Límites de consumo y alertas de vencimiento' }
    ],
    fullDescription: "Epifron es un SaaS de finanzas personales y gestión patrimonial bimonetaria (ARS/USD) diseñado bajo la estética Swiss Vintage Archival / Obsidian Matte. Integra un asistente conversacional flotante (Epi) para registrar transacciones en lenguaje natural con inferencia ultrarrápida, complementado por un dashboard con Hero de patrimonio neto, cuadrícula Bento, tarjetas estilo Apple Wallet y libro mayor forense de alta densidad."
  },
  {
    slug: "talos",
    title: "Talos",
    category: "AI Security & QA",
    year: "2026",
    description: "Bastión de contención y QA para agentes de IA empresariales. Auditorías continuas con paradigma LLM-as-a-Judge, 7 motores TOSCA-AI y red-teaming OWASP.",
    color: "#c5a880", // Bronze Hefesto (Athen / Talos)
    techStack: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "SQLite WAL", "LLM-as-a-Judge", "OWASP Top 10"],
    video: "/media/talos-tour.webm",
    poster: "/media/talos-tour-poster.webp",
    image: "/media/talos-dash.webp",
    gallery: [
      { type: 'video', src: '/media/talos-tour.webm', poster: '/media/talos-tour-poster.webp', caption: 'Recorrido Interactivo: Dashboard Bento, suites, inspector de auditoría y telemetría' },
      { type: 'image', src: '/media/talos-dash.webp', caption: 'Panel de Control: Métricas de adherencia, quality gates y estadísticas globales' },
      { type: 'image', src: '/media/talos-suites.webp', caption: 'Gestor de Suites: Casos de prueba con progressive disclosure y preview de prompts' },
      { type: 'image', src: '/media/talos-runs.webp', caption: 'Consola de Auditoría: Inspector turn-by-turn del LLM Judge con veredictos PASS/FAIL/WARN' },
      { type: 'image', src: '/media/talos-interactions.webp', caption: 'Observabilidad en Vivo: Trazas de ejecución de agentes, latencia y telemetría HTTP' },
      { type: 'image', src: '/media/talos-adversarial.webp', caption: 'Módulo de Auto-Red-Teaming: Pruebas generativas contra OWASP Top 10 for LLMs' }
    ],
    fullDescription: "Talos es una plataforma integral para certificar, auditar y contener agentes autónomos de IA en entornos corporativos. Implementa el paradigma LLM-as-a-Judge para evaluar fidelidad a directivas (ground truth), defensas contra jailbreaks y prompt injection (OWASP LLM01), contención de tool-calling en sandbox y telemetría de ejecución multi-canal en tiempo real."
  },
  {
    slug: "aevni",
    title: "AEVNI",
    category: "AI Tool",
    year: "2026",
    description: "Herramienta optimizadora, creadora y editora de prompts. Maximiza la calidad de las interacciones con LLMs mediante ingeniería de prompts avanzada.",
    color: "#8b5cf6", // Purple (AI)
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Anthropic Claude API", "Framer Motion"],
    video: "/media/aevni-optimizar.webm",
    poster: "/media/aevni-optimizar-poster.webp",
    image: "/media/aevni.webp",
    gallery: [
      { type: 'video', src: '/media/aevni-optimizar.webm', poster: '/media/aevni-optimizar-poster.webp', caption: 'Demo: Optimización de Prompts y Ahorro de Tokens' },
      { type: 'image', src: '/media/aevni.webp', caption: 'Vista Principal: Selector de Proveedores y Modos' },
      { type: 'image', src: '/media/aevni-crear.webp', caption: 'Creador de Prompts con Descripción y Tono' },
      { type: 'image', src: '/media/aevni-diff.webp', caption: 'Análisis y Comparación de Diferencias en el Prompt' },
      { type: 'image', src: '/media/aevni-resultado.webp', caption: 'Resultado de Optimización y Evaluación de Tokens' },
      { type: 'image', src: '/media/aevni-directorio.webp', caption: 'Directorio de Modelos Recomendados' }
    ],
    fullDescription: "AEVNI actúa como un meta-asistente para mejorar la interacción con los LLMs. Reduce significativamente el conteo de tokens (hasta un 40% de ahorro) reestructurando y optimizando los prompts antes de enviarlos a modelos de producción, manteniendo intacta la intención y calidad original de las instrucciones."
  },
  {
    slug: "career-tracker",
    title: "Career Tracker",
    category: "Productivity",
    year: "2026",
    description: "Sistema para el seguimiento del avance académico y profesional. Gestiona notas, cronogramas y progreso de la cursada universitaria en tiempo real.",
    color: "#ff6b00", // Bright Orange
    techStack: ["React", "TypeScript", "Tailwind CSS", "Zustand", "Vite"],
    video: "/media/career-tour.webm",
    poster: "/media/career-tour-poster.webp",
    image: "/media/career.webp",
    gallery: [
      { type: 'video', src: '/media/career-tour.webm', poster: '/media/career-tour-poster.webp', caption: 'Recorrido por la Aplicación' },
      { type: 'image', src: '/media/career.webp', caption: 'Grafo de Correlativas: Estructura del Plan de Estudios' },
      { type: 'image', src: '/media/career-avance.webp', caption: 'Avance de Carrera y Distribución de Notas' },
      { type: 'image', src: '/media/career-cronograma.webp', caption: 'Armado Automático de Horario sin Superposiciones' },
      { type: 'image', src: '/media/career-planificador.webp', caption: 'Planificador: Materias Ordenadas por Impacto' }
    ],
    fullDescription: "Career Tracker es una solución interactiva para estudiantes universitarios, transformando planes de estudio estáticos en grafos interactivos donde se visualizan trabas, correlativas y rutas críticas. Facilita la planificación cuatrimestral resolviendo conflictos de horarios de forma automática."
  }
];
