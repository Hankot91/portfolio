import { useLanguage } from "../i18n/language-context";
import type { TranslationKey } from "../i18n/translations";
import { track } from "../lib/analytics";
import { Reveal } from "./Reveal";

const ITEMS: { label: TranslationKey; text: TranslationKey; href: string; link: TranslationKey }[] = [
	{ label: "resumen_perfil_l", text: "resumen_perfil", href: "#educacion", link: "nav_educacion" },
	{ label: "resumen_stack_l", text: "resumen_stack", href: "#skills", link: "nav_skills" },
	{ label: "resumen_hecho_l", text: "resumen_hecho", href: "#proyectos", link: "nav_proyectos" },
	{ label: "resumen_busco_l", text: "resumen_busco", href: "#contacto", link: "nav_contacto" },
];

/** TL;DR: lo esencial en 4 líneas, pensado para lectura rápida y para que un LLM lo cite. */
export function Resumen() {
	const { t, lang } = useLanguage();
	const cvHref = lang === "es" ? "/cv-es.pdf" : "/cv-en.pdf";

	return (
		<section id="resumen" className="mx-auto max-w-6xl px-6 py-12 md:py-16">
			<Reveal>
				<div className="rounded-3xl border border-outline-variant/25 bg-surface-container/60 p-6 md:p-10">
					<h2 className="font-display text-2xl font-bold tracking-tight text-on-surface">
						{t("resumen_titulo")}
					</h2>

					<dl className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
						{ITEMS.map(({ label, text, href, link }) => (
							<div key={label}>
								<dt className="font-mono text-xs tracking-wider text-primary uppercase">
									{t(label)}
								</dt>
								<dd className="mt-2 text-sm leading-relaxed text-on-surface-variant">
									{t(text)}
								</dd>
								<a
									href={href}
									className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
								>
									{t(link)} →
								</a>
							</div>
						))}
					</dl>

					<div className="mt-8 flex flex-wrap gap-3">
						<a
							href="#contacto"
							onClick={() => track("cta_click", { location: "resumen", target: "contact" })}
							className="rounded-xl bg-primary px-6 py-3 font-bold text-on-primary transition-transform duration-150 hover:scale-[1.03] active:scale-95"
						>
							{t("hero_cta_contact")}
						</a>
						<a
							href={cvHref}
							download
							onClick={() => track("cv_download", { location: "resumen", lang })}
							className="rounded-xl border border-outline-variant px-6 py-3 font-bold text-on-surface transition-[background-color,transform] duration-150 hover:bg-surface-container-high active:scale-95"
						>
							{t("nav_cv")}
						</a>
					</div>
				</div>
			</Reveal>
		</section>
	);
}
