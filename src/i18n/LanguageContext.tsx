import { useEffect, useCallback, useMemo, useState, type ReactNode } from "react";
import { translations, type Lang } from "./translations";
import { LanguageContext, type LanguageContextValue } from "./language-context";

function detectLang(): Lang {
	const saved = localStorage.getItem("portfolio:lang");
	if (saved === "es" || saved === "en") return saved;
	// Crawlers y navegadores automatizados reportan en-US: se les sirve español
	const isBot = navigator.webdriver || /bot|crawl|spider|slurp|lighthouse/i.test(navigator.userAgent);
	if (isBot) return "es";
	return navigator.language.startsWith("en") ? "en" : "es";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
	const [lang, setLang] = useState<Lang>(detectLang);
	useEffect(() => {
		document.documentElement.lang = lang;
	}, [lang]);

	const toggleLang = useCallback(() => {
		setLang((prev) => {
			const next = prev === "es" ? "en" : "es";
			localStorage.setItem("portfolio:lang", next);
			return next;
		});
	}, []);

	const value = useMemo<LanguageContextValue>(
		() => ({ lang, t: (key) => translations[lang][key], toggleLang }),
		[lang, toggleLang],
	);

	return (
		<LanguageContext.Provider value={value}>
			{children}
		</LanguageContext.Provider>
	);
}
