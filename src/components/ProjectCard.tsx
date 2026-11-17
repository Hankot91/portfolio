import { ArrowUpRight, Code2 } from "lucide-react";
import { useLanguage } from "../i18n/language-context";
import { projectDescriptions } from "../i18n/translations";
import type { GithubProject } from "../hooks/useGithubProjects";
import { track } from "../lib/analytics";
import { ProjectPreview } from "./ProjectPreview";
import { Card } from "./Card";

export function ProjectCard({
	project,
	focusable = true,
}: {
	project: GithubProject;
	/** false en tarjetas fuera de pantalla del carrusel: no entran en el orden de Tab */
	focusable?: boolean;
}) {
	const { t, lang } = useLanguage();
	const description =
		projectDescriptions[lang][project.name] ??
		project.description ??
		t("proyectos_sin_desc");
	const badges = project.topics.filter((topic) => topic !== "portfolio");

	return (
		<Card className="flex h-full flex-col overflow-hidden p-6">
			<ProjectPreview name={project.name} homepage={project.homepage} />
			<h3 className="mt-5 font-display text-xl font-bold tracking-tight text-on-surface capitalize">
				{project.name.replace(/[-_]/g, " ")}
			</h3>
			<p className="mt-2 flex-1 text-sm leading-relaxed text-on-surface-variant">
				{description}
			</p>

			{badges.length > 0 && (
				<div className="mt-4 flex flex-wrap gap-2">
					{badges.map((topic) => (
						<span
							key={topic}
							className="rounded-full bg-tertiary-container/20 px-2.5 py-1 font-mono text-[11px] text-tertiary"
						>
							{topic}
						</span>
					))}
				</div>
			)}

			<div className="mt-5 flex gap-5 border-t border-outline-variant/20 pt-4">
				<a
					href={project.html_url}
					onClick={() => track("project_click", { project: project.name, kind: "code" })}
					target="_blank"
					draggable={false}
					tabIndex={focusable ? undefined : -1}
					rel="noreferrer"
					className="flex items-center gap-1.5 text-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
				>
					<Code2 className="size-4" /> {t("proyectos_codigo")}
				</a>
				{project.homepage && (
					<a
						href={project.homepage}
						onClick={() => track("project_click", { project: project.name, kind: "demo" })}
						target="_blank"
					draggable={false}
					tabIndex={focusable ? undefined : -1}
						rel="noreferrer"
						className="group/link flex items-center gap-1.5 text-sm font-medium text-primary"
					>
						{t("proyectos_demo")}
						<ArrowUpRight className="size-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
					</a>
				)}
			</div>
		</Card>
	);
}
