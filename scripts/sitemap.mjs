import { writeFileSync } from "node:fs";
import path from "node:path";

// Genera dist/sitemap.xml con la fecha real del build (lastmod).
const SITE = "https://portfolio-acvp.vercel.app";
const today = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE}/</loc>
    <lastmod>${today}</lastmod>
  </url>
</urlset>
`;

writeFileSync(path.resolve("dist", "sitemap.xml"), xml, "utf-8");
console.log(`Sitemap generado (lastmod ${today})`);
