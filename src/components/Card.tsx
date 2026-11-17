import type { HTMLAttributes } from "react";

/** Tarjeta base: borde sutil y elevación al pasar el cursor. */
export function Card({
	className = "",
	children,
	...rest
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			{...rest}
			className={`group rounded-2xl border border-outline-variant/25 bg-surface-container/60 transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1 hover:border-primary/40 ${className}`}
		>
			{children}
		</div>
	);
}
