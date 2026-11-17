import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MotionConfig } from "framer-motion";
import { initAnalytics } from "./lib/analytics";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<MotionConfig reducedMotion="user">
			<App />
		</MotionConfig>
	</StrictMode>,
);

// La analítica nunca compite con el primer render
if ("requestIdleCallback" in window) requestIdleCallback(initAnalytics);
else setTimeout(initAnalytics, 2000);
