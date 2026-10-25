import { defineComponent } from "../../core/component.js";
import { cardClass } from "../../core/card.js";
import { resolveAssetUrl } from "../../core/runtime.js";
import { escapeAttribute, escapeHtml, safeUrl } from "../../core/html.js";

// A real <img> (not a CSS background) so the browser can prioritize and lazy-load it.
//
//   - type: image
//     image: photo.webp
//     priority: true   # above the fold / first thing visitors see: loads eagerly, high priority
//     alt: ...         # shown as a caption on the image
export default defineComponent({
	type: "image",
	styles: new URL("./image.css", import.meta.url).href,

	isEmpty(card) {
		return !safeUrl(resolveAssetUrl(card.image), "");
	},

	render(card) {
		const src = safeUrl(resolveAssetUrl(card.image), "");
		const loading = card.priority === true ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"';
		const open = card.url ? `<a href="${escapeAttribute(safeUrl(card.url))}" class="image-card-link">` : "";
		const close = card.url ? "</a>" : "";

		return `
			<div class="${cardClass(card, "image-card")}">
				<img class="image-card-img" src="${escapeAttribute(src)}" alt="" ${loading} decoding="async" />
				${open}
				${card.alt ? `<div class="image-overlay"><span>${escapeHtml(card.alt)}</span></div>` : ""}
				${close}
			</div>
		`;
	},
});
