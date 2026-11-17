import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
	children: ReactNode;
	className?: string;
	delay?: number;
	y?: number;
}

/** Entrada al hacer scroll: resorte críticamente amortiguado, una sola vez. */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, y }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "0px 0px -10% 0px" }}
			transition={{ type: "spring", duration: 0.7, bounce: 0, delay }}
		>
			{children}
		</motion.div>
	);
}
