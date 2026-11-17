import { useState } from "react";
import { useLanguage } from "../i18n/language-context";
import { GITHUB_USER } from "../hooks/useGithubProjects";

interface ProjectPreviewProps {
	name: string;
	homepage: string | null;
}

export function ProjectPreview({ name, homepage }: ProjectPreviewProps) {
	const { t } = useLanguage();
	const [loaded, setLoaded] = useState(false);
	const [failed, setFailed] = useState(false);

	const src = homepage
		? `https://api.microlink.io/?url=${encodeURIComponent(homepage)}&screenshot=true&meta=false&embed=screenshot.url&waitForTimeout=4000&viewport.width=1280&viewport.height=800`
		: `https://opengraph.githubassets.com/1/${GITHUB_USER}/${name}`;

	return (
		<div className="relative -mx-6 -mt-6 aspect-video overflow-hidden bg-surface-container-high">
			{!loaded && !failed && (
				<div className="absolute inset-0 animate-pulse bg-surface-container-highest" />
			)}
			{!failed && (
				<img
					src={src}
					alt={`${t("alt_preview")} ${name}`}
					loading="lazy"
					draggable={false}
					className={`size-full object-cover transition-[opacity,transform] duration-700 ease-out group-hover:scale-105 ${
						loaded ? "opacity-100" : "opacity-0"
					}`}
					onLoad={() => setLoaded(true)}
					onError={() => setFailed(true)}
				/>
			)}
		</div>
	);
}
