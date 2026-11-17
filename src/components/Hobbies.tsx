import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../i18n/language-context";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const HOBBIES = [
	{ key: "hobby_gym", alt: "alt_gym", image: "/hobbies/gym.webp", size: "large" },
	{ key: "hobby_moto", alt: "alt_moto", image: "/hobbies/moto.webp", size: "large" },
	{ key: "hobby_musica", alt: "alt_musica", image: "/hobbies/musica.webp", size: "small" },
	{ key: "hobby_videojuegos", alt: "alt_videojuegos", image: "/hobbies/videojuegos.webp", size: "small" },
	{ key: "hobby_senderismo", alt: "alt_senderismo", image: "/hobbies/senderismo.webp", size: "wide" },
] as const;

const SIZE_CLASS = {
	large: "h-76 sm:col-span-2",
	wide: "h-44 sm:col-span-2",
	small: "h-44 sm:col-span-1",
} as const;

function HobbyCard({ hobby, delay }: { hobby: (typeof HOBBIES)[number]; delay: number }) {
	const { t } = useLanguage();
	const ref = useRef<HTMLDivElement>(null);

	// Parallax: la foto se desplaza dentro de su marco mientras haces scroll
	const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
	const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

	return (
		<Reveal delay={delay} className={SIZE_CLASS[hobby.size]}>
			<div
				ref={ref}
				className="group relative size-full overflow-hidden rounded-2xl border border-outline-variant/25"
			>
				<div className="size-full transition-transform duration-700 ease-out group-hover:scale-105">
					<motion.img
						src={hobby.image}
						alt={t(hobby.alt)}
						width={1000}
						height={800}
						loading="lazy"
						style={{ y, scale: 1.18 }}
						className="size-full object-cover"
					/>
				</div>
				<div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />
				<h3 className="absolute bottom-4 left-4 font-display text-lg font-bold text-white">
					{t(hobby.key)}
				</h3>
			</div>
		</Reveal>
	);
}

export function Hobbies() {
	const { t } = useLanguage();

	return (
		<section id="hobbies" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
			<SectionHeading title={t("hobbies_titulo")} />

			<div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-4">
				{HOBBIES.map((hobby, i) => (
					<HobbyCard key={hobby.key} hobby={hobby} delay={i * 0.06} />
				))}
			</div>
		</section>
	);
}
