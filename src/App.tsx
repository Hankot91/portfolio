import { LanguageProvider } from "./i18n/LanguageContext";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Educacion } from "./components/Educacion";
import { Skills } from "./components/Skills";
import { Hobbies } from "./components/Hobbies";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Resumen } from "./components/Resumen";
import { FAQ } from "./components/FAQ";
import { MobileCTA } from "./components/MobileCTA";
import { StructuredData } from "./components/StructuredData";
import { useSeo } from "./hooks/useSeo";

const BAND = "border-y border-outline-variant/15 bg-surface-container-low/60";

function Content() {
	useSeo();

	return (
		<div className="min-h-screen bg-background text-on-background">
			<StructuredData />
			<Header />
			<main>
				<Hero />
				<Resumen />
				<Projects />
				<div className={BAND}>
					<Educacion />
				</div>
				<Skills />
				<div className={BAND}>
					<Hobbies />
				</div>
				<FAQ />
				<Contact />
			</main>
			<Footer />
			<MobileCTA />
		</div>
	);
}

function App() {
	return (
		<LanguageProvider>
			<Content />
		</LanguageProvider>
	);
}

export default App;
