import { createContext, useContext } from "react";
import type { Lang, TranslationKey } from "./translations";

export interface LanguageContextValue {
	lang: Lang;
	t: (key: TranslationKey) => string;
	toggleLang: () => void;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useLanguage(): LanguageContextValue {
	const ctx = useContext(LanguageContext);
	if (!ctx)
		throw new Error("useLanguage debe usarse dentro de <LanguageProvider>");
	return ctx;
}
