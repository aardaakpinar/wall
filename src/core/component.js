// A component is one card type. It lives in its own folder with its own CSS:
//
//   defineComponent({
//     type: "hero",                              // value of `type:` in config.yaml
//     styles: new URL("./hero.css", import.meta.url).href,   // loaded only when used
//     load(card, ctx)            { ... },        // optional, async data (fetch)
//     isEmpty(card, ctx, data)   { ... },        // optional, true = nothing to show: no render, no CSS
//     render(card, ctx, data)    { return "<html>"; },
//     mount(root, card, ctx, data) { ... },      // optional, behavior after insertion
//   });
//
// ctx is { config }. render() must escape everything it prints.
const registry = new Map();
const styleRequests = new Map();

export function defineComponent(def) {
	if (!def?.type || typeof def.render !== "function") {
		throw new Error("A component needs a `type` and a `render` function.");
	}

	return def;
}

export function registerComponent(def) {
	registry.set(def.type, defineComponent(def));
}

export function getComponent(type) {
	return registry.get(type);
}

export function loadStyles(href) {
	if (!href) {
		return Promise.resolve();
	}

	if (!styleRequests.has(href)) {
		styleRequests.set(
			href,
			new Promise((resolve) => {
				const link = document.createElement("link");

				link.rel = "stylesheet";
				link.href = href;
				link.onload = link.onerror = () => resolve();
				document.head.appendChild(link);
			}),
		);
	}

	return styleRequests.get(href);
}
