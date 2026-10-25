import { defineComponent } from "../../core/component.js";
import { cardClass } from "../../core/card.js";
import { escapeAttribute, escapeHtml, safeUrl } from "../../core/html.js";

export default defineComponent({
	type: "projects",
	styles: new URL("./projects.css", import.meta.url).href,

	isEmpty(card) {
		return !card.items?.length;
	},

	render(card) {
		return (card.items ?? [])
			.map(
				(p) => `
			<div class="${cardClass(p, "project-card")}">
				<a href="${escapeAttribute(safeUrl(p.url || "#"))}" class="project-item-single">
					<div class="project-header"><span class="project-name">${escapeHtml(p.name)}</span></div>
					<p class="project-description justify">${escapeHtml(p.description)}</p>
					${p.tags?.length ? `<div class="project-tags">${p.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("")}</div>` : ""}
				</a>
			</div>`,
			)
			.join("");
	},
});
