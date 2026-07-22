import { useState } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../i18n/language-context";
import { useGithubProjects } from "../hooks/useGithubProjects";
import { ProjectCard } from "./ProjectCard";

const VISIBLE = 3;

export function Projects() {
	const { t } = useLanguage();
	const { projects, loading, error } = useGithubProjects();
	const [activeIndex, setActiveIndex] = useState(0);

	const visibleCount = Math.min(VISIBLE, projects.length);
	const visible = Array.from(
		{ length: visibleCount },
		(_, i) => projects[(activeIndex + i) % projects.length],
	);

	function next() {
		setActiveIndex((i) => (i + 1) % projects.length);
	}
	function prev() {
		setActiveIndex((i) => (i - 1 + projects.length) % projects.length);
	}

	return (
		<section id="proyectos" className="mx-auto max-w-6xl px-6 py-24">
			<div className="flex items-end justify-between">
				<div>
					<h2 className="font-display text-3xl font-bold text-on-surface">
						{t("proyectos_titulo")}
					</h2>
					<p className="mt-2 text-on-surface-variant">
						{t("proyectos_subtitulo")}
					</p>
				</div>

				{!loading && !error && projects.length > 1 && (
					<div className="hidden gap-2 sm:flex">
						<button
							onClick={prev}
							aria-label="Anterior"
							className="rounded-full border border-outline-variant/30 p-2 text-on-surface-variant hover:border-primary hover:text-primary"
						>
							<ChevronLeft className="size-5" />
						</button>
						<button
							onClick={next}
							aria-label="Siguiente"
							className="rounded-full border border-outline-variant/30 p-2 text-on-surface-variant hover:border-primary hover:text-primary"
						>
							<ChevronRight className="size-5" />
						</button>
					</div>
				)}
			</div>

			{loading && (
				<p className="mt-10 text-on-surface-variant">
					{t("proyectos_cargando")}
				</p>
			)}
			{error && (
				<p className="mt-10 text-error">{t("proyectos_error")}</p>
			)}

			{!loading && !error && (
				<>
					<motion.div
						role="region"
						aria-label={t("proyectos_titulo")}
						tabIndex={0}
						onKeyDown={(e) => {
							if (e.key === "ArrowRight") next();
							if (e.key === "ArrowLeft") prev();
						}}
						drag="x"
						dragConstraints={{ left: 0, right: 0 }}
						dragElastic={0.15}
						onDragEnd={(
							_event: MouseEvent | TouchEvent | PointerEvent,
							info: PanInfo,
						) => {
							if (info.offset.x < -60) next();
							else if (info.offset.x > 60) prev();
						}}
						className="mt-10 flex gap-6 overflow-hidden"
					>
						<AnimatePresence initial={false} mode="popLayout">
							{visible.map((project) => (
								<motion.div
									key={project.name}
									layout
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.9 }}
									transition={{
										duration: 0.4,
										ease: "easeInOut",
									}}
									className="w-full shrink-0 sm:w-[45%] lg:w-[31%]"
								>
									<ProjectCard project={project} />
								</motion.div>
							))}
						</AnimatePresence>
					</motion.div>

					{projects.length > 1 && (
						<div className="mt-6 flex justify-center gap-2">
							{projects.map((_, i) => (
								<button
									key={i}
									onClick={() => setActiveIndex(i)}
									aria-label={`Ir al proyecto ${i + 1}`}
									className={`h-2 rounded-full transition-all ${
										i === activeIndex
											? "w-6 bg-primary"
											: "w-2 bg-outline-variant"
									}`}
								/>
							))}
						</div>
					)}
				</>
			)}
		</section>
	);
}
