import { load } from "js-yaml";

export async function loadConfig() {
	const res = await fetch(new URL("config.yaml", window.location.href));

	if (!res.ok) {
		throw new Error(`Could not load config.yaml (${res.status})`);
	}

	const text = await res.text();

	return load(text);
}
