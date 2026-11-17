import { useEffect } from "react";
import { useLanguage } from "../i18n/language-context";

function setContent(selector: string, value: string) {
	document.querySelector(selector)?.setAttribute("content", value);
}

/** Título y descripción propios de cada idioma (el HTML estático ya sale en español). */
export function useSeo() {
	const { t, lang } = useLanguage();

	useEffect(() => {
		const title = t("seo_title");
		const description = t("seo_description");
		document.title = title;
		setContent('meta[name="description"]', description);
		setContent('meta[property="og:title"]', title);
		setContent('meta[property="og:description"]', description);
		setContent('meta[property="og:locale"]', lang === "es" ? "es_CO" : "en_US");
		setContent('meta[name="twitter:title"]', title);
		setContent('meta[name="twitter:description"]', description);
	}, [lang, t]);
}
