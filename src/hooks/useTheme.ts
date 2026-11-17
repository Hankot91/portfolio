import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "portfolio:theme";
export type Theme = "dark" | "light";
const THEME_COLOR: Record<Theme, string> = { dark: "#111412", light: "#f6f7f4" };
const listeners = new Set<() => void>();

function readValue(): Theme {
	// Valores antiguos: "solar" → claro; cualquier otro → oscuro
	const saved = localStorage.getItem(STORAGE_KEY);
	return saved === "light" || saved === "solar" ? "light" : "dark";
}

function applyTheme(theme: Theme) {
	document.documentElement.setAttribute("data-theme", theme);
	document
		.querySelector('meta[name="theme-color"]')
		?.setAttribute("content", THEME_COLOR[theme]);
}

let cachedValue = readValue();
applyTheme(cachedValue);

function commit(theme: Theme) {
	cachedValue = theme;
	localStorage.setItem(STORAGE_KEY, theme);
	applyTheme(theme);
	listeners.forEach((listener) => listener());
}

/**
 * El cambio de tema repinta toda la página. En vez de animar cada elemento con
 * CSS (cientos de transiciones a la vez), el navegador toma una captura del
 * estado anterior y hace un fundido en la GPU (View Transitions API).
 * Sin soporte o con movimiento reducido, el cambio es instantáneo.
 */
function writeValue(theme: Theme) {
	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	if (reduced || !("startViewTransition" in document)) {
		commit(theme);
		return;
	}
	(document as Document & { startViewTransition: (cb: () => void) => unknown })
		.startViewTransition(() => commit(theme));
}

function subscribe(listener: () => void) {
	listeners.add(listener);
	return () => listeners.delete(listener);
}

export function useTheme() {
	const theme = useSyncExternalStore(subscribe, () => cachedValue);
	const toggleTheme = useCallback(
		() => writeValue(cachedValue === "dark" ? "light" : "dark"),
		[],
	);
	return { theme, toggleTheme };
}
