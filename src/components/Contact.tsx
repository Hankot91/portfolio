import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Mail, MapPin } from "lucide-react";
import { useLanguage } from "../i18n/language-context";
import { track } from "../lib/analytics";
import { Reveal } from "./Reveal";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzdnvnre";
const EMAIL = "acvanegas99@gmail.com";
const LOCATION = "Villavicencio, Meta - Colombia";

type Status = "idle" | "sending" | "success" | "error";
type Field = "nombre" | "email" | "asunto" | "mensaje";
type FormState = Record<Field, string>;

const EMPTY: FormState = { nombre: "", email: "", asunto: "", mensaje: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FIELD_ORDER: Field[] = ["nombre", "email", "asunto", "mensaje"];

export function Contact() {
	const { t } = useLanguage();
	const [form, setForm] = useState<FormState>(EMPTY);
	const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
	const [submitted, setSubmitted] = useState(false);
	const [status, setStatus] = useState<Status>("idle");
	const [copied, setCopied] = useState(false);

	// Errores específicos por campo, validados en vivo (y en el idioma actual)
	const errors: Partial<Record<Field, string>> = {};
	if (!form.nombre.trim()) errors.nombre = t("contacto_requerido");
	if (!form.email.trim()) errors.email = t("contacto_requerido");
	else if (!EMAIL_RE.test(form.email.trim())) errors.email = t("contacto_email_invalido");
	if (!form.asunto.trim()) errors.asunto = t("contacto_requerido");
	if (!form.mensaje.trim()) errors.mensaje = t("contacto_requerido");

	const show = (f: Field) => (touched[f] || submitted ? errors[f] : undefined);

	function handleChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) {
		setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setSubmitted(true);

		const firstInvalid = FIELD_ORDER.find((f) => errors[f]);
		if (firstInvalid) {
			document.getElementById(firstInvalid)?.focus();
			return;
		}

		setStatus("sending");
		try {
			const res = await fetch(FORMSPREE_ENDPOINT, {
				method: "POST",
				headers: { "Content-Type": "application/json", Accept: "application/json" },
				body: JSON.stringify(form),
			});
			if (res.ok) {
				setStatus("success");
				track("generate_lead", { method: "contact_form" });
				setForm(EMPTY);
				setTouched({});
				setSubmitted(false);
			} else {
				setStatus("error");
			}
		} catch {
			setStatus("error");
		}
	}

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(EMAIL);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1800);
		} catch {
			window.location.href = `mailto:${EMAIL}`;
		}
	}

	const inputClass = (f: Field) =>
		`w-full rounded-xl border bg-surface-container-high px-4 py-3 text-on-surface placeholder:text-on-surface-variant/60 outline-none transition-[border-color,box-shadow] duration-200 focus:border-primary focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-primary)_18%,transparent)] ${
			show(f) ? "border-error" : "border-outline-variant/30"
		}`;

	function renderField(
		f: Field,
		label: string,
		props: { type?: string; autoComplete?: string; multiline?: boolean } = {},
	) {
		const err = show(f);
		const common = {
			id: f,
			name: f,
			value: form[f],
			onChange: handleChange,
			onBlur: () => setTouched((t0) => ({ ...t0, [f]: true })),
			placeholder: label,
			"aria-invalid": err ? true : undefined,
			"aria-describedby": err ? `${f}-error` : undefined,
			className: inputClass(f),
		};
		return (
			<div>
				<label htmlFor={f} className="sr-only">
					{label}
				</label>
				{props.multiline ? (
					<textarea {...common} rows={5} />
				) : (
					<input {...common} type={props.type} autoComplete={props.autoComplete} />
				)}
				<AnimatePresence initial={false}>
					{err && (
						<motion.p
							id={`${f}-error`}
							role="alert"
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.2 }}
							className="overflow-hidden pt-1.5 pl-1 text-sm text-error"
						>
							{err}
						</motion.p>
					)}
				</AnimatePresence>
			</div>
		);
	}

	return (
		<section id="contacto" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
			<Reveal>
				<div className="relative grid grid-cols-1 gap-12 overflow-hidden rounded-3xl border border-outline-variant/25 bg-surface-container/60 p-8 md:grid-cols-2 md:p-14">
					<div>
						<h2 className="font-display text-4xl leading-[1.05] font-bold tracking-[-0.02em] text-balance text-on-surface md:text-5xl">
							{t("contacto_titulo")}
						</h2>
						<p className="mt-4 text-on-surface-variant">{t("contacto_subtitulo")}</p>

						<div className="mt-8 space-y-4">
							<div className="flex items-center gap-3 text-on-surface-variant">
								<Mail className="size-5 shrink-0" />
								<a href={`mailto:${EMAIL}`} className="transition-colors hover:text-primary">
									{EMAIL}
								</a>
								<button
									type="button"
									onClick={copyEmail}
									aria-label={t("contacto_copiar")}
									className="ml-1 inline-flex items-center gap-1.5 rounded-full border border-outline-variant/40 px-2.5 py-1 text-xs transition-[color,border-color,transform] duration-150 hover:border-primary hover:text-primary active:scale-95"
								>
									{copied ? <Check className="size-3.5 text-primary" /> : <Copy className="size-3.5" />}
									<span aria-live="polite">{copied ? t("contacto_copiado") : t("contacto_copiar")}</span>
								</button>
							</div>
							<div className="flex items-center gap-3 text-on-surface-variant">
								<MapPin className="size-5 shrink-0" />
								{LOCATION}
							</div>
						</div>
					</div>

					<div className="relative">
						<AnimatePresence mode="wait" initial={false}>
							{status === "success" ? (
								<motion.div
									key="ok"
									initial={{ opacity: 0, scale: 0.96 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0 }}
									transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
									className="flex h-full min-h-72 flex-col items-center justify-center gap-4 text-center"
								>
									<span className="grid size-16 place-items-center rounded-full bg-primary/15 text-primary">
										<Check className="size-8" />
									</span>
									<p role="status" className="max-w-xs text-lg font-medium text-on-surface">
										{t("contacto_exito")}
									</p>
									<button
										type="button"
										onClick={() => setStatus("idle")}
										className="text-sm text-primary underline-offset-4 hover:underline"
									>
										{t("contacto_otro")}
									</button>
								</motion.div>
							) : (
								<motion.form
									key="form"
									noValidate
									onSubmit={handleSubmit}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.2 }}
									className="space-y-4"
								>
									<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
										{renderField("nombre", t("contacto_nombre"), { autoComplete: "name" })}
										{renderField("email", t("contacto_email"), { type: "email", autoComplete: "email" })}
									</div>
									{renderField("asunto", t("contacto_asunto"))}
									{renderField("mensaje", t("contacto_mensaje"), { multiline: true })}

									<button
										type="submit"
										disabled={status === "sending"}
										className="w-full rounded-xl bg-primary px-6 py-3.5 font-bold text-on-primary transition-transform duration-150 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-60"
									>
										{status === "sending" ? t("contacto_enviando") : t("contacto_enviar")}
									</button>

									{status === "error" && (
										<p role="alert" className="text-sm text-error">
											{t("contacto_error_envio")}
										</p>
									)}
								</motion.form>
							)}
						</AnimatePresence>
					</div>
				</div>
			</Reveal>
		</section>
	);
}
