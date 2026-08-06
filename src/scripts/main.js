(function () {
	const script = document.currentScript || Array.from(document.scripts).find((item) => item.src && item.src.includes("/main.js"));

	if (!script) {
		throw new Error("Wall loader script could not determine its source URL.");
	}

	const scriptBaseUrl = new URL(".", script.src);
	const packageBaseUrl = script.src.includes("/assets/scripts/") ? new URL("../../", scriptBaseUrl) : new URL("../", scriptBaseUrl);

	window.__WALL_PACKAGE_BASE_URL__ = packageBaseUrl.href;

	const styleLink = document.createElement("link");
	styleLink.rel = "stylesheet";
	styleLink.href = new URL("../public/main.css", script.src).href;
	document.head.appendChild(styleLink);

	import("./app.js").catch((err) => {
		console.error(err);
	});
})();
