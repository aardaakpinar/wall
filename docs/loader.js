// Preview-site loader.
// On localhost it runs the engine from ../src. On GitHub Pages it loads Wall
// from the CDN, exactly the way anyone else adds it to their own site.
(() => {
	const me = document.currentScript;
	const local = ["localhost", "127.0.0.1"].includes(location.hostname);
	const script = document.createElement("script");

	script.type = "module";
	script.src = local ? new URL("../src/main.js", me.src).href : "https://cdn.jsdelivr.net/gh/aardaakpinar/wall@v1.1.1/src/main.js";

	if (me.dataset.wallConfig) {
		script.dataset.wallConfig = me.dataset.wallConfig;
	}

	document.head.appendChild(script);
})();
