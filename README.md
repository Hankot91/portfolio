# Portfolio — Andrés Vanegas

Landing personal bilingüe (ES/EN) con tema oscuro y claro (misma identidad, distinta luz), intercambiables en runtime con `data-theme`.

## Stack

- **React 19 + TypeScript + Vite**
- **Tailwind CSS v4**, con los tokens de ambos temas como variables CSS intercambiables en runtime (`data-theme`)
- **Framer Motion** para las animaciones (respeta `prefers-reduced-motion` vía `MotionConfig`)
- **Typed.js** para el efecto de tipeo del Hero
- **@icons-pack/react-simple-icons** + un ícono de LinkedIn hecho a mano (Simple Icons descontinuó el de LinkedIn por su política de marca)
- **Vercel Edge Function** (`/api/github-projects`) como proxy cacheado hacia la API de GitHub
- **Formspree** para el envío real del formulario de contacto

## Secciones

Hero (con tipeo animado) · Proyectos (carrusel circular con capturas en vivo de cada demo) · Educación · Skills (agrupadas por categoría, con logos reales) · Hobbies (bento gallery) · Contacto (envío real por Formspree)

## Por qué hay un proxy para GitHub

La API de búsqueda de GitHub tiene un límite muy bajo para pedidos sin autenticar (10/min). `/api/github-projects` cachea la respuesta 10 minutos en el edge de Vercel (`s-maxage=600`), así el límite lo absorbe el proxy compartido en vez de gastarse por cada visitante.

## Desarrollo

`npm run dev` (Vite solo) **no sirve** `/api/github-projects` — hace falta `vercel dev` para tener la función serverless corriendo localmente. No hace falta ninguna variable de entorno.

```bash
npm install
vercel dev
```

## Scripts

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Vite solo (sin la función serverless) |
| `vercel dev` | Vite + `/api/github-projects` localmente |
| `npm run build` | Type-check + build de producción |
| `npm run preview` | Sirve el build localmente |

## Accesibilidad

Nav colapsable en mobile, foco visible y navegación por teclado (incluido el carrusel, con flechas ← →), labels reales en el formulario (visualmente ocultos), y todas las animaciones respetan la preferencia de "reducir movimiento" del sistema operativo.
## SEO, GEO y analítica

**Qué hay implementado**

- Título y descripción propios por idioma (`useSeo`); el HTML estático y el prerender salen siempre en español.
- Un solo `<h1>` (Hero). Jerarquía: `h2` por sección, `h3` por tarjeta o pregunta.
- Sección **En breve** (TL;DR) y **FAQ** (`<details>`), con enlaces internos a las secciones relacionadas.
- JSON-LD (`StructuredData`): `Person`, `ProfilePage`, `WebSite` y `FAQPage`. La FAQ sale de `src/data/faq.ts`, la misma fuente que la interfaz, para que texto visible y schema coincidan siempre.
- `robots.txt`, `llms.txt` y `sitemap.xml` (este último se genera en el build con la fecha real: `scripts/sitemap.mjs`).
- Alt text descriptivo e internacionalizado en todas las imágenes; imágenes en WebP.
- Barra CTA fija en móvil, botón de compartir (Web Share API con copia de enlace como alternativa).
- Cambio de tema con View Transitions (sin animar cientos de elementos a la vez).

**Google Tag Manager + GA4**

El sitio carga el contenedor `GTM-TCN234QM` (ID público, puedes cambiarlo con `VITE_GTM_ID`) y envía eventos al `dataLayer`. GA4 se configura dentro de GTM:

1. En analytics.google.com crea la propiedad y copia el **ID de medición** (empieza por `G-`). El ID `GTM-…` es del contenedor; el `G-…` es de GA4: son distintos.
2. En tagmanager.google.com → tu contenedor → **Etiquetas → Nueva → Etiqueta de Google** → pega el `G-…` → activador **Initialization - All Pages**.
3. Para los eventos del sitio: crea un activador **Evento personalizado** con la expresión regular `cta_click|cv_download|project_click|share|generate_lead` y una etiqueta **Evento de GA4** con nombre de evento `{{Event}}` (variable integrada).
4. **Vista previa** (Tag Assistant) para comprobar → **Enviar** para publicar.
5. En GA4 marca `generate_lead` y `cv_download` como eventos clave (conversiones).

Eventos enviados: `cta_click`, `cv_download`, `project_click`, `share` y `generate_lead` (formulario enviado). No se carga con "Do Not Track" ni en navegadores automatizados. No hace falta el `<noscript>` de GTM porque el sitio requiere JavaScript.

**Google Search Console**

1. search.google.com/search-console → Añadir propiedad → "Prefijo de URL" → `https://portfolio-acvp.vercel.app/`.
2. Verificación por etiqueta HTML: copia el código en `index.html` (hay un bloque comentado listo) y redespliega; luego pulsa Verificar.
3. Sitemaps → escribe `sitemap.xml` → Enviar.
4. Inspección de URLs → pega la URL principal → Solicitar indexación.

**Si algún día ofreces servicios** (freelance o emprendimiento registrado): ahí sí corresponde un schema `ProfessionalService`/`LocalBusiness` con nombre comercial, servicios, zona y horario reales. Hoy se omite a propósito: Google exige que el negocio exista.
