import { ChevronDown } from "lucide-react";
import { useLanguage } from "../i18n/language-context";
import { FAQ_ITEMS } from "../data/faq";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function FAQ() {
	const { t } = useLanguage();

	return (
		<section id="faq" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
			<SectionHeading title={t("faq_titulo")} />

			<Reveal className="mt-12 max-w-3xl">
				{FAQ_ITEMS.map(({ q, a, href, link }) => (
					<details key={q} name="faq" className="group border-b border-outline-variant/25">
						<summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
							<h3 className="font-display text-lg font-semibold tracking-tight text-on-surface">
								{t(q)}
							</h3>
							<ChevronDown className="size-5 shrink-0 text-on-surface-variant transition-transform duration-300 group-open:rotate-180" />
						</summary>
						<div className="faq-body pb-5 leading-relaxed text-on-surface-variant">
							<p>{t(a)}</p>
							{href && link && (
								<a
									href={href}
									className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
								>
									{t(link)} →
								</a>
							)}
						</div>
					</details>
				))}
			</Reveal>
		</section>
	);
}
