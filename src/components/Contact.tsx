import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { useLanguage } from "../i18n/language-context";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzdnvnre";
const EMAIL = "acvanegas99@gmail.com";
const LOCATION = "Villavicencio, Meta - Colombia";

type Status = "idle" | "sending" | "success" | "error";

export function Contact() {
	const { t } = useLanguage();
	const [form, setForm] = useState({
		nombre: "",
		email: "",
		asunto: "",
		mensaje: "",
	});
	const [status, setStatus] = useState<Status>("idle");
	const [showModal, setShowModal] = useState(false);

	function handleChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) {
		setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		if (!form.nombre || !form.email || !form.asunto || !form.mensaje) {
			setShowModal(true);
			return;
		}

		setStatus("sending");
		try {
			const res = await fetch(FORMSPREE_ENDPOINT, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(form),
			});
			if (res.ok) {
				setStatus("success");
				setForm({ nombre: "", email: "", asunto: "", mensaje: "" });
			} else {
				setStatus("error");
			}
		} catch {
			setStatus("error");
		}
	}

	const inputClass =
		"w-full rounded-lg border border-outline-variant/30 bg-surface-container-high px-4 py-3 text-on-surface placeholder:text-on-surface-variant/60 outline-none transition-colors focus:border-primary";

	return (
		<section id="contacto" className="mx-auto max-w-6xl px-6 py-24">
			<motion.div
				initial={{ opacity: 0, y: 24 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: false, amount: 0.2 }}
				transition={{ duration: 0.6 }}
				className="grid grid-cols-1 gap-10 rounded-2xl border border-outline-variant/20 bg-surface-container/60 p-8 md:grid-cols-2 md:p-12"
			>
				<div>
					<h2 className="font-display text-3xl font-bold text-on-surface">
						{t("contacto_titulo")}
					</h2>
					<p className="mt-4 text-on-surface-variant">
						{t("contacto_subtitulo")}
					</p>

					<div className="mt-8 space-y-4">
						<a
							href={`mailto:${EMAIL}`}
							className="flex items-center gap-3 text-on-surface-variant hover:text-primary"
						>
							<Mail className="size-5" />
							{EMAIL}
						</a>
						<div className="flex items-center gap-3 text-on-surface-variant">
							<MapPin className="size-5" />
							{LOCATION}
						</div>
					</div>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div>
							<label htmlFor="nombre" className="sr-only">
								{t("contacto_nombre")}
							</label>
							<input
								id="nombre"
								name="nombre"
								autoComplete="name"
								value={form.nombre}
								onChange={handleChange}
								placeholder={t("contacto_nombre")}
								className={inputClass}
							/>
						</div>
						<div>
							<label htmlFor="email" className="sr-only">
								{t("contacto_email")}
							</label>
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								value={form.email}
								onChange={handleChange}
								placeholder={t("contacto_email")}
								className={inputClass}
							/>
						</div>
					</div>

					<div>
						<label htmlFor="asunto" className="sr-only">
							{t("contacto_asunto")}
						</label>
						<input
							id="asunto"
							name="asunto"
							value={form.asunto}
							onChange={handleChange}
							placeholder={t("contacto_asunto")}
							className={inputClass}
						/>
					</div>

					<div>
						<label htmlFor="mensaje" className="sr-only">
							{t("contacto_mensaje")}
						</label>
						<textarea
							id="mensaje"
							name="mensaje"
							value={form.mensaje}
							onChange={handleChange}
							placeholder={t("contacto_mensaje")}
							rows={5}
							className={inputClass}
						/>
					</div>

					<button
						type="submit"
						disabled={status === "sending"}
						className="w-full rounded-lg bg-primary px-6 py-3 font-bold text-on-primary transition-transform hover:scale-[1.01] active:scale-95 disabled:opacity-60"
					>
						{status === "sending"
							? t("contacto_enviando")
							: t("contacto_enviar")}
					</button>

					{status === "success" && (
						<p className="text-sm text-primary">
							{t("contacto_exito")}
						</p>
					)}
					{status === "error" && (
						<p className="text-sm text-error">
							{t("contacto_error_envio")}
						</p>
					)}
				</form>
			</motion.div>

			{showModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6">
					<div className="w-full max-w-sm rounded-xl border border-outline-variant/20 bg-surface-container p-6 text-center">
						<h3 className="font-display text-lg font-bold text-on-surface">
							{t("contacto_modal_titulo")}
						</h3>
						<p className="mt-2 text-sm text-on-surface-variant">
							{t("contacto_modal_body")}
						</p>
						<button
							onClick={() => setShowModal(false)}
							className="mt-5 w-full rounded-lg bg-primary px-4 py-2.5 font-bold text-on-primary"
						>
							{t("contacto_modal_btn")}
						</button>
					</div>
				</div>
			)}
		</section>
	);
}
