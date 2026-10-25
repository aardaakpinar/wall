import { defineComponent } from "../../core/component.js";
import { cardClass } from "../../core/card.js";
import { resolveAssetUrl } from "../../core/runtime.js";
import { escapeAttribute, escapeCssUrl, escapeHtml, safeUrl } from "../../core/html.js";

export default defineComponent({
	type: "image",
	styles: new URL("./image.css", import.meta.url).href,

	isEmpty(card) {
		return !safeUrl(resolveAssetUrl(card.image), "");
	},

	render(card) {
		const src = safeUrl(resolveAssetUrl(card.image), "");
		const open = card.url ? `<a href="${escapeAttribute(safeUrl(card.url))}" class="image-card-link">` : "";
		const close = card.url ? "</a>" : "";

		return `
			<div class="${cardClass(card, "image-card")}" style="background-image: url('${escapeCssUrl(src)}')">
				${open}
				${card.alt ? `<div class="image-overlay"><span>${escapeHtml(card.alt)}</span></div>` : ""}
				${close}
			</div>
		`;
	},
});
