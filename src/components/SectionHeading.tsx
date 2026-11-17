import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { SplitText } from "./SplitText";

interface SectionHeadingProps {
	title: string;
	subtitle?: string;
	children?: ReactNode;
}

/** Encabezado único para todas las secciones: misma jerarquía, misma alineación. */
export function SectionHeading({ title, subtitle, children }: SectionHeadingProps) {
	return (
		<div className="flex items-end justify-between gap-6">
			<div>
				<SplitText
					text={title}
					className="font-display text-4xl leading-[1.05] font-bold tracking-[-0.02em] text-balance text-on-surface md:text-5xl"
				/>
				{subtitle && (
					<Reveal delay={0.2} y={12}>
						<p className="mt-3 max-w-xl text-on-surface-variant">{subtitle}</p>
					</Reveal>
				)}
			</div>
			{children}
		</div>
	);
}
