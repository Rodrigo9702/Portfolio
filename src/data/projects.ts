export const PROJECTS = [
  {
    slug: "epifron",
    title: "Epifron",
    category: "Software",
    year: "2026",
    description: "Plataforma de seguimiento de finanzas y gastos personales. Diseñada para ofrecer insights detallados y mantener un control total de la economía personal mediante interacciones conversacionales con IA.",
    color: "#10b981", // Emerald Green (Finances)
    techStack: ["React", "Node.js", "Python", "Groq / LLaMA 3.3", "SQLite", "Telegram API"],
    video: "/media/epifron-chat.webm",
    poster: "/media/epifron-chat-poster.webp",
    image: "/media/epifron-dash.webp",
    gallery: [
      { type: 'video', src: '/media/epifron-chat.webm', poster: '/media/epifron-chat-poster.webp', caption: 'Demo del Chat de Finanzas (Groq/Llama 3.3)' },
      { type: 'image', src: '/media/epifron-dash.webp', caption: 'Dashboard General: KPIs, Gráficos y Próximos Pagos' },
      { type: 'image', src: '/media/epifron-cuotas.webp', caption: 'Gestión de Cuotas y Calendario de Pagos' },
      { type: 'image', src: '/media/epifron-proy.webp', caption: 'Proyecciones y Análisis Real vs Proyectado' },
      { type: 'image', src: '/media/epifron-inv.webp', caption: 'Portfolio de Inversiones (CEDEARs, Cripto, Dólares)' },
      { type: 'image', src: '/media/epifron-chat.webp', caption: 'Conversación vía Telegram' },
      { type: 'image', src: '/media/epifron-arch.webp', caption: 'Diagrama de Arquitectura del Sistema' }
    ],
    fullDescription: "Epifron es un asistente y plataforma de finanzas personales que integra Inteligencia Artificial para el registro rápido de gastos. Mediante chat natural (ej. 'gasté 48500 en el super con la visa'), el sistema categoriza y almacena la transacción automáticamente. Acompañado de un dashboard detallado para seguimiento de cuotas, proyecciones e inversiones."
  },
  {
    slug: "aevni",
    title: "AEVNI",
    category: "AI Tool",
    year: "2026",
    description: "Herramienta optimizadora, creadora y editora de prompts. Maximiza la calidad de las interacciones con LLMs mediante ingeniería de prompts avanzada.",
    color: "#8b5cf6", // Purple (AI)
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Anthropic Claude API", "Framer Motion"],
    liveUrl: "https://aevni.website/",
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
