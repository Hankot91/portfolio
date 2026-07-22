import { motion } from "framer-motion";
import { useLanguage } from "../i18n/language-context";

const HOBBIES = [
	{ key: "hobby_gym", image: "/hobbies/gym.png", size: "large" },
	{ key: "hobby_moto", image: "/hobbies/moto.png", size: "large" },
	{ key: "hobby_musica", image: "/hobbies/musica.png", size: "small" },
	{ key: "hobby_videojuegos", image: "/hobbies/videojuegos.png", size: "small" },
	{ key: "hobby_senderismo", image: "/hobbies/senderismo.png", size: "wide" },
] as const;

export function Hobbies() {
	const { t } = useLanguage();

	return (
		<section id="hobbies" className="mx-auto max-w-6xl px-6 py-24">
			<h2 className="text-center font-display text-3xl font-bold text-on-surface">
				{t("hobbies_titulo")}
			</h2>

			<div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-4">
				{HOBBIES.map((hobby, i) => (
					<motion.div
						key={hobby.key}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: false, amount: 0.3 }}
						transition={{ duration: 0.5, delay: i * 0.08 }}
						className={`rounded-xl bg-surface-container p-1.5 shadow-sm ${
							hobby.size === "large"
								? "h-76 sm:col-span-2"
								: hobby.size === "wide"
									? "h-44 sm:col-span-2"
									: "h-44 sm:col-span-1"
						}`}
					>
						<div className="group relative size-full overflow-hidden rounded-lg">
							<img
								src={hobby.image}
								alt={t(hobby.key)}
								className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
							<span className="absolute bottom-4 left-4 font-display text-lg font-bold text-white">
								{t(hobby.key)}
							</span>
						</div>
					</motion.div>
				))}
			</div>
		</section>
	);
}