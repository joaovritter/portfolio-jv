import { profile } from "@/data/profile";

export type Social = { label: string; href: string; slug: string };

const wa = `https://wa.me/${profile.whatsapp}`;

/** Redes na ordem usada no hero e no menu mobile */
export const socials: Social[] = [
  { label: "GitHub", href: profile.socials.github, slug: "github" },
  { label: "LinkedIn", href: profile.socials.linkedin, slug: "linkedin" },
  { label: "Instagram", href: profile.socials.instagram, slug: "instagram" },
  { label: "WhatsApp", href: wa, slug: "whatsapp" },
];

/** Chips de contato do rodapé (ordem própria) */
export const contactLinks: Social[] = [
  { label: "WhatsApp", href: wa, slug: "whatsapp" },
  { label: "GitHub", href: profile.socials.github, slug: "github" },
  { label: "LinkedIn", href: profile.socials.linkedin, slug: "linkedin" },
  { label: "Instagram", href: profile.socials.instagram, slug: "instagram" },
];

export const whatsappLink = wa;

/** URL do ícone monocromático (para máscara CSS) */
export const iconMask = (slug: string) =>
  `url(https://cdn.simpleicons.org/${slug})`;
