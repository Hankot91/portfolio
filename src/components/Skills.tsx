import {
	SiReact,
	SiNextdotjs,
	SiTypescript,
	SiJavascript,
	SiTailwindcss,
	SiHtml5,
	SiOpenjdk,
	SiPython,
	SiCplusplus,
	SiPhp,
	SiSpringboot,
	SiLaravel,
	SiNodedotjs,
	SiPostgresql,
	SiMysql,
	SiSqlite,
	SiMongodb,
	SiSupabase,
	SiGit,
	SiGithub,
	SiDocker,
	SiKubernetes,
	SiVite,
	SiVercel,
	SiPostman,
	SiFigma,
} from "@icons-pack/react-simple-icons";
import { motion, type Variants } from "framer-motion";
import { useLanguage } from "../i18n/language-context";
import { SectionHeading } from "./SectionHeading";
import { Card } from "./Card";

const SKILL_GROUPS = [
	{
		titleKey: "skills_lenguajes",
		items: [
			{ name: "Java", Icon: SiOpenjdk },
			{ name: "Python", Icon: SiPython },
			{ name: "C++", Icon: SiCplusplus },
			{ name: "PHP", Icon: SiPhp },
			{ name: "TypeScript", Icon: SiTypescript },
			{ name: "JavaScript", Icon: SiJavascript },
		],
	},
	{
		titleKey: "skills_backend",
		items: [
			{ name: "Spring Boot", Icon: SiSpringboot },
			{ name: "Laravel", Icon: SiLaravel },
			{ name: "Node.js", Icon: SiNodedotjs },
			{ name: "REST APIs" },
			{ name: "Serverless (Vercel)", Icon: SiVercel },
		],
	},
	{
		titleKey: "skills_bd",
		items: [
			{ name: "PostgreSQL", Icon: SiPostgresql },
			{ name: "MySQL", Icon: SiMysql },
			{ name: "SQLite", Icon: SiSqlite },
			{ name: "MongoDB", Icon: SiMongodb },
			{ name: "Supabase", Icon: SiSupabase },
		],
	},
	{
		titleKey: "skills_frontend",
		items: [
			{ name: "React", Icon: SiReact },
			{ name: "Next.js", Icon: SiNextdotjs },
			{ name: "Tailwind CSS", Icon: SiTailwindcss },
			{ name: "HTML & CSS", Icon: SiHtml5 },
			{ name: "TanStack Query" },
			{ name: "Framer Motion" },
		],
	},
	{
		titleKey: "skills_tools",
		items: [
			{ name: "Git", Icon: SiGit },
			{ name: "GitHub", Icon: SiGithub },
			{ name: "Docker", Icon: SiDocker },
			{ name: "Kubernetes", Icon: SiKubernetes },
			{ name: "Postman", Icon: SiPostman },
			{ name: "Vite", Icon: SiVite },
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

const chips: Variants = {
	hidden: {},
	show: { transition: { staggerChildren: 0.035, delayChildren: 0.15 } },
};
const chip: Variants = {
	hidden: { opacity: 0, y: 10 },
	show: { opacity: 1, y: 0, transition: { type: "spring", duration: 0.5, bounce: 0 } },
};

export function Skills() {
	const { t } = useLanguage();

	return (
		<section id="skills" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
			<SectionHeading title={t("skills_titulo")} />

			<div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
				{SKILL_GROUPS.map((group) => (
					<motion.div
						key={group.titleKey}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, margin: "0px 0px -10% 0px" }}
					>
						<Card className="h-full p-6">
							<h3 className="font-mono text-xs font-medium tracking-wider text-primary uppercase">
								{t(group.titleKey)}
							</h3>
							<motion.div variants={chips} className="mt-4 flex flex-wrap gap-2">
								{group.items.map((skill) => (
									<motion.span
										key={skill.name}
										variants={chip}
										className="flex items-center gap-2 rounded-full border border-outline-variant/30 bg-surface-container-high px-3.5 py-1.5 text-sm text-on-surface transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/50"
									>
										{"Icon" in skill && (
											<skill.Icon size={15} color="currentColor" />
										)}
										{skill.name}
									</motion.span>
								))}
							</motion.div>
						</Card>
					</motion.div>
				))}
			</div>
		</section>
	);
}
