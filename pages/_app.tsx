import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
	function updateScale() {
		let height = Math.min(window.innerHeight, window.innerWidth / 1.8);
		let unscaledHeight = 718;
		let padding = 40 + 80;
		let scale = Math.max((height - padding) / unscaledHeight, 0.8);
		document.body.style.setProperty("--scale", scale.toString());
	}

	useEffect(() => {
		updateScale();
		window.addEventListener("resize", updateScale);

		return () => window.removeEventListener("resize", updateScale);
	}, []);

	return <Component {...pageProps}></Component>;
}
