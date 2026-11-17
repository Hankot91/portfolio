import {
	motion,
	useMotionValue,
	useReducedMotion,
	useSpring,
	useTransform,
	type Variants,
} from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useLanguage } from "../i18n/language-context";
import { typedRoles } from "../i18n/translations";
import { track } from "../lib/analytics";
import { SplitText } from "./SplitText";
import { TypedText } from "./TypedText";

const container: Variants = {
	hidden: {},
	show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const item: Variants = {
	hidden: { opacity: 0, y: 18 },
	show: {
		opacity: 1,
		y: 0,
		transition: { type: "spring", duration: 0.7, bounce: 0 },
	},
};

export function Hero() {
	const { t, lang } = useLanguage();
	const reduced = useReducedMotion();

	// Inclinación 3D de la foto: resorte críticamente amortiguado
	const px = useMotionValue(0);
	const py = useMotionValue(0);
	const spring = { stiffness: 150, damping: 19, mass: 0.6 };
	const sx = useSpring(px, spring);
	const sy = useSpring(py, spring);
	const rotateY = useTransform(sx, [-0.5, 0.5], [-7, 7]);
	const rotateX = useTransform(sy, [-0.5, 0.5], [7, -7]);

	function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
		if (reduced || e.pointerType !== "mouse") return;
		const r = e.currentTarget.getBoundingClientRect();
		px.set((e.clientX - r.left) / r.width - 0.5);
		py.set((e.clientY - r.top) / r.height - 0.5);
	}
	function onPointerLeave() {
		px.set(0);
		py.set(0);
	}

	return (
		<section
			id="inicio"
			className="relative mx-auto flex min-h-svh max-w-6xl items-center px-6 pt-32 pb-24"
		>
			<div className="grid w-full grid-cols-1 items-center gap-12 md:grid-cols-12">
				<motion.div
					variants={container}
					initial="hidden"
					animate="show"
					className="md:col-span-7"
				>
					<motion.img
						variants={item}
						src="/foto-perfil.webp"
						alt={t("alt_foto")}
						width={800}
						height={1202}
						fetchPriority="high"
						className="mb-6 size-24 rounded-2xl border border-outline-variant/40 object-cover md:hidden"
					/>

					<motion.div
						variants={item}
						className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5"
					>
						<span className="relative flex size-2">
							<span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60 motion-reduce:animate-none" />
							<span className="relative inline-flex size-2 rounded-full bg-primary" />
						</span>
						<span className="font-mono text-xs font-medium text-primary">
							{t("hero_eyebrow")}
						</span>
					</motion.div>

					<SplitText
						as="h1"
						onMount
						delay={0.15}
						text={t("hero_greeting")}
						className="font-display text-hero-mobile leading-[1.04] font-bold tracking-[-0.03em] text-balance text-on-surface md:text-hero-desktop"
					/>

					<motion.p
						variants={item}
						className="mt-4 min-h-9 font-mono text-xl text-primary md:text-2xl"
					>
						<TypedText strings={typedRoles[lang]} />
					</motion.p>

					<motion.p
						variants={item}
						className="mt-6 max-w-xl text-lg leading-relaxed text-on-surface-variant"
					>
						{t("hero_body")}
					</motion.p>

					<motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
						<a
							href="#proyectos"
							onClick={() => track("cta_click", { location: "hero", target: "projects" })}
							className="group inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 font-bold text-on-primary transition-transform duration-150 hover:scale-[1.03] active:scale-95"
						>
							{t("hero_cta_projects")}
							<ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
						</a>

						<a
							href="#contacto"
							onClick={() => track("cta_click", { location: "hero", target: "contact" })}
							className="rounded-2xl border border-outline-variant px-8 py-4 font-bold text-on-surface transition-[background-color,transform] duration-150 hover:bg-surface-container-high active:scale-95"
						>
							{t("hero_cta_contact")}
						</a>
					</motion.div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, clipPath: "inset(10% 10% 10% 10% round 1.5rem)" }}
					animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 1.5rem)" }}
					transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
					className="hidden md:col-span-5 md:block [perspective:1100px]"
				>
					<motion.div
						onPointerMove={onPointerMove}
						onPointerLeave={onPointerLeave}
						style={{ rotateX, rotateY }}
						className="relative"
					>
						<div className="rounded-3xl border border-outline-variant/40 bg-surface-container p-px">
							<div className="aspect-square overflow-hidden rounded-[calc(1.5rem-1px)] bg-surface-container p-5">
								<img
									src="/foto-perfil.webp"
									alt={t("alt_foto")}
									width={800}
									height={1202}
									fetchPriority="high"
									className="size-full rounded-2xl object-cover"
								/>
							</div>
						</div>
					</motion.div>
				</motion.div>
			</div>

			<motion.a
				href="#proyectos"
				aria-label={t("aria_scroll")}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.4, duration: 0.6 }}
				className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-on-surface-variant transition-colors hover:text-primary md:block"
			>
				<motion.span
					animate={{ y: [0, 6, 0] }}
					transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
					className="block"
				>
					<ChevronDown className="size-6" />
				</motion.span>
			</motion.a>
		</section>
	);
}
