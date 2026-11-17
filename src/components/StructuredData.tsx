import { useLanguage } from "../i18n/language-context";
import { GITHUB_URL, LINKEDIN_URL, SITE_URL } from "../data/site";
import { FAQ_ITEMS } from "../data/faq";

/**
 * Datos estructurados (JSON-LD). Person + ProfilePage + WebSite + FAQPage.
 * No se declara LocalBusiness: no existe un negocio registrado (ver README).
 */
export function StructuredData() {
	const { t, lang } = useLanguage();
	const inLanguage = lang === "es" ? "es-CO" : "en";

	const graph = [
		{
			"@type": "Person",
			"@id": `${SITE_URL}/#person`,
			name: "Andrés Vanegas",
			alternateName: "Andrés Camilo Vanegas",
			url: `${SITE_URL}/`,
			image: `${SITE_URL}/foto-perfil.webp`,
			description: t("seo_description"),
			address: {
				"@type": "PostalAddress",
				addressLocality: "Villavicencio",
				addressRegion: "Meta",
				addressCountry: "CO",
			},
			alumniOf: { "@type": "CollegeOrUniversity", name: "Universidad de los Llanos" },
			knowsLanguage: ["es", "en"],
			knowsAbout: [
				"Java", "Python", "C++", "PHP", "Laravel", "TypeScript", "React", "Next.js",
				"Node.js", "PostgreSQL", "MySQL", "MongoDB", "Git", "Docker",
			],
			sameAs: [GITHUB_URL, LINKEDIN_URL],
		},
		{
			"@type": "WebSite",
			"@id": `${SITE_URL}/#website`,
			url: `${SITE_URL}/`,
			name: t("seo_title"),
			inLanguage,
			publisher: { "@id": `${SITE_URL}/#person` },
		},
		{
			"@type": "ProfilePage",
			"@id": `${SITE_URL}/#profile`,
			url: `${SITE_URL}/`,
			name: t("seo_title"),
			description: t("seo_description"),
			inLanguage,
			isPartOf: { "@id": `${SITE_URL}/#website` },
			mainEntity: { "@id": `${SITE_URL}/#person` },
		},
		{
			"@type": "FAQPage",
			"@id": `${SITE_URL}/#faq`,
			inLanguage,
			mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
				"@type": "Question",
				name: t(q),
				acceptedAnswer: { "@type": "Answer", text: t(a) },
			})),
		},
	];

	const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(
		/</g,
		"\\u003c",
	);

	return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
