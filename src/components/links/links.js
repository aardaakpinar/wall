import { defineComponent } from "../../core/component.js";
import { cardClass } from "../../core/card.js";
import { escapeAttribute, escapeHtml, safeUrl } from "../../core/html.js";

export default defineComponent({
	type: "links",
	styles: new URL("./links.css", import.meta.url).href,

	render(card) {
		return `
			<div class="${cardClass(card)}">
				<div class="card-header"><span class="card-title">${escapeHtml(card.title || "Links")}</span></div>
				<div class="links-list">
					${(card.items ?? [])
						.map(
							(link) => `
						<a href="${escapeAttribute(safeUrl(link.url))}" class="link-item">
							<span class="link-icon"><i class="${escapeAttribute(link.icon || "bx-link")}" aria-hidden="true"></i></span>
							<span class="link-text">${escapeHtml(link.name)}</span>
						</a>`,
						)
						.join("")}
				</div>
			</div>
		`;
	},
});
