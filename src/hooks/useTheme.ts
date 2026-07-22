import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "portfolio:theme";
export type Theme = "emerald" | "solar";
const listeners = new Set<() => void>();

function readValue(): Theme {
	return (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? "emerald";
}

function applyTheme(theme: Theme) {
	document.documentElement.setAttribute("data-theme", theme);
}

let cachedValue = readValue();
applyTheme(cachedValue);

function writeValue(theme: Theme) {
	cachedValue = theme;
	localStorage.setItem(STORAGE_KEY, theme);
	applyTheme(theme);
	listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
	listeners.add(listener);
	return () => listeners.delete(listener);
}

export function useTheme() {
	const theme = useSyncExternalStore(subscribe, () => cachedValue);
	const toggleTheme = useCallback(
		() => writeValue(cachedValue === "emerald" ? "solar" : "emerald"),
		[],
	);
	return { theme, toggleTheme };
}
