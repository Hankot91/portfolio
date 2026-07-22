export const translations = {
	es: {
		lang_btn: "EN",
		nav_inicio: "Inicio",
		nav_proyectos: "Proyectos",
		nav_educacion: "Educación",
		nav_skills: "Skills",
		nav_contacto: "Contacto",
		nav_hobbies: "Hobbies",
		nav_cv: "Currículum",
		settings_idioma: "Idioma",
		settings_tema: "Tema",
		hero_eyebrow: "Disponible para nuevas oportunidades",
		hero_greeting: "Hola, soy Andrés Vanegas.",
		hero_body:
			"Desarrollo aplicaciones web modernas utilizando React, TypeScript y Node.js, centrándome en el rendimiento, la experiencia de usuario y una arquitectura escalable.",
		hero_cta_projects: "Ver Proyectos",
		hero_cta_contact: "Contáctame",

		proyectos_titulo: "Proyectos",
		proyectos_subtitulo:
			"Una colección de proyectos que fui construyendo mientras aprendo.",
		proyectos_codigo: "Ver código",
		proyectos_demo: "Ver demo",
		proyectos_cargando: "Cargando proyectos...",
		proyectos_error: "No se pudieron cargar los proyectos.",
		proyectos_sin_desc: "Sin descripción",

		edu_titulo: "Formación Académica",
		edu_sistemas: "Ingeniería de Sistemas",
		edu_sistemas_fecha: "2021 - En curso",
		edu_frontend: "Especialización Front-end",
		edu_frontend_fecha: "2023 - Finalizado",
		edu_green: "GreenDigital Skills",
		edu_green_fecha: "2023 - Finalizado",

		skills_titulo: "Skills",
		skills_frontend: "Frontend",
		skills_state_data: "Estado y Datos",
		skills_tools: "Herramientas",
		skills_practices: "Prácticas",

		hobbies_titulo: "Más Allá del Código",
		hobby_gym: "Gym",
		hobby_musica: "Música",
		hobby_videojuegos: "Videojuegos",
		hobby_senderismo: "Senderismo",
		hobby_moto: "Viajar en Moto",

		contacto_titulo: "Trabajemos juntos.",
		contacto_subtitulo:
			"Ya sea que tengas un proyecto en mente o simplemente quieras charlar sobre tecnología, mi bandeja de entrada siempre está abierta.",
		contacto_nombre: "Nombre",
		contacto_email: "Correo electrónico",
		contacto_asunto: "Asunto",
		contacto_mensaje: "Mensaje",
		contacto_enviar: "Enviar Mensaje",
		contacto_enviando: "Enviando...",
		contacto_exito: "¡Mensaje enviado! Te responderé pronto.",
		contacto_error_envio:
			"No se pudo enviar. Intentá de nuevo o escribime directo por correo.",
		contacto_modal_titulo: "¡Ups!",
		contacto_modal_body:
			"Por favor, completa todos los campos del formulario antes de enviar.",
		contacto_modal_btn: "Entendido",
		contacto_ubicacion: "Ubicación",

        footer_derechos: "Todos los derechos reservados.",
	},
	en: {
		lang_btn: "ES",
		nav_inicio: "Home",
		nav_proyectos: "Projects",
		nav_educacion: "Education",
		nav_skills: "Skills",
		nav_contacto: "Contact",
		nav_hobbies: "Hobbies",
		nav_cv: "Resume",
		settings_idioma: "Language",
		settings_tema: "Theme",
		hero_eyebrow: "Available for new opportunities",
		hero_greeting: "Hi, I'm Andrés Vanegas.",
		hero_body:
			"I develop modern web applications using React, TypeScript, and Node.js, focusing on performance, user experience, and scalable architecture.",
		hero_cta_projects: "View Projects",
		hero_cta_contact: "Contact Me",

		proyectos_titulo: "Projects",
		proyectos_subtitulo:
			"A collection of projects I've built while learning.",
		proyectos_codigo: "View code",
		proyectos_demo: "View demo",
		proyectos_cargando: "Loading projects...",
		proyectos_error: "Couldn't load projects.",
		proyectos_sin_desc: "No description",

		edu_titulo: "Academic Background",
		edu_sistemas: "Systems Engineering",
		edu_sistemas_fecha: "2021 - Ongoing",
		edu_frontend: "Front-end Specialization",
		edu_frontend_fecha: "2023 - Completed",
		edu_green: "GreenDigital Skills",
		edu_green_fecha: "2023 - Completed",

		skills_titulo: "Skills",
		skills_frontend: "Frontend",
		skills_state_data: "State & Data",
		skills_tools: "Tools",
		skills_practices: "Practices",

		hobbies_titulo: "Beyond the Code",
		hobby_gym: "Gym",
		hobby_musica: "Music",
		hobby_videojuegos: "Video Games",
		hobby_senderismo: "Hiking",
		hobby_moto: "Motorcycle Trips",

		contacto_titulo: "Let's work together.",
		contacto_subtitulo:
			"Whether you have a project in mind or just want to talk about tech, my inbox is always open.",
		contacto_nombre: "Name",
		contacto_email: "Email address",
		contacto_asunto: "Subject",
		contacto_mensaje: "Message",
		contacto_enviar: "Send Message",
		contacto_enviando: "Sending...",
		contacto_exito: "Message sent! I'll get back to you soon.",
		contacto_error_envio:
			"Couldn't send it. Try again or email me directly.",
		contacto_modal_titulo: "Oops!",
		contacto_modal_body: "Please fill in all the fields before submitting.",
		contacto_modal_btn: "Got it",
		contacto_ubicacion: "Location",

        footer_derechos: "All rights reserved.",
	},
} as const;

export const typedRoles: Record<Lang, string[]> = {
	es: [
		"Desarrollador Frontend",
		"Estudiante de Ingeniería de Sistemas",
		"Entusiasta de React",
		"Constructor de interfaces limpias",
	],
	en: [
		"Frontend Developer",
		"Systems Engineering Student",
		"React Enthusiast",
		"Clean Interface Builder",
	],
};

export const projectDescriptions: Record<Lang, Record<string, string>> = {
	es: {
		games_hub:
			"Catálogo de videojuegos gratuitos con búsqueda, comparador, favoritos, noticias y un dashboard con estadísticas. Construido con React, TypeScript y TanStack Query, con funciones edge en Vercel como proxy hacia la API de juegos.",
		org: "App React para gestionar equipos y colaboradores. Agrega miembros, asigna departamentos, personaliza colores en tiempo real y marca favoritos. El estado persiste con localStorage.",
		creador_de_tareas:
			"Gestor de tareas minimalista — crea, edita, completa y elimina tareas. Los datos persisten entre sesiones gracias a localStorage. Construido con Vanilla JS y módulos ES, sin frameworks.",
		encriptador_de_texto:
			"Encriptador de texto que transforma vocales en palabras clave predefinidas. Permite encriptar y desencriptar mensajes desde una interfaz limpia. Construido con Vanilla JS sin frameworks.",
		weather_app:
			"Clima en tiempo real con pronósticos por horas y días, alertas meteorológicas, globo 3D de ubicación y fondo animado que cambia según el clima real.",
	},
	en: {
		games_hub:
			"Free-to-play game catalog with search, a comparison tool, favorites, a news feed and a stats dashboard. Built with React, TypeScript and TanStack Query, using Vercel edge functions as a proxy to the games API.",
		org: "React app to manage teams and collaborators. Add members, assign departments, customize colors in real time and track favorites. State persists with localStorage.",
		creador_de_tareas:
			"Minimal task manager — create, edit, complete and delete tasks. Data persists between sessions using localStorage. Built with Vanilla JS ES Modules, no frameworks.",
		encriptador_de_texto:
			"Text encryptor that transforms vowels into predefined keywords. Encrypt and decrypt messages through a clean, straightforward interface. Built with Vanilla JS, no frameworks.",
		weather_app:
			"Real-time weather with hourly and daily forecasts, weather alerts, a 3D location globe, and an animated background that changes based on actual weather conditions.",
	},
};

export type Lang = keyof typeof translations;
export type TranslationKey = keyof (typeof translations)["es"];
