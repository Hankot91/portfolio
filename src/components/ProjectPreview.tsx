import { useState } from "react";
import { GITHUB_USER } from "../hooks/useGithubProjects";

interface ProjectPreviewProps {
	name: string;
	homepage: string | null;
}

export function ProjectPreview({ name, homepage }: ProjectPreviewProps) {
	const [loaded, setLoaded] = useState(false);
	const [failed, setFailed] = useState(false);

	const src = homepage
		? `https://api.microlink.io/?url=${encodeURIComponent(homepage)}&screenshot=true&meta=false&embed=screenshot.url&waitForTimeout=4000&viewport.width=1280&viewport.height=800`
		: `https://opengraph.githubassets.com/1/${GITHUB_USER}/${name}`;

	return (
		<div className="relative -mx-6 -mt-6 aspect-video overflow-hidden rounded-t-xl bg-surface-container-high">
			{!loaded && !failed && (
				<div className="absolute inset-0 animate-pulse bg-surface-container-highest" />
			)}
			{!failed && (
				<img
					src={src}
					alt={`Vista previa de ${name}`}
					className={`size-full object-cover transition-opacity duration-500 ${
						loaded ? "opacity-100" : "opacity-0"
					}`}
					onLoad={() => setLoaded(true)}
					onError={() => setFailed(true)}
				/>
			)}
		</div>
	);
}
