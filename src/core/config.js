import { parseYaml } from "./yaml.js";

// Reads config.yaml next to the page. A page can point to another file with
// <script type="module" src="..." data-wall-config="components.yaml">.
export async function loadConfig() {
	const file = document.querySelector("script[data-wall-config]")?.dataset.wallConfig || "config.yaml";
	const res = await fetch(new URL(file, window.location.href));

	if (!res.ok) {
		throw new Error(`Could not load ${file} (${res.status})`);
	}

	return parseYaml(await res.text());
}
