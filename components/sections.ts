/** Mapa de seções + helper de navegação com transição animada. */

export type SectionMeta = { id: string; label: string; n: string };

export const sections: SectionMeta[] = [
  { id: "hero", label: "Início", n: "00" },
  { id: "sobre", label: "Sobre", n: "02" },
  { id: "experiencia", label: "Experiência", n: "03" },
  { id: "tecnologias", label: "Stack", n: "04" },
  { id: "projetos", label: "Projetos", n: "05" },
  { id: "formacao", label: "Formação", n: "06" },
  { id: "contato", label: "Contato", n: "07" },
];

export const sectionMeta = (id: string) =>
  sections.find((s) => s.id === id) ?? { id, label: id, n: "" };

export const NAV_EVENT = "nav:go";

/**
 * Pede a navegação para uma seção. <SectionTransition/> escuta o evento,
 * cobre a tela, rola e revela. Se o componente não estiver montado, o
 * fallback abaixo rola direto.
 */
export function goToSection(id: string) {
  if (typeof window === "undefined") return;
  const ev = new CustomEvent(NAV_EVENT, {
    detail: { id },
    cancelable: true,
  });
  const handled = !window.dispatchEvent(ev);
  if (!handled) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
