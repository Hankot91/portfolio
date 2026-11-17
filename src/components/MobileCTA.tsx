import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useLanguage } from "../i18n/language-context";
import { useActiveSection } from "../hooks/useActiveSection";
import { track } from "../lib/analytics";

const IDS = ["inicio", "contacto"] as const;

/** Barra fija inferior solo en móvil: aparece tras el hero y se oculta en Contacto. */
export function MobileCTA() {
	const { t, lang } = useLanguage();
	const [pastHero, setPastHero] = useState(false);
	const active = useActiveSection(IDS);
	const { scrollY } = useScroll();
	useMotionValueEvent(scrollY, "change", (v) => setPastHero(v > 480));

	const cvHref = lang === "es" ? "/cv-es.pdf" : "/cv-en.pdf";

	return (
		<AnimatePresence>
			{pastHero && active !== "contacto" && (
				<motion.div
					initial={{ y: "120%" }}
					animate={{ y: 0 }}
					exit={{ y: "120%" }}
					transition={{ type: "spring", duration: 0.4, bounce: 0 }}
					className="glass fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-outline-variant/30 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
				>
					<a
						href="#contacto"
						onClick={() => track("cta_click", { location: "mobile_bar", target: "contact" })}
						className="flex-1 rounded-xl bg-primary py-3 text-center font-bold text-on-primary transition-transform duration-150 active:scale-[0.97]"
					>
						{t("hero_cta_contact")}
					</a>
					<a
						href={cvHref}
						download
						onClick={() => track("cv_download", { location: "mobile_bar", lang })}
						className="flex-1 rounded-xl border border-outline-variant py-3 text-center font-bold text-on-surface transition-transform duration-150 active:scale-[0.97]"
					>
						{t("nav_cv")}
					</a>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
