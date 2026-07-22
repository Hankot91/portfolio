import { SiGithub } from "@icons-pack/react-simple-icons";
import { LinkedInIcon } from "./icons/LinkedInIcon";
import { useLanguage } from "../i18n/language-context";

const GITHUB_URL = "https://github.com/Hankot91";
const LINKEDIN_URL = "https://www.linkedin.com/in/camilov99/";

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
					<a
						href={GITHUB_URL}
						target="_blank"
						rel="noreferrer"
						aria-label="GitHub"
						className="text-on-surface-variant hover:text-primary"
					>
						<SiGithub size={18} color="currentColor" />
					</a>
					<a
						href={LINKEDIN_URL}
						target="_blank"
						rel="noreferrer"
						aria-label="LinkedIn"
						className="text-on-surface-variant hover:text-primary"
					>
						<LinkedInIcon className="size-4.5" />
					</a>
				</div>
			</div>
		</footer>
	);
}
