import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Settings, Sun, Moon } from "lucide-react";
import { useLanguage } from "../i18n/language-context";
import { useTheme } from "../hooks/useTheme";

export function SettingsPanel() {
	const [open, setOpen] = useState(false);
	const panelRef = useRef<HTMLDivElement>(null);
	const { t, lang, toggleLang } = useLanguage();
	const { theme, toggleTheme } = useTheme();

	useEffect(() => {
		function onClickOutside(e: PointerEvent) {
			if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
				setOpen(false);
			}
		}
		function onEscape(e: KeyboardEvent) {
			if (e.key === "Escape") setOpen(false);
		}
		document.addEventListener("pointerdown", onClickOutside);
		document.addEventListener("keydown", onEscape);
		return () => {
			document.removeEventListener("pointerdown", onClickOutside);
			document.removeEventListener("keydown", onEscape);
		};
	}, []);

	return (
		<div ref={panelRef} className="relative">
			<button
				onClick={() => setOpen((v) => !v)}
				aria-label={t("aria_config")}
				aria-expanded={open}
				className="rounded-full p-2 text-on-surface-variant transition-colors hover:text-primary"
			>
				<motion.span
					animate={{ rotate: open ? 60 : 0 }}
					transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
					className="block"
				>
					<Settings className="size-5" />
				</motion.span>
			</button>

			{/* El panel nace del botón (origen anclado) y vuelve por el mismo camino */}
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: -6 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: -6 }}
						transition={{ type: "spring", duration: 0.3, bounce: 0 }}
						style={{ transformOrigin: "top right" }}
						className="glass absolute right-0 mt-3 w-60 rounded-2xl border border-outline-variant/30 p-2 shadow-2xl shadow-black/20"
					>
						<div className="flex items-center justify-between px-3 py-2">
							<span className="text-sm text-on-surface-variant">
								{t("settings_idioma")}
							</span>
							<button
								onClick={toggleLang}
								className="rounded-full px-3 py-1 font-mono text-xs font-medium text-primary transition-colors hover:bg-primary/10 active:scale-95"
							>
								{lang === "es" ? "Español" : "English"}
							</button>
						</div>

						<div className="flex items-center justify-between px-3 py-2">
							<span className="text-sm text-on-surface-variant">
								{t("settings_tema")}
							</span>
							<button
								onClick={toggleTheme}
								className="flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/10 active:scale-95"
							>
								{theme === "dark" ? (
									<>
										<Sun className="size-4" /> {t("tema_claro")}
									</>
								) : (
									<>
										<Moon className="size-4" /> {t("tema_oscuro")}
									</>
								)}
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
