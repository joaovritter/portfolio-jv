export type Tech = {
  name: string;
  /** Cor de marca (hex) — usada no ícone e no recolor do hover */
  color: string;
  /** Slug do Simple Icons (https://cdn.simpleicons.org/<slug>). Vazio = usa glyph */
  slug?: string;
  /** URL completa de um ícone (ex.: devicon). Tem prioridade sobre o slug. */
  icon?: string;
  /** Sigla de fallback caso o ícone não carregue */
  short?: string;
  /** Texto exibido quando não há ícone (ex.: "API", "AWS") */
  glyph?: string;
};

export type TechGroup = {
  label: string;
  hint: string;
  items: Tech[];
};

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

/** URL do ícone: devicon (icon) tem prioridade; senão Simple Icons colorido */
export const techIconUrl = (t: Tech) =>
  t.icon
    ? t.icon
    : t.slug
    ? `https://cdn.simpleicons.org/${t.slug}/${t.color.replace("#", "")}`
    : "";

export const techGroups: TechGroup[] = [
  {
    label: "Front-end & Mobile",
    hint: "Interfaces & apps",
    items: [
      { name: "React", color: "#61DAFB", slug: "react", short: "Re" },
      { name: "Next.js", color: "#FFFFFF", slug: "nextdotjs", short: "Nx" },
      { name: "Vue.js", color: "#42B883", slug: "vuedotjs", short: "Vu" },
      { name: "React Native", color: "#61DAFB", slug: "react", short: "RN" },
      { name: "Flutter", color: "#54C5F8", slug: "flutter", short: "Fl" },
      { name: "Dart", color: "#0175C2", icon: `${DEVICON}/dart/dart-original.svg`, short: "Da" },
      { name: "TypeScript", color: "#3178C6", slug: "typescript", short: "TS" },
      { name: "JavaScript", color: "#F7DF1E", slug: "javascript", short: "JS" },
      { name: "HTML5", color: "#E34F26", slug: "html5", short: "H5" },
      { name: "CSS3", color: "#1572B6", slug: "css", short: "C3" },
      { name: "Tailwind CSS", color: "#38BDF8", slug: "tailwindcss", short: "Tw" },
    ],
  },
  {
    label: "Back-end & APIs",
    hint: "Servidores & integrações",
    items: [
      { name: "Node.js", color: "#5FA04E", slug: "nodedotjs", short: "No" },
      { name: "NestJS", color: "#E0234E", slug: "nestjs", short: "Ne" },
      { name: "Java", color: "#EA2D2E", icon: `${DEVICON}/java/java-original.svg`, short: "Ja" },
      { name: "Spring Boot", color: "#6DB33F", icon: `${DEVICON}/spring/spring-original.svg`, short: "Sb" },
      { name: "Python", color: "#FFD43B", slug: "python", short: "Py" },
      { name: "APIs REST", color: "#CBB89D", short: "Ap", glyph: "API" },
    ],
  },
  {
    label: "Banco de Dados",
    hint: "Persistência & BaaS",
    items: [
      { name: "PostgreSQL", color: "#4169E1", slug: "postgresql", short: "Pg" },
      { name: "MySQL", color: "#4479A1", slug: "mysql", short: "My" },
      { name: "MongoDB", color: "#47A248", slug: "mongodb", short: "Mo" },
      { name: "Firebase", color: "#FFCA28", slug: "firebase", short: "Fb" },
    ],
  },
  {
    label: "Cloud & DevOps",
    hint: "Infra & nuvem",
    items: [
      { name: "AWS", color: "#FF9900", icon: `${DEVICON}/amazonwebservices/amazonwebservices-original-wordmark.svg`, short: "AW", glyph: "AWS" },
      { name: "Google Cloud", color: "#4285F4", slug: "googlecloud", short: "GC" },
      { name: "Docker", color: "#2496ED", slug: "docker", short: "Dk" },
      { name: "Linux", color: "#FCC624", slug: "linux", short: "Lx" },
      { name: "Git", color: "#F05032", slug: "git", short: "Gi" },
    ],
  },
  {
    label: "Arquitetura & IA",
    hint: "Boas práticas & LLMs",
    items: [
      { name: "Clean Architecture", color: "#CBB89D", short: "CA", glyph: "CA" },
      { name: "Padrão MVC", color: "#CBB89D", short: "MV", glyph: "MVC" },
      { name: "Testes Unitários", color: "#CBB89D", short: "UT", glyph: "UT" },
      { name: "Integração com LLMs", color: "#CBB89D", short: "AI", glyph: "AI" },
    ],
  },
];
