export type ProjectImage = {
  /** Caminho do arquivo em /public/projects/ */
  src: string;
  /** Descrição curta — aparece no cantinho da imagem e na tela cheia */
  caption: string;
};

export type Project = {
  id: string;
  title: string;
  /** Frase curta exibida no card */
  tagline: string;
  /** Descrição completa exibida no modal */
  description: string;
  /** Lista de destaques / o que foi feito */
  highlights: string[];
  /** Stack usada — aparece como tags */
  stack: string[];
  year: string;
  /** Link do repositório (deixe "" para esconder o botão) */
  github?: string;
  /** Link do deploy / projeto no ar (deixe "" para esconder o botão) */
  demo?: string;
  /**
   * Imagens do projeto (sem vídeo). Coloque os arquivos em /public/projects/
   * e referencie aqui. A primeira imagem é usada como capa do card.
   * Cada imagem tem uma legenda (caption) dizendo qual página/tela é.
   */
  images: ProjectImage[];
};

/**
 * COMO ADICIONAR UM PROJETO:
 * 1. Coloque as imagens em  public/projects/  (ex.: public/projects/meu-app/tela1.png)
 * 2. Duplique um bloco abaixo e ajuste os campos.
 * 3. Cada imagem é um objeto { src, caption } — a caption aparece no cantinho.
 * 4. O botão "Acessar projeto" usa `demo`; o de código usa `github`.
 *
 * As imagens com placeholder (.svg) são só para você ver o layout —
 * basta substituir pelos prints reais dos seus projetos.
 */
export const projects: Project[] = [
  {
    id: "ritter-co-clinica",
    title: "Ritter&Co — Sistema de Gestão para Clínica Estética",
    tagline:
      "Plataforma fullstack de agendamento, financeiro e dashboards para uma clínica de estética.",
    description:
      "Sistema completo de gestão para a clínica da Dra. Camila Ritter (Biomédica Esteta): agendamento de procedimentos em calendário, controle de caixa e painéis analíticos. O backend aplica transações de banco e controle de concorrência otimista (versionamento de registros) para garantir consistência mesmo com acessos simultâneos — ex.: dois usuários editando o mesmo agendamento, onde o segundo recebe um conflito (HTTP 409) em vez de sobrescrever dados.",
    highlights: [
      "Controle de concorrência otimista (campo de versão) — conflitos retornam HTTP 409 em vez de corromper dados",
      "Transações de banco orquestradas: agendar reserva o horário e cria o registro de forma atômica (commit/rollback)",
      "Dashboards de gestão (estilo BI): faturamento por mês/procedimento/forma de pagamento, ticket médio e extrato de caixa",
      "Conclusão de procedimento que registra valor + forma de pagamento na mesma transação",
      "Autenticação com JWT + bcrypt e hardening da API (Helmet, rate limiting, CORS)",
      "Interface mobile-first com tema próprio, calendário mensal e exportação de extrato em PDF",
    ],
    stack: [
      "React",
      "Vite",
      "Material UI",
      "Node.js",
      "Express",
      "PostgreSQL",
      "JWT",
    ],
    year: "2026",
    github: "https://github.com/joaovritter/agendamentoClinica",
    demo: "",
    images: [
      { src: "/projects/gestao-clinica/tela1.png", caption: "Início — visão geral e próximo agendamento" },
      { src: "/projects/gestao-clinica/tela2.png", caption: "Calendário e histórico de atendimentos" },
      { src: "/projects/gestao-clinica/tela3.png", caption: "Agendamento de procedimento" },
      { src: "/projects/gestao-clinica/tela4.png", caption: "Gestão — KPIs e gráficos de faturamento" },
      { src: "/projects/gestao-clinica/tela5.png", caption: "Caixa / extrato com exportação em PDF" },
    ],
  },
  {
    id: "projeto-2",
    title: "Automação de Rotinas Internas",
    tagline: "Scripts e integrações que eliminam tarefas repetitivas.",
    description:
      "Conjunto de automações e integrações de APIs criadas para otimizar rotinas internas e reduzir trabalho manual, conectando sistemas distintos e gerando relatórios automaticamente.",
    highlights: [
      "Integração entre múltiplos sistemas via APIs REST e webhooks",
      "Geração automática de relatórios",
      "Redução significativa de trabalho manual repetitivo",
    ],
    stack: ["Node.js", "Python", "REST APIs", "Docker"],
    year: "2025",
    github: "https://github.com/joaovritter",
    demo: "",
    images: [
      { src: "/projects/placeholder-2.svg", caption: "Fluxo de automação" },
      { src: "/projects/placeholder-1.svg", caption: "Relatório gerado" },
    ],
  },
  {
    id: "projeto-3",
    title: "App Mobile — Conceito",
    tagline: "Aplicativo multiplataforma com foco em UX.",
    description:
      "Aplicativo mobile multiplataforma construído com foco em experiência do usuário, navegação fluida e componentização. Integra autenticação e consumo de API em tempo real.",
    highlights: [
      "Interface fluida e componentizada",
      "Autenticação e consumo de API em tempo real",
      "Build único para Android e iOS",
    ],
    stack: ["React Native", "TypeScript", "Firebase"],
    year: "2024",
    github: "https://github.com/joaovritter",
    demo: "",
    images: [
      { src: "/projects/placeholder-3.svg", caption: "Tela inicial" },
      { src: "/projects/placeholder-1.svg", caption: "Login" },
    ],
  },
];
