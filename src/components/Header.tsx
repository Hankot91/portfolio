import { useState } from "react";
import {
	AnimatePresence,
	motion,
	useMotionValueEvent,
	useScroll,
	useSpring,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../i18n/language-context";
import { useActiveSection } from "../hooks/useActiveSection";
import { track } from "../lib/analytics";
import { SettingsPanel } from "./SettingsPanel";

const NAV_KEYS = [
	{ key: "nav_inicio", href: "#inicio" },
	{ key: "nav_proyectos", href: "#proyectos" },
	{ key: "nav_educacion", href: "#educacion" },
	{ key: "nav_skills", href: "#skills" },
	{ key: "nav_hobbies", href: "#hobbies" },
	{ key: "nav_contacto", href: "#contacto" },
] as const;

const SECTION_IDS = NAV_KEYS.map((n) => n.href.slice(1));

export function Header() {
	const { t, lang } = useLanguage();
	const [menuOpen, setMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const active = useActiveSection(SECTION_IDS);

	const { scrollY, scrollYProgress } = useScroll();
	const progress = useSpring(scrollYProgress, {
		stiffness: 120,
		damping: 30,
		restDelta: 0.001,
	});
	useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 12));

	const cvHref = lang === "es" ? "/cv-es.pdf" : "/cv-en.pdf";

	return (
		<header
			className={`fixed top-0 z-50 w-full border-b transition-colors duration-300 ${
				scrolled || menuOpen
					? "glass border-outline-variant/30"
					: "border-transparent"
			}`}
		>
			<div
				className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-[height] duration-300 ease-out ${
					scrolled ? "h-16" : "h-20"
				}`}
			>
				<a href="#inicio" className="flex items-center gap-3">
					<span className="grid size-9 place-items-center rounded-xl bg-primary font-mono text-xs font-bold text-on-primary">
						AV
					</span>
					<span className="hidden font-display text-lg font-bold tracking-tight text-on-surface sm:inline">
						Andrés Vanegas
					</span>
				</a>

				<nav className="hidden items-center gap-1 md:flex">
					{NAV_KEYS.map(({ key, href }) => {
						const isActive = active === href.slice(1);
						return (
							<a
								key={key}
								href={href}
								aria-current={isActive ? "true" : undefined}
								className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
									isActive
										? "text-primary"
										: "text-on-surface-variant hover:text-on-surface"
								}`}
							>
								{isActive && (
									<motion.span
										layoutId="nav-pill"
										className="absolute inset-0 rounded-full bg-primary/12"
										transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
									/>
								)}
								<span className="relative">{t(key)}</span>
							</a>
						);
					})}
				</nav>

				<div className="flex items-center gap-2">
					<SettingsPanel />

					<a
						href={cvHref}
						download
						onClick={() => track("cv_download", { location: "header", lang })}
						className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-on-primary transition-transform duration-150 hover:scale-[1.03] active:scale-95 md:inline-block"
					>
						{t("nav_cv")}
					</a>

					<button
						onClick={() => setMenuOpen((v) => !v)}
						aria-expanded={menuOpen}
						aria-label={t("aria_menu")}
						className="rounded-full p-2 text-on-surface-variant transition-colors hover:text-primary md:hidden"
					>
						{menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
					</button>
				</div>
			</div>

			<AnimatePresence>
				{menuOpen && (
					<motion.nav
						initial={{ opacity: 0, y: -8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -8 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
						className="flex flex-col gap-1 border-t border-outline-variant/20 px-6 py-4 md:hidden"
					>
						{NAV_KEYS.map(({ key, href }) => (
							<a
								key={key}
								href={href}
								onClick={() => setMenuOpen(false)}
								className={`rounded-xl px-3 py-3 transition-colors active:bg-surface-container-high ${
									active === href.slice(1)
										? "bg-primary/10 text-primary"
										: "text-on-surface-variant"
								}`}
							>
								{t(key)}
							</a>
						))}
						<a
							href={cvHref}
							download
							className="mt-2 rounded-xl bg-primary px-4 py-3 text-center font-bold text-on-primary active:scale-[0.98]"
						>
							{t("nav_cv")}
						</a>
					</motion.nav>
				)}
			</AnimatePresence>

			<motion.div
				aria-hidden
				style={{ scaleX: progress }}
				className="absolute bottom-0 left-0 h-px w-full origin-left bg-primary"
			/>
		</header>
	);
}
