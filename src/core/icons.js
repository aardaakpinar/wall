import { loadStyles } from "./component.js";

// Boxicons ships three separate stylesheets (and fonts, 300+ KiB each).
// A page only downloads the sets its cards actually use.
const BASE = "https://cdn.boxicons.com/3.0.8/fonts";
const SETS = {
	basic: `${BASE}/basic/boxicons.min.css`,
	filled: `${BASE}/filled/boxicons-filled.min.css`,
	brands: `${BASE}/brands/boxicons-brands.min.css`,
};

// "bxl bx-github" -> brands, "bxs bx-heart" -> filled, "bx-book" -> basic
export function iconSetOf(className) {
	const tokens = String(className ?? "").split(/\s+/);

	if (tokens.some((t) => t === "bxl" || t.startsWith("bxl-"))) return "brands";
	if (tokens.some((t) => t === "bxs" || t.startsWith("bxs-"))) return "filled";

	return "basic";
}

export function loadIcons(sets = []) {
	return Promise.all([...new Set(sets)].filter((set) => SETS[set]).map((set) => loadStyles(SETS[set])));
}
