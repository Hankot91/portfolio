import { ArrowUpRight, Code2 } from "lucide-react";
import { useLanguage } from "../i18n/language-context";
import { projectDescriptions } from "../i18n/translations";
import type { GithubProject } from "../hooks/useGithubProjects";
import { ProjectPreview } from "./ProjectPreview";

export function ProjectCard({ project }: { project: GithubProject }) {
	const { t, lang } = useLanguage();
	const description =
		projectDescriptions[lang][project.name] ??
		project.description ??
		t("proyectos_sin_desc");
	const badges = project.topics.filter((topic) => topic !== "portfolio");

	return (
		<div className="flex flex-col rounded-xl border border-outline-variant/20 bg-surface-container/60 p-6">
			<ProjectPreview name={project.name} homepage={project.homepage} />
            <h3 className="mt-4 font-display text-lg font-bold text-on-surface">
				{project.name.replace(/[-_]/g, " ")}
			</h3>
			<p className="mt-2 flex-1 text-sm text-on-surface-variant">
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

			<div className="mt-5 flex gap-4 border-t border-outline-variant/20 pt-4">
				<a
					href={project.html_url}
					target="_blank"
					rel="noreferrer"
					className="flex items-center gap-1.5 text-sm font-medium text-on-surface-variant hover:text-primary"
				>
					<Code2 className="size-4" /> {t("proyectos_codigo")}
				</a>
				{project.homepage && (
					<a
						href={project.homepage}
						target="_blank"
						rel="noreferrer"
						className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
					>
						{t("proyectos_demo")} <ArrowUpRight className="size-4" />
					</a>
				)}
			</div>
		</div>
	);
}