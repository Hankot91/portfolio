import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
	animate,
	motion,
	useMotionValue,
	useMotionValueEvent,
	useReducedMotion,
	type AnimationPlaybackControls,
	type PanInfo,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../i18n/language-context";
import { useGithubProjects } from "../hooks/useGithubProjects";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const GAP = 24; // gap-6
const GUTTER = 24; // px-6 del contenedor
const BUFFER = 2; // tarjetas extra montadas a cada lado
const DECELERATION = 0.998; // misma inercia que el scroll de iOS

// Hasta dónde llegaría el gesto si se soltara ahora (velocidad en px/s)
const project = (v: number) => ((v / 1000) * DECELERATION) / (1 - DECELERATION);
const mod = (i: number, n: number) => ((i % n) + n) % n;

// Crawlers y navegadores automatizados reciben el HTML plano, sin repetir tarjetas
const CAN_LOOP = typeof navigator !== "undefined" && !navigator.webdriver;

export function Projects() {
	const { t } = useLanguage();
	const { projects, loading, error } = useGithubProjects();
	const reduced = useReducedMotion();
	const n = projects.length;

	const viewportRef = useRef<HTMLDivElement>(null);
	const [width, setWidth] = useState(0); // ancho útil del carrusel
	const [center, setCenter] = useState(0); // índice absoluto de la tarjeta más a la izquierda

	// x es la posición real (px). Los índices son absolutos: no hay "primera" ni "última",
	// por eso el carrusel es circular sin saltos ni clones: se monta solo la ventana visible.
	const x = useMotionValue(0);
	const controls = useRef<AnimationPlaybackControls | null>(null);
	const dragged = useRef(false);

	useLayoutEffect(() => {
		const el = viewportRef.current;
		if (!el) return;
		const measure = () => setWidth(Math.max(0, el.clientWidth - GUTTER * 2));
		measure();
		const ro = new ResizeObserver(measure);
		ro.observe(el);
		return () => ro.disconnect();
	}, [loading, error]);

	// Mismas medidas que las clases CSS de respaldo (85% / 46% / un tercio)
	const { cardW, step } = useMemo(() => {
		if (!width) return { cardW: 0, step: 0 };
		const vw = window.innerWidth;
		const w = vw < 640 ? width * 0.85 : vw < 1024 ? width * 0.46 : (width - GAP * 2) / 3;
		return { cardW: w, step: w + GAP };
	}, [width]);

	const fullyVisible = step ? Math.max(1, Math.floor((width + GAP) / step + 1e-6)) : 3;
	const looping = CAN_LOOP && step > 0 && n > fullyVisible;
	const mounted = step ? Math.ceil((width + GAP) / step) : 3;

	useMotionValueEvent(x, "change", (v) => {
		if (step) setCenter(Math.round(-v / step));
	});

	// Al cambiar el tamaño de la ventana, recolocar sin animar
	useEffect(() => {
		if (!step) return;
		controls.current?.stop();
		x.set(-center * step);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [step]);

	const goTo = useCallback(
		(target: number, velocity = 0) => {
			controls.current?.stop();
			controls.current = animate(
				x,
				-target * step,
				reduced ? { duration: 0 } : { type: "spring", duration: 0.5, bounce: 0, velocity },
			);
		},
		[x, step, reduced],
	);

	const current = () => Math.round(-x.get() / step);
	const next = () => goTo(current() + 1);
	const prev = () => goTo(current() - 1);

	function onDragEnd(_: unknown, info: PanInfo) {
		const from = current();
		const landing = Math.round(-(x.get() + project(info.velocity.x)) / step);
		// Un arrastre claro nunca vuelve al mismo sitio
		const nudge = landing === from && Math.abs(info.offset.x) > step * 0.18;
		const raw = nudge ? from - Math.sign(info.offset.x) : landing;
		const limit = fullyVisible + 1;
		goTo(Math.max(from - limit, Math.min(from + limit, raw)), info.velocity.x);
	}

	function goToDot(i: number) {
		let d = mod(i - mod(center, n), n);
		if (d > n / 2) d -= n; // camino más corto
		goTo(center + d);
	}

	const indices = looping
		? Array.from({ length: mounted + BUFFER * 2 }, (_, k) => center - BUFFER + k)
		: projects.map((_, i) => i);
	const firstMounted = looping ? center - BUFFER : 0;

	const arrowClass =
		"rounded-full border border-outline-variant/40 p-2.5 text-on-surface-variant transition-[color,border-color,transform] duration-150 hover:border-primary hover:text-primary active:scale-90";

	return (
		<section id="proyectos" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
			<SectionHeading title={t("proyectos_titulo")} subtitle={t("proyectos_subtitulo")}>
				{looping && (
					<div className="hidden gap-2 sm:flex">
						<button onClick={prev} aria-label={t("aria_prev")} className={arrowClass}>
							<ChevronLeft className="size-5" />
						</button>
						<button onClick={next} aria-label={t("aria_next")} className={arrowClass}>
							<ChevronRight className="size-5" />
						</button>
					</div>
				)}
			</SectionHeading>

			{loading && (
				<div aria-busy className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{[0, 1, 2].map((i) => (
						<div
							key={i}
							className="h-96 animate-pulse rounded-2xl border border-outline-variant/20 bg-surface-container/60"
						/>
					))}
					<span className="sr-only">{t("proyectos_cargando")}</span>
				</div>
			)}
			{error && <p className="mt-10 text-error">{t("proyectos_error")}</p>}

			{!loading && !error && (
				<Reveal className="mt-12">
					<div
						ref={viewportRef}
						role="region"
						aria-roledescription="carousel"
						aria-label={t("proyectos_titulo")}
						tabIndex={0}
						onKeyDown={(e) => {
							if (!looping) return;
							if (e.key === "ArrowRight") {
								e.preventDefault();
								next();
							} else if (e.key === "ArrowLeft") {
								e.preventDefault();
								prev();
							}
						}}
						onClickCapture={(e) => {
							// Soltar tras arrastrar no debe abrir el enlace que quedó bajo el cursor
							if (dragged.current) {
								e.preventDefault();
								e.stopPropagation();
							}
						}}
						className="-mx-6 overflow-hidden px-6 py-2 select-none"
					>
						<motion.div
							drag={looping ? "x" : false}
							dragMomentum={false}
							dragElastic={0}
							style={{ x }}
							onPointerDown={() => {
								dragged.current = false;
								controls.current?.stop(); // agarrar la tarjeta en pleno vuelo
							}}
							onDragStart={() => {
								dragged.current = true;
							}}
							onDragEnd={onDragEnd}
							className={looping ? "cursor-grab active:cursor-grabbing" : undefined}
						>
							<div
								className="flex gap-6"
								style={{ transform: `translateX(${firstMounted * step}px)` }}
							>
								{indices.map((idx) => {
									const visible = idx >= center && idx < center + fullyVisible + 1;
									return (
										<div
											key={idx}
											role="group"
											aria-roledescription="slide"
											aria-label={`${mod(idx, n) + 1} / ${n}`}
											style={cardW ? { width: cardW } : undefined}
											className="w-[85%] shrink-0 sm:w-[46%] lg:w-[calc((100%-3rem)/3)]"
										>
											<ProjectCard project={projects[mod(idx, n)]} focusable={!looping || visible} />
										</div>
									);
								})}
							</div>
						</motion.div>
					</div>

					{looping && (
						<div className="mt-4 flex justify-center gap-2">
							{projects.map((p, i) => (
								<button
									key={p.name}
									onClick={() => goToDot(i)}
									aria-label={`${t("aria_goto")} ${i + 1}`}
									aria-current={i === mod(center, n)}
									className={`h-2 rounded-full transition-[width,background-color] duration-300 ${
										i === mod(center, n)
											? "w-6 bg-primary"
											: "w-2 bg-outline-variant hover:bg-outline"
									}`}
								/>
							))}
						</div>
					)}
				</Reveal>
			)}
		</section>
	);
}
