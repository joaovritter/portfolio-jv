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
   * Capa do card na seção Projetos — normalmente um logo/arte do projeto.
   * Aparece centralizada e inteira (sem cortar) sobre um fundo neutro.
   * Se você não definir, o card usa a primeira imagem do carrossel como capa.
   */
  thumbnail?: string;
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
 * 5. (Opcional) Defina `thumbnail` com o caminho de um logo/arte para ser a
 *    capa do card. Sem ele, o card usa a primeira imagem do carrossel.
 *
 * As imagens com placeholder (.svg) são só para você ver o layout —
 * basta substituir pelos prints reais dos seus projetos.
 */
export const projects: Project[] = [
  {
    id: "train-bala",
    title: "TrainBala — App de Treino de Hipertrofia com IA",
    tagline: "Registro de séries e feedback personalizado de treino via IA.",
    description:
      "Aplicativo full-stack para acompanhamento de treinos de hipertrofia: o usuário monta sua divisão semanal, registra cada série (peso, reps e RIR) e, ao finalizar, recebe um feedback gerado por IA (Google Gemini) com score, insights e metas de carga para a próxima sessão. Inclui análise de progresso com gráficos, calendário de histórico e uma aba de guias com aulas por exercício geradas por IA.",
    highlights: [
      "Feedback de treino por IA (Google Gemini): score, insights e metas automáticas de carga/reps para a próxima sessão",
      "Análise de progresso filtrável (volume, carga máxima e 1RM estimado por Epley) com gráficos por grupamento e exercício",
      "Aba Guia com aulas por exercício geradas por IA e cacheadas no banco, mais vídeo via busca no YouTube",
      "Sessão de treino persistente: cronômetro e séries sobrevivem à navegação e ao reload (web)",
      "Autenticação JWT + bcrypt, onboarding em wizard e exercícios personalizados por usuário",
      "Deploy próprio em VM no Google Cloud com Docker Compose (PostgreSQL + Node/Express + Nginx HTTPS)",
    ],
    stack: ["Flutter", "Dart", "Node.js", "Express", "PostgreSQL", "Docker", "Nginx", "Google Gemini", "JWT"],
    year: "2026",
    demo: "https://34.39.173.247",
    // thumbnail: "/projects/train-bala/logo.png", // descomente após adicionar o logo
    images: [
      { src: "/projects/train-bala/tela1.png", caption: "Login na conta" },
      { src: "/projects/train-bala/tela2.png", caption: "Início — resumo dos últimos 7 dias e treino do dia" },
      { src: "/projects/train-bala/tela3.png", caption: "Sessão de treino — registro de séries (peso, reps e RIR) com meta da IA" },
      { src: "/projects/train-bala/tela4.png", caption: "Resultado do treino — score, resumo e estatísticas" },
      { src: "/projects/train-bala/tela5.png", caption: "Feedback da IA — insights e metas de carga para a próxima sessão" },
      { src: "/projects/train-bala/tela6.png", caption: "Calendário de histórico — treinos do mês e frequência semanal" },
      { src: "/projects/train-bala/tela7.png", caption: "Análise de progresso — evolução de carga e volume por exercício" },
      { src: "/projects/train-bala/tela8.png", caption: "Guia — exercícios por grupamento muscular" },
      { src: "/projects/train-bala/tela9.png", caption: "Aula do exercício gerada por IA com vídeo no YouTube" },
      { src: "/projects/train-bala/tela10.png", caption: "Perfil — dados físicos e divisão de treino semanal" },
    ],

  },

  {
    id: "ritter",
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
    demo: "",
    // thumbnail: "/projects/gestao-clinica/logo.png", // descomente após adicionar o logo
    images: [
      { src: "/projects/gestao-clinica/tela1.png", caption: "Início — visão geral e próximo agendamento" },
      { src: "/projects/gestao-clinica/tela2.png", caption: "Calendário e histórico de atendimentos" },
      { src: "/projects/gestao-clinica/tela3.png", caption: "Agendamento de procedimento" },
      { src: "/projects/gestao-clinica/tela4.png", caption: "Gestão — KPIs e gráficos de faturamento" },
      { src: "/projects/gestao-clinica/tela5.png", caption: "Caixa / extrato com exportação em PDF" },
    ],
  },

  {

    id: "alugueis-alzira",
    title: "Alzira Ritter — Aluguéis de Verão",
    tagline: "Site institucional de temporada para apartamentos em Capão da Canoa/RS.",
    description:
      "Landing page institucional (front-end estático, sem servidor ou banco de dados) para divulgar apartamentos de aluguel de temporada em Capão da Canoa/RS. Apresenta cada imóvel com galeria de fotos, comodidades, diferenciais e mapa embarcado, com toda a negociação direcionada ao WhatsApp. Conteúdo (textos, fotos e contatos) centralizado em um único arquivo de dados para facilitar a manutenção pela proprietária.",
    highlights: [
      "Seção por apartamento com carrossel de fotos (Embla) com miniaturas, contador e lightbox fullscreen",
      "Mapa do Google Maps embarcado (sem chave de API) e botão 'Aernativa",
      "Animações de entrada por scroll com Framer Motion e botão flutuante de WhatsApp em todas as telas",
      "Conteúdo 100% editável em um único arquivo (apartments.js):s e lista de fotos",
      "Design system próprio com paleta azul-petróleo + dourado, tipografia e layout responsivo com menu mobile",
      "Valores 'sob consulta' com CTAs que abrem conversa pré-preenchida",
    ],
    stack: ["React", "Vite", "JavaScript", "Framer Motion", "Vercel"],
    year: "2026",
    demo: "https://alziraalugueis.vercel.app/",
    // thumbnail: "/projects/alugueis-alzira/logo.png", // descomente após adicionar o logo
    images: [
      { src: "/projects/alugueis-alzira/tela1.png", caption: "" },
      { src: "/projects/alugueis-alzira/tela2.png", caption: "" },
      { src: "/projects/alugueis-alzira/tela3.png", caption: "" },

    ],
  },
];
