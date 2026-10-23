// Entry point: injects the shared stylesheet, then starts the app.
// Works from a CDN or a local folder, no build step.
if (!document.querySelector("link[data-wall-styles]")) {
	const link = document.createElement("link");

	link.rel = "stylesheet";
	link.href = new URL("./styles/main.css", import.meta.url).href;
	link.dataset.wallStyles = "";
	document.head.appendChild(link);
}

import("./app.js").catch((err) => console.error(err));
