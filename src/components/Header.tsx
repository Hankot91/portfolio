import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../i18n/language-context";
import { SettingsPanel } from "./SettingsPanel";

const NAV_KEYS = [
	{ key: "nav_inicio", href: "#inicio" },
	{ key: "nav_proyectos", href: "#proyectos" },
	{ key: "nav_educacion", href: "#educacion" },
	{ key: "nav_skills", href: "#skills" },
	{ key: "nav_hobbies", href: "#hobbies" },
	{ key: "nav_contacto", href: "#contacto" },
] as const;

export function Header() {
	const { t, lang } = useLanguage();
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<header className="fixed top-0 z-50 w-full border-b border-outline-variant/30 bg-surface/70 backdrop-blur-md">
			<div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
				<a
					href="#inicio"
					className="font-display text-xl font-bold text-primary"
				>
					Andrés Vanegas
				</a>

				<nav className="hidden items-center gap-8 md:flex">
					{NAV_KEYS.map(({ key, href }) => (
						<a
							key={key}
							href={href}
							className="text-sm text-on-surface-variant transition-colors hover:text-primary"
						>
							{t(key)}
						</a>
					))}
				</nav>

				<div className="flex items-center gap-2">
					<SettingsPanel />

					<a
						href={lang === "es" ? "/cv-es.pdf" : "/cv-en.pdf"}
						download
						className="hidden rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-on-primary transition-transform hover:scale-105 active:scale-95 md:inline-block"
					>
						{t("nav_cv")}
					</a>

					<button
						onClick={() => setMenuOpen((v) => !v)}
						aria-expanded={menuOpen}
						aria-label="Abrir menú"
						className="rounded p-2 text-on-surface-variant hover:text-primary md:hidden"
					>
						{menuOpen ? (
							<X className="size-6" />
						) : (
							<Menu className="size-6" />
						)}
					</button>
				</div>
			</div>

			{menuOpen && (
				<nav className="flex flex-col gap-1 border-t border-outline-variant/20 bg-surface px-6 py-4 md:hidden">
					{NAV_KEYS.map(({ key, href }) => (
						<a
							key={key}
							href={href}
							onClick={() => setMenuOpen(false)}
							className="rounded-lg px-3 py-3 text-on-surface-variant hover:bg-surface-container hover:text-primary"
						>
							{t(key)}
						</a>
					))}
					<a
						href={lang === "es" ? "/cv-es.pdf" : "/cv-en.pdf"}
						download
						className="mt-2 rounded-lg bg-primary px-4 py-3 text-center font-bold text-on-primary"
					>
						{t("nav_cv")}
					</a>
				</nav>
			)}
		</header>
	);
}
