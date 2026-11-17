import type { TranslationKey } from "../i18n/translations";

export interface FaqItem {
	q: TranslationKey;
	a: TranslationKey;
	/** Enlace interno a la sección relacionada (interlinking) */
	href?: string;
	link?: TranslationKey;
}

// Fuente única: la usan la UI y el JSON-LD (FAQPage) para que siempre coincidan.
export const FAQ_ITEMS: FaqItem[] = [
	{ q: "faq_q1", a: "faq_a1", href: "#educacion", link: "nav_educacion" },
	{ q: "faq_q2", a: "faq_a2", href: "#skills", link: "nav_skills" },
	{ q: "faq_q3", a: "faq_a3", href: "#proyectos", link: "nav_proyectos" },
	{ q: "faq_q4", a: "faq_a4", href: "#contacto", link: "nav_contacto" },
	{ q: "faq_q5", a: "faq_a5" },
	{ q: "faq_q6", a: "faq_a6", href: "#contacto", link: "nav_contacto" },
];
