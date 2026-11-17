import { useState } from "react";
import { Check, Share2 } from "lucide-react";
import { SITE_URL } from "../data/site";
import { useLanguage } from "../i18n/language-context";
import { track } from "../lib/analytics";

/** Web Share API en móvil; en escritorio copia el enlace. */
export function ShareButton() {
	const { t } = useLanguage();
	const [copied, setCopied] = useState(false);

	async function share() {
		const data = { title: t("seo_title"), text: t("share_texto"), url: `${SITE_URL}/` };
		try {
			if (navigator.share) {
				await navigator.share(data);
				track("share", { method: "web_share" });
				return;
			}
			await navigator.clipboard.writeText(data.url);
			track("share", { method: "copy_link" });
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1800);
		} catch (err) {
			// Cerrar el menú nativo de compartir no es un error
			if (err instanceof DOMException && err.name === "AbortError") return;
		}
	}

	return (
		<button
			type="button"
			onClick={share}
			aria-label={t("share_aria")}
			className="flex items-center gap-2 rounded-full border border-outline-variant/40 px-3.5 py-2 text-sm text-on-surface-variant transition-[color,border-color,transform] duration-150 hover:border-primary hover:text-primary active:scale-95"
		>
			{copied ? <Check className="size-4 text-primary" /> : <Share2 className="size-4" />}
			<span aria-live="polite">{copied ? t("share_copiado") : t("share_btn")}</span>
		</button>
	);
}
