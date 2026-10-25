import "./components/index.js";
import { loadConfig } from "./core/config.js";
import { applyTheme } from "./core/theme.js";
import { getComponent, loadStyles } from "./core/component.js";
import { loadIcons } from "./core/icons.js";
import { createLayout, createFooter } from "./core/layout.js";

async function buildSlot(card, ctx) {
	const component = getComponent(card?.type);

	if (!component) {
		console.warn("Unknown card type:", card?.type);
		return null;
	}

	// Fetch data first. A card with nothing to show is dropped before its CSS is requested.
	const data = await component.load?.(card, ctx);

	if (component.isEmpty?.(card, ctx, data)) {
		console.info(`Skipped empty "${card.type}" card.`);
		return null;
	}

	await Promise.all([loadStyles(component.styles), loadIcons(component.icons?.(card, ctx, data))]);

	const slot = document.createElement("div");

	slot.className = "slot";
	slot.dataset.type = card.type;
	slot.innerHTML = await component.render(card, ctx, data);

	return { slot, mount: () => component.mount?.(slot, card, ctx, data) };
}

async function init() {
	const config = await loadConfig();
	const ctx = { config };

	if (config.theme) applyTheme(config.theme);
	if (config.lang) document.documentElement.lang = config.lang;

	if (!config.main) {
		console.error("config.yaml needs a `main` list.");
		return;
	}

	const { container, grid } = createLayout();
	const built = (await Promise.all(config.main.map((card) => buildSlot(card, ctx)))).filter(Boolean);

	// Stagger index first, then one insertion, so the browser lays the grid out once.
	const fragment = document.createDocumentFragment();

	built.flatMap(({ slot }) => [...slot.children]).forEach((el, i) => el.style.setProperty("--i", i));
	built.forEach(({ slot }) => fragment.appendChild(slot));
	grid.appendChild(fragment);
	built.forEach(({ mount }) => mount());

	const footer = createFooter(config);

	if (footer) container.appendChild(footer);
}

init().catch((err) => console.error("Wall failed to initialize:", err));
