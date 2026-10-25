// Entry point: injects the shared stylesheet, then starts the app.
// Works from a CDN or a local folder, no build step.
const FONTS = "https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800&family=Instrument+Sans:wght@400;500;600&display=swap";

function addLink(attrs, flag) {
	if (document.querySelector(`link[${flag}]`)) return;

	const link = document.createElement("link");

	Object.assign(link, attrs);
	link.setAttribute(flag, "");
	document.head.appendChild(link);
}

// Fonts load in parallel with the stylesheet instead of behind an @import chain.
addLink({ rel: "preconnect", href: "https://fonts.googleapis.com" }, "data-wall-preconnect-css");
addLink({ rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" }, "data-wall-preconnect-fonts");
addLink({ rel: "stylesheet", href: FONTS }, "data-wall-fonts");
addLink({ rel: "stylesheet", href: new URL("./styles/main.css", import.meta.url).href }, "data-wall-styles");

import("./app.js").catch((err) => console.error(err));
