import { LanguageProvider } from "./i18n/LanguageContext";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Educacion } from "./components/Educacion";
import { Skills } from "./components/Skills";
import { Hobbies } from "./components/Hobbies";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function Content() {
	return (
		<div className="min-h-screen bg-background text-on-background">
			<Header />
			<main>
				<Hero />
				<Projects />
				<Educacion />
        <Skills />
        <Hobbies />
        <Contact />
        <Footer />
			</main>
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
