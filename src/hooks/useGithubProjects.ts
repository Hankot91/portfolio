import { useEffect, useState } from "react";

export interface GithubProject {
	name: string;
	html_url: string;
	homepage: string | null;
	description: string | null;
	topics: string[];
}

export const GITHUB_USER = "Hankot91";

export function useGithubProjects() {
	const [projects, setProjects] = useState<GithubProject[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let cancelled = false;

		async function fetchProjects() {
			try {
				const res = await fetch("/api/github-projects");
				if (!res.ok)
					throw new Error(`GitHub API respondió ${res.status}`);
				const data = await res.json();
				if (!cancelled) setProjects(data.items ?? []);
			} catch (err) {
				if (!cancelled) {
					setError(
						err instanceof Error
							? err.message
							: "Error desconocido",
					);
				}
			} finally {
				if (!cancelled) setLoading(false);
			}
		}

		fetchProjects();
		return () => {
			cancelled = true;
		};
	}, []);

	return { projects, loading, error };
}
