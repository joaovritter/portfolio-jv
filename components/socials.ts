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

//linkedin usa svg embutido, pois o cdn nao tem linkedin
const inlineIcons: Record<string, string> = {
  linkedin:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z'/%3E%3C/svg%3E\")",
};

/** URL do ícone monocromático (para máscara CSS) */
export const iconMask = (slug: string) =>
  inlineIcons[slug] ?? `url(https://cdn.simpleicons.org/${slug})`;
