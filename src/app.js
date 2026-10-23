import "./components/index.js";
import { loadConfig } from "./core/config.js";
import { applyTheme } from "./core/theme.js";
import { getComponent, loadStyles } from "./core/component.js";
import { createLayout, createFooter } from "./core/layout.js";

async function buildSlot(card, ctx) {
	const component = getComponent(card.type);

	if (!component) {
		console.warn("Unknown card type:", card.type);
		return null;
	}

	// Fetch data and the component's own CSS in parallel, then render.
	const [data] = await Promise.all([component.load?.(card, ctx), loadStyles(component.styles)]);
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

	built.forEach(({ slot, mount }) => {
		grid.appendChild(slot);
		mount();
	});

	grid.querySelectorAll(".slot > *").forEach((el, i) => el.style.setProperty("--i", i));

	const footer = createFooter(config);

	if (footer) container.appendChild(footer);
}

init().catch((err) => console.error("Wall failed to initialize:", err));
