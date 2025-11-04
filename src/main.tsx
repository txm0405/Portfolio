import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Importing the asset returns a resolved URL from the bundler (Vite/Bun),
// so we can use the image from `src/assets` without copying it to `public/`.
import heroUrl from "/hero-bg.webp";

function setMetaImage(url: string) {
	const setTag = (selector: string) => {
		const el = document.querySelector(selector) as HTMLMetaElement | null;
		if (el) el.content = url;
	};

	// Update OG and Twitter meta tags if they exist
	setTag('meta[property="og:image"]');
	setTag('meta[name="twitter:image"]');

	// Update JSON-LD script if present
	const jsonLd = document.querySelector('script[type="application/ld+json"]');
	if (jsonLd) {
		try {
			const data = JSON.parse(jsonLd.textContent || "{}");
			data.image = url;
			jsonLd.textContent = JSON.stringify(data, null, 2);
		} catch (e) {
			// ignore
		}
	}
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", () => setMetaImage(heroUrl));
} else {
	setMetaImage(heroUrl);
}

createRoot(document.getElementById("root")!).render(<App />);
