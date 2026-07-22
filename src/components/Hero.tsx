import { useLanguage } from "../i18n/language-context";
import { typedRoles } from "../i18n/translations";
import { TypedText } from "./TypedText";

export function Hero() {
	const { t, lang } = useLanguage();

	return (
		<section
			id="inicio"
			className="mx-auto flex min-h-screen max-w-6xl items-center px-6 pt-32 pb-16"
		>
			<div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12">
				<div className="md:col-span-7">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
						<span className="size-2 animate-pulse rounded-full bg-primary" />
						<span className="font-mono text-xs font-medium text-primary">
							{t("hero_eyebrow")}
						</span>
					</div>

					<h1 className="font-display text-hero-mobile font-bold tracking-tight text-on-surface md:text-hero-desktop">
						{t("hero_greeting")}
					</h1>

					<p className="mt-3 font-mono text-xl text-primary md:text-2xl">
						<TypedText strings={typedRoles[lang]} />
					</p>

					<p className="mt-6 max-w-xl text-lg text-on-surface-variant">
						{t("hero_body")}
					</p>

					<div className="mt-8 flex flex-wrap gap-4">
						<a
							href="#proyectos"
							className="rounded-xl bg-primary px-8 py-4 font-bold text-on-primary transition-transform hover:scale-[1.02] active:scale-95"
						>
							{t("hero_cta_projects")}
						</a>

						<a
							href="#contacto"
							className="rounded-xl border border-outline-variant px-8 py-4 font-bold text-on-surface transition-colors hover:bg-surface-container-high"
						>
							{t("hero_cta_contact")}
						</a>
					</div>
				</div>

				<div className="hidden md:col-span-5 md:block">
					<div className="rounded-xl bg-linear-to-br from-primary/40 via-transparent to-secondary/40 p-px shadow-2xl shadow-primary/20">
						<div className="aspect-square overflow-hidden rounded-[calc(var(--radius-token-xl)-1px)] bg-surface-container p-6">
							<img
								src="/foto-perfil.png"
								alt="Andrés Vanegas"
								className="size-full rounded-lg object-cover"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
