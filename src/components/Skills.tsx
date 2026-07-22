import { motion } from "framer-motion";
import {
	SiReact,
	SiTypescript,
	SiJavascript,
	SiTailwindcss,
	SiAxios,
	SiGit,
	SiGithub,
	SiVite,
	SiVercel,
	SiFigma,
} from "@icons-pack/react-simple-icons";
import { useLanguage } from "../i18n/language-context";

const SKILL_GROUPS = [
	{
		titleKey: "skills_frontend",
		items: [
			{ name: "React", Icon: SiReact },
			{ name: "TypeScript", Icon: SiTypescript },
			{ name: "JavaScript", Icon: SiJavascript },
			{ name: "Tailwind CSS", Icon: SiTailwindcss },
		],
	},
	{
		titleKey: "skills_state_data",
		items: [
			{ name: "Axios", Icon: SiAxios },
			{ name: "TanStack Query" },
			{ name: "REST APIs" },
		],
	},
	{
		titleKey: "skills_tools",
		items: [
			{ name: "Git", Icon: SiGit },
			{ name: "GitHub", Icon: SiGithub },
			{ name: "Vite", Icon: SiVite },
			{ name: "Vercel", Icon: SiVercel },
			{ name: "Figma", Icon: SiFigma },
		],
	},
	{
		titleKey: "skills_practices",
		items: [
			{ name: "Responsive Design" },
			{ name: "Component-Based Architecture" },
			{ name: "Clean Code" },
		],
	},
] as const;

export function Skills() {
	const { t } = useLanguage();

	return (
		<section id="skills" className="mx-auto max-w-6xl px-6 py-24">
			<h2 className="text-center font-display text-3xl font-bold text-on-surface">
				{t("skills_titulo")}
			</h2>

			<div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
				{SKILL_GROUPS.map((group, gi) => (
					<motion.div
						key={group.titleKey}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: false, amount: 0.4 }}
						transition={{ duration: 0.5, delay: gi * 0.1 }}
						className="rounded-xl border border-outline-variant/20 bg-surface-container/60 p-6"
					>
						<h3 className="font-mono text-xs font-medium tracking-wider text-primary uppercase">
							{t(group.titleKey)}
						</h3>
						<div className="mt-4 flex flex-wrap gap-2">
							{group.items.map((skill) => (
								<span
									key={skill.name}
									className="flex items-center gap-2 rounded-full border border-outline-variant/30 bg-surface-container-high px-3.5 py-1.5 text-sm text-on-surface"
								>
									{"Icon" in skill && (
										<skill.Icon size={15} color="currentColor" />
									)}
									{skill.name}
								</span>
							))}
						</div>
					</motion.div>
				))}
			</div>
		</section>
	);
}