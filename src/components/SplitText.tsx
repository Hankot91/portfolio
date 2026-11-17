import { motion } from "framer-motion";

interface SplitTextProps {
	text: string;
	as?: "h1" | "h2";
	className?: string;
	delay?: number;
	/** true: anima al montar (Hero). false: al entrar en pantalla. */
	onMount?: boolean;
}

const container = (delay: number) => ({
	hidden: {},
	show: { transition: { staggerChildren: 0.06, delayChildren: delay } },
});
const word = {
	hidden: { y: "110%" },
	show: { y: 0, transition: { type: "spring" as const, duration: 0.8, bounce: 0 } },
};

/** Titular editorial: cada palabra sube desde una máscara, sin opacidad ni brillos. */
export function SplitText({
	text,
	as = "h2",
	className,
	delay = 0,
	onMount = false,
}: SplitTextProps) {
	const Tag = as === "h1" ? motion.h1 : motion.h2;
	const trigger = onMount
		? { animate: "show" }
		: { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } };

	return (
		<Tag
			aria-label={text}
			className={className}
			variants={container(delay)}
			initial="hidden"
			{...trigger}
		>
			{text.split(" ").map((w, i) => (
				<span key={i} aria-hidden>
					{i > 0 && " "}
					<span className="inline-block overflow-hidden pb-[0.12em] align-bottom -mb-[0.12em]">
						<motion.span variants={word} className="inline-block">
							{w}
						</motion.span>
					</span>
				</span>
			))}
		</Tag>
	);
}
