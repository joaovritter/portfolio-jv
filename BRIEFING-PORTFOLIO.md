# Briefing — Portfólio de João Vitor Ritter

> Fonte de verdade de **conteúdo** para o novo portfólio.
> Projetos e imagens **não** são duplicados aqui — ficam em `data/` e `public/` (ver seção [Projetos](#projetos) e [Assets](#assets)).
> O **design é livre** (cores, layout, tipografia, interações) — este arquivo trata só de quem é o João e o que precisa aparecer.

---

## 1. Identidade

| Campo | Valor |
|---|---|
| Nome | João Vitor Ritter |
| Nome completo | João Vitor Dos Santos Ritter |
| Cargo / título | Desenvolvedor Full Stack & Estudante de Sistemas de Informação |
| Título curto | Desenvolvedor Full Stack |
| Localização | Santa Maria — RS, Brasil |

Fonte canônica: `data/profile.ts` (`profile`).

---

## 2. Contato

| Canal | Valor |
|---|---|
| E-mail | joaovritter2004@gmail.com |
| Telefone | (55) 99963-3909 |
| WhatsApp | https://wa.me/5599963390 9 → número `55999633909` |
| GitHub | https://github.com/joaovritter |
| LinkedIn | https://www.linkedin.com/in/joaovritter |
| Instagram | https://www.instagram.com/joao_vritter |

---

## 3. Pitch (texto do topo / hero)

- **Saudação:** "Olá, eu sou"
- **Nome em destaque:** João Vitor dos Santos Ritter
- **Tagline:** "Desenvolvo sistemas completos, do banco de dados à interface do usuário. Meu foco é entender cada problema e criar soluções para dores reais."

---

## 4. Sobre mim

Título da seção: **"Além de código: construindo soluções completas."**

Parágrafos (na ordem):

1. Sou estudante de Sistemas de Informação na UFN e gosto de aprender coisa nova o tempo todo. Antes de sair codando, prefiro entender bem o problema.
2. Hoje trabalho na equipe de TI do Ministério Público do Trabalho (MPT). Cuido para a infraestrutura ficar de pé, dou suporte direto e desenvolvo sistemas e automações para resolver o que a instituição precisa no dia a dia.
3. Me viro bem no back-end e no front-end: faço interfaces responsivas, apps mobile, integração de APIs, serviços em nuvem e IA. Em qualquer um deles, prezo por código limpo e que faça sentido para o negócio.
4. Fora do código, sou apaixonado por esportes e carros. Treino e corro bastante; já completei duas meias-maratonas. Sou comunicativo, gosto de trabalhar em equipe e de fazer amizade por onde passo.

---

## 5. Personalidade & tom de voz

Pra guiar a **escrita** e a **vibe** do site (não é decoração — é como o João se apresenta):

- **Quem é:** comunicativo, alegre, faz amizade fácil, trabalha bem em equipe.
- **Como pensa:** entende o problema antes de codar; preza código limpo e que faça sentido pro negócio.
- **Atleta:** treina e corre; 2 meias-maratonas completas. Curte esportes e carros → tem a ver com ritmo, energia, movimento.
- **Objetivo do site:** passar boa impressão pra recrutadores e pessoas; mostrar que é dev completo e confiável, sem ser sério demais. e ousado no design

**Soft skills** (de `data/profile.ts`): Comunicação · Trabalho em equipe · Adaptabilidade · Persistência · Proatividade · Resolução de problemas.

---

## 6. Experiência profissional

Fonte canônica: `data/experiences.ts`.

### 6.1 Estagiário de TI & Desenvolvedor de Soluções — Ministério Público do Trabalho (MPT)
**Out 2025 — Presente** · *(atual)*

Suporte técnico de hardware e software em ambiente corporativo formal de alta responsabilidade, somado ao desenvolvimento de sistemas e automações para otimizar as rotinas da instituição.

- Desenvolvimento de sistemas paralelos e automações para problemas práticos
- Suporte técnico direto a usuários (hardware, software e sistemas internos)
- Manutenção de infraestrutura de TI e organização dos ambientes
- Manuseio de informações sensíveis com confidencialidade e ética

### 6.2 Desenvolvedor Front-End — eGestor (ZipLine)
**Set 2025 — Out 2025**

Prototipação, desenvolvimento e manutenção de layouts web com foco total em usabilidade, UI/UX e organização visual da interface.

- Implementação de interfaces modernas com HTML, CSS e JavaScript
- Contato direto com clientes para alinhamento de demandas
- Tradução de necessidades de negócio em ajustes técnicos
- Melhoria contínua da experiência do usuário (UX)

### 6.3 Montador Eletrônico (Jovem Aprendiz) — Digitalli Eletrônica
**Abr 2022 — Fev 2023**

Início da jornada na tecnologia atuando na montagem de equipamentos eletrônicos aplicados à automação industrial, construindo uma base sólida em hardware.

- Montagem de equipamentos eletrônicos para automação industrial
- Base sólida em hardware e atenção a detalhes

---

## 7. Tecnologias & ferramentas

Fonte canônica: `data/technologies.ts` (cada item tem `name`, `icon`, `color`, `category`).

**Front-end & Mobile** — React, Next.js, Vue.js, React Native, Flutter, Dart, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS

**Back-end & APIs** — Node.js, NestJS, Java, Spring Boot, Python, APIs REST

**Banco de Dados** — PostgreSQL, MySQL, MongoDB, Firebase

**Cloud & DevOps** — AWS, Google Cloud, Docker, Linux, Git

**Arquitetura & IA** — Clean Architecture, Padrão MVC, Testes Unitários, Integração com LLMs

---

## 8. Formação

Fonte canônica: `data/profile.ts` (`education`).

| Campo | Valor |
|---|---|
| Curso | Bacharelado em Sistemas de Informação |
| Instituição | Universidade Franciscana (UFN) |
| Período | 2023 — Atualmente |
| Semestre | 7º semestre |
| Foco | Desenvolvimento de software, lógica de programação, arquitetura de sistemas de informação e banco de dados. |

---

## 9. Projetos

> **Manter e referenciar** — os dados vivem em **`data/projects.ts`** e as imagens em **`public/projects/`**.
> O tipo `Project` tem: `id`, `title`, `tagline`, `description`, `highlights[]`, `stack[]`, `year`, `github?`, `demo?`, `thumbnail?`, `images[] ({ src, caption })`.
> A primeira imagem (ou `thumbnail`) é a capa do card; o modal mostra a galeria completa com legendas.

Índice atual (resumo — **não** é a fonte; a fonte é `data/projects.ts`):

| # | Projeto | Resumo | Pasta de imagens | Demo |
|---|---|---|---|---|
| 1 | **TrainBala** — App de Treino de Hipertrofia com IA | Registro de séries + feedback de treino por IA (Gemini). | `public/projects/train-bala/` (`logo.png` + `tela1..10.png`) | https://34.39.173.247 |
| 2 | **Ritter&Co** — Sistema de Gestão para Clínica Estética | Agendamento, financeiro e dashboards, com controle de concorrência. | `public/projects/gestao-clinica/` (`logo.png` + `tela1..5.png`) | — |
| 3 | **Alzira Ritter** — Aluguéis de Verão | Landing institucional de aluguel de temporada (Capão da Canoa/RS). | `public/projects/alugueis-alzira/` (`tela1..3.png`) | https://alziraalugueis.vercel.app/ |

> Observação: existem placeholders em `public/projects/placeholder-2.svg` e `placeholder-3.svg` (só layout — podem ser ignorados/removidos).

---

## 10. Assets

| Asset | Caminho (em `public/`) |
|---|---|
| Foto do João (retrato 4:5) | `/eu.jpeg` |
| Currículo (PDF, ~156 KB) | `/curriculo-joao-vitor-ritter.pdf` |
| Imagens de projetos | `/projects/<slug>/...` (ver tabela acima) |

---

## 11. Seções do site (conteúdo a cobrir)

Início (hero) · Sobre · Experiência · Tecnologias · Projetos · Formação · Contato.

> O **layout, a ordem visual, as cores e as interações são livres** — a única exigência é que todo o conteúdo acima apareça e que projetos/imagens venham de `data/` e `public/`.

---

## 12. Fontes de dados no código (resumo)

- `data/profile.ts` — identidade, contato, hero, sobre, soft skills, redes, formação (`profile`, `education`)
- `data/experiences.ts` — experiência profissional (`experiences`)
- `data/technologies.ts` — stack por categoria (`technologies`, `techCategories`)
- `data/projects.ts` — projetos + imagens (`projects`, tipo `Project`)
- `public/` — foto, currículo e imagens dos projetos
