/**
 * Google Tag Manager. GA4 (y cualquier otra etiqueta) se configura dentro del
 * contenedor de GTM, no en el código. Los eventos del sitio se envían al
 * dataLayer como { event: "nombre", ...parametros }.
 *
 * Se omite para navegadores automatizados y usuarios con "Do Not Track".
 * El ID del contenedor es público; VITE_GTM_ID permite cambiarlo sin tocar código.
 */
const GTM_ID = (import.meta.env.VITE_GTM_ID as string | undefined) || "GTM-554W54GT";

declare global {
	interface Window {
		dataLayer: Record<string, unknown>[];
	}
}

function enabled() {
	return Boolean(GTM_ID) && !navigator.webdriver && navigator.doNotTrack !== "1";
}

export function initAnalytics() {
	if (!enabled()) return;
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

	const script = document.createElement("script");
	script.async = true;
	script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
	document.head.appendChild(script);
}

export function track(event: string, params: Record<string, unknown> = {}) {
	if (!enabled()) return;
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({ event, ...params });
}
