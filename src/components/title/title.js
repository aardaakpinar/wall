import { defineComponent } from "../../core/component.js";
import { escapeHtml } from "../../core/html.js";

export default defineComponent({
	type: "title",
	styles: new URL("./title.css", import.meta.url).href,

	isEmpty(card) {
		return !String(card.text ?? "").trim();
	},

	render(card) {
		return `<div class="section-title"><h2>${escapeHtml(card.text)}</h2></div>`;
	},
});
