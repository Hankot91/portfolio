# Portfolio — Andrés Vanegas

Landing personal bilingüe (ES/EN) con dos temas visuales completos —**Emerald Night** (oscuro) y **Solar Minimal** (claro)— diseñados en Stitch y migrados a un stack real de producción.

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