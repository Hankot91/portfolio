import { useEffect, useRef } from "react";
import Typed from "typed.js";

interface TypedTextProps {
	strings: string[];
	className?: string;
}

export function TypedText({ strings, className }: TypedTextProps) {
	const elRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		if (!elRef.current) return;

		const typed = new Typed(elRef.current, {
			strings,
			typeSpeed: 45,
			backSpeed: 25,
			backDelay: 1500,
			loop: true,
			smartBackspace: true,
		});

		return () => typed.destroy();
	}, [strings]);

	return <span ref={elRef} className={className} />;
}
