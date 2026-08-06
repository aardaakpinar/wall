import { loadConfig } from "./core/config.js";
import { setPackageBaseUrl } from "./core/runtime.js";
import { applyTheme } from "./core/theme.js";
import { cardRenderers } from "./core/render.js";
import { createLayout, createFooter } from "./core/layout.js";

async function init() {
	if (window.__WALL_PACKAGE_BASE_URL__) {
		setPackageBaseUrl(window.__WALL_PACKAGE_BASE_URL__);
	}

	const config = await loadConfig();

	if (config.theme) {
		applyTheme(config.theme);
	}

	if (!config.main) {
		console.error("main zorunlu!");
		return;
	}

	const { container, grid } = createLayout();

	const html = (
		await Promise.all(
			config.main.map(async (card) => {
				const renderer = cardRenderers[card.type];

				if (!renderer) {
					console.warn("Unknown card type:", card.type);
					return "";
				}

				return await renderer(card, config);
			}),
		)
	).join("");

	grid.innerHTML = html;

	const footer = createFooter(config);

	if (footer) {
		container.appendChild(footer);
	}
}

init().catch((err) => {
	console.error("Wall failed to initialize:", err);
});
