import puppeteer from "puppeteer";
import http from "node:http";
import serveHandler from "serve-handler";
import { writeFileSync, readFileSync } from "node:fs";
import path from "node:path";

const PORT = 4173;
const URL = `http://localhost:${PORT}`;
const DIST = path.resolve("dist");
const GITHUB_USER = "Hankot91";

function createServer() {
	return http.createServer(async (req, res) => {
		if (req.url === "/api/github-projects") {
			try {
				const ghRes = await fetch(
					`https://api.github.com/search/repositories?q=user:${GITHUB_USER}+topic:portfolio&sort=updated`,
					{ headers: { Accept: "application/vnd.github+json" } },
				);
				const data = await ghRes.json();
				res.writeHead(200, { "Content-Type": "application/json" });
				res.end(JSON.stringify(data));
			} catch (err) {
				res.writeHead(500, { "Content-Type": "application/json" });
				res.end(
					JSON.stringify({ error: "No se pudo contactar GitHub" }),
				);
			}
			return;
		}
		return serveHandler(req, res, { public: DIST });
	});
}

function waitForServer(url, timeoutMs = 15000) {
	const start = Date.now();
	return new Promise((resolve, reject) => {
		const check = async () => {
			try {
				const res = await fetch(url);
				if (res.ok) return resolve();
			} catch {}
			if (Date.now() - start > timeoutMs)
				return reject(new Error("Timeout esperando el servidor"));
			setTimeout(check, 300);
		};
		check();
	});
}

async function run() {
	console.log("Levantando servidor local (estático + /api mock)...");
	const server = createServer();

	await new Promise((resolve, reject) => {
		server.once("error", (err) => {
			if (err.code === "EADDRINUSE") {
				reject(
					new Error(
						`El puerto ${PORT} ya está en uso. Cierra el proceso que lo está usando (en Windows: "netstat -ano | findstr :${PORT}" y luego "taskkill /PID <pid> /F") y vuelve a correr el build.`,
					),
				);
			} else {
				reject(err);
			}
		});
		server.listen(PORT, resolve);
	});

	try {
		await waitForServer(URL);

		console.log("Abriendo navegador headless...");
		const browser = await puppeteer.launch({
			headless: true,
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
		});
		const page = await browser.newPage();

		await page.goto(URL, { waitUntil: "networkidle0", timeout: 30000 });
		await new Promise((r) => setTimeout(r, 500));

		// Solo extraemos el HTML de adentro de #root, no el documento completo.
		const rootInnerHTML = await page.evaluate(() => {
			const root = document.getElementById("root");
			return root ? root.innerHTML : "";
		});

		await browser.close();

		if (!rootInnerHTML) {
			throw new Error(
				"No se encontró contenido dentro de #root al prerenderizar.",
			);
		}

		// Tomamos el index.html ORIGINAL generado por Vite (con nuestro <head> de SEO intacto)
		// y solo reemplazamos el div#root vacío por el contenido ya renderizado.
		const outPath = path.join(DIST, "index.html");
		const original = readFileSync(outPath, "utf-8");

		const updated = original.replace(
			'<div id="root"></div>',
			`<div id="root">${rootInnerHTML}</div>`,
		);

		if (updated === original) {
			throw new Error(
				"No se encontró '<div id=\"root\"></div>' vacío en dist/index.html para reemplazar.",
			);
		}

		writeFileSync(outPath, updated, "utf-8");
		console.log(`Prerender completado: ${outPath}`);
	} finally {
		server.close();
	}
}

run().catch((err) => {
	console.error("Error en prerender:", err);
	process.exit(1);
});
