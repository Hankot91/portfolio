import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import Typed from "typed.js";

interface TypedTextProps {
	strings: string[];
	className?: string;
}

export function TypedText({ strings, className }: TypedTextProps) {
	const elRef = useRef<HTMLSpanElement>(null);
	const reduced = useReducedMotion();

	useEffect(() => {
		if (reduced || !elRef.current) return;

		const typed = new Typed(elRef.current, {
			strings,
			typeSpeed: 45,
			backSpeed: 25,
			backDelay: 1500,
			loop: true,
			smartBackspace: true,
		});

		return () => typed.destroy();
	}, [strings, reduced]);

	// Con movimiento reducido: texto estático, sin máquina de escribir infinita.
	if (reduced) return <span className={className}>{strings[0]}</span>;
	return <span ref={elRef} className={className} />;
}
