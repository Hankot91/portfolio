import { ArrowUp } from "lucide-react";
import { ShareButton } from "./ShareButton";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { LinkedInIcon } from "./icons/LinkedInIcon";
import { GITHUB_URL, LINKEDIN_URL } from "../data/site";
import { useLanguage } from "../i18n/language-context";


export function Footer() {
	const { t } = useLanguage();
	const year = new Date().getFullYear();

	return (
		<footer className="border-t border-outline-variant/20">
			<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
				<p className="font-display font-bold text-primary">
					Andrés Vanegas
				</p>

				<p className="text-sm text-on-surface-variant">
					© {year} Andrés Vanegas. {t("footer_derechos")}
				</p>

				<div className="flex items-center gap-4">
					<ShareButton />
					<a
						href={GITHUB_URL}
						target="_blank"
						rel="noreferrer"
						aria-label="GitHub"
						className="text-on-surface-variant transition-colors hover:text-primary"
					>
						<SiGithub size={18} color="currentColor" />
					</a>
					<a
						href={LINKEDIN_URL}
						target="_blank"
						rel="noreferrer"
						aria-label="LinkedIn"
						className="text-on-surface-variant transition-colors hover:text-primary"
					>
						<LinkedInIcon className="size-4.5" />
					</a>
					<a
						href="#inicio"
						aria-label={t("aria_top")}
						className="ml-2 rounded-full border border-outline-variant/40 p-2 text-on-surface-variant transition-[color,border-color,transform] duration-150 hover:border-primary hover:text-primary active:scale-90"
					>
						<ArrowUp className="size-4" />
					</a>
				</div>
			</div>
		</footer>
	);
}
