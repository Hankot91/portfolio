import { useRef } from "react";
import { GraduationCap, Code2, Leaf } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useLanguage } from "../i18n/language-context";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { Card } from "./Card";

const EDU_ITEMS = [
	{ titleKey: "edu_sistemas", dateKey: "edu_sistemas_fecha", icon: GraduationCap },
	{ titleKey: "edu_frontend", dateKey: "edu_frontend_fecha", icon: Code2 },
	{ titleKey: "edu_green", dateKey: "edu_green_fecha", icon: Leaf },
] as const;

export function Educacion() {
	const { t } = useLanguage();
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start 65%", "end 55%"],
	});
	const scaleY = useSpring(scrollYProgress, {
		stiffness: 120,
		damping: 28,
		restDelta: 0.001,
	});

	return (
		<section id="educacion" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
			<SectionHeading title={t("edu_titulo")} />

			{/* Línea de tiempo que se dibuja con el scroll */}
			<div ref={ref} className="relative mt-14 max-w-3xl">
				<div className="absolute top-6 bottom-6 left-6 w-px -translate-x-1/2 bg-outline-variant/40" />
				<motion.div
					style={{ scaleY }}
					className="absolute top-6 bottom-6 left-6 w-px origin-top -translate-x-1/2 bg-primary"
				/>
				<ol className="space-y-6">
					{EDU_ITEMS.map(({ titleKey, dateKey, icon: Icon }, i) => (
						<li key={titleKey} className="relative pl-20">
							<div className="absolute top-0 left-0 flex size-12 items-center justify-center rounded-full border border-primary/40 bg-surface text-primary">
								<Icon className="size-5" />
							</div>
							<Reveal delay={i * 0.05}>
								<Card className="p-6">
									<h3 className="font-display text-lg font-bold tracking-tight text-on-surface">
										{t(titleKey)}
									</h3>
									<p className="mt-1 font-mono text-xs text-primary">{t(dateKey)}</p>
								</Card>
							</Reveal>
						</li>
					))}
				</ol>
			</div>
		</section>
	);
}
