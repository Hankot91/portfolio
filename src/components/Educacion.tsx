import { GraduationCap, Code2, Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/language-context";

const EDU_ITEMS = [
	{
		titleKey: "edu_sistemas",
		dateKey: "edu_sistemas_fecha",
		icon: GraduationCap,
	},
	{ titleKey: "edu_frontend", dateKey: "edu_frontend_fecha", icon: Code2 },
	{ titleKey: "edu_green", dateKey: "edu_green_fecha", icon: Leaf },
] as const;

export function Educacion() {
	const { t } = useLanguage();

	return (
		<section id="educacion" className="mx-auto max-w-6xl px-6 py-24">
			<h2 className="text-center font-display text-3xl font-bold text-on-surface">
				{t("edu_titulo")}
			</h2>

			<div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
				{EDU_ITEMS.map(({ titleKey, dateKey, icon: Icon }, i) => (
					<motion.div
						key={titleKey}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: false, amount: 0.4 }}
						transition={{ duration: 0.5, delay: i * 0.1 }}
						className="flex flex-col items-center rounded-xl border border-outline-variant/20 bg-surface-container/60 p-6 text-center"
					>
						<div className="flex size-12 items-center justify-center rounded-full bg-primary/15 text-primary">
							<Icon className="size-6" />
						</div>
						<h3 className="mt-4 font-display font-bold text-on-surface">
							{t(titleKey)}
						</h3>
						<p className="mt-1 font-mono text-xs text-on-surface-variant">
							{t(dateKey)}
						</p>
					</motion.div>
				))}
			</div>
		</section>
	);
}
