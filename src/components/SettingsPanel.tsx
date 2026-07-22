import { useEffect, useRef, useState } from "react";
import { Settings, Sun, Moon } from "lucide-react";
import { useLanguage } from "../i18n/language-context";
import { useTheme } from "../hooks/useTheme";

export function SettingsPanel() {
	const [open, setOpen] = useState(false);
	const panelRef = useRef<HTMLDivElement>(null);
	const { t, lang, toggleLang } = useLanguage();
	const { theme, toggleTheme } = useTheme();

	useEffect(() => {
		function onClickOutside(e: MouseEvent) {
			if (
				panelRef.current &&
				!panelRef.current.contains(e.target as Node)
			) {
				setOpen(false);
			}
		}
		function onEscape(e: KeyboardEvent) {
			if (e.key === "Escape") setOpen(false);
		}
		document.addEventListener("mousedown", onClickOutside);
		document.addEventListener("keydown", onEscape);
		return () => {
			document.removeEventListener("mousedown", onClickOutside);
			document.removeEventListener("keydown", onEscape);
		};
	}, []);

	return (
		<div ref={panelRef} className="relative">
			<button
				onClick={() => setOpen((v) => !v)}
				aria-label="Configuración"
				aria-expanded={open}
				className="rounded p-2 text-on-surface-variant hover:text-primary"
			>
				<Settings className="size-5" />
			</button>

			{open && (
				<div className="absolute right-0 mt-2 w-56 rounded-lg border border-outline-variant/30 bg-surface-container p-3 shadow-lg">
					<div className="flex items-center justify-between px-2 py-2">
						<span className="text-sm text-on-surface-variant">
							<span className="text-sm text-on-surface-variant">
								{t("settings_idioma")}
							</span>
						</span>
						<button
							onClick={toggleLang}
							className="rounded px-3 py-1 font-mono text-xs font-medium text-primary hover:bg-primary/10"
						>
							{lang === "es" ? "Español" : "English"}
						</button>
					</div>

					<div className="flex items-center justify-between px-2 py-2">
						<span className="text-sm text-on-surface-variant">
							<span className="text-sm text-on-surface-variant">
								{t("settings_tema")}
							</span>
						</span>
						<button
							onClick={toggleTheme}
							className="flex items-center gap-2 rounded px-3 py-1 text-xs font-medium text-primary hover:bg-primary/10"
						>
							{theme === "emerald" ? (
								<>
									<Sun className="size-4" /> Solar
								</>
							) : (
								<>
									<Moon className="size-4" /> Emerald
								</>
							)}
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
