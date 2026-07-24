export const config = { runtime: "edge" };

const GITHUB_USER = "Hankot91";

export default async function handler() {
	const res = await fetch(
		`https://api.github.com/search/repositories?q=user:${GITHUB_USER}+topic:portfolio&sort=updated`,
		{ headers: { Accept: "application/vnd.github+json" } },
	);

	if (!res.ok) {
		return new Response(
			JSON.stringify({ error: `GitHub API respondió ${res.status}` }),
			{ status: res.status, headers: { "Content-Type": "application/json" } },
		);
	}

	const data = await res.json();

	return new Response(JSON.stringify(data), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			"Cache-Control": "s-maxage=600, sta00le-while-revalidate=3600",
		},
	});
}