import { defineComponent } from "../../core/component.js";
import { cardClass } from "../../core/card.js";
import { resolveAssetUrl } from "../../core/runtime.js";
import { escapeAttribute, escapeHtml, safeUrl } from "../../core/html.js";

export default defineComponent({
	type: "hero",
	styles: new URL("./hero.css", import.meta.url).href,

	render(card, { config }) {
		const profile = config.profile ?? {};

		const avatar = profile.avatar
			? `<img class="avatar" src="${escapeAttribute(safeUrl(resolveAssetUrl(profile.avatar), ""))}" alt="">`
			: `<div class="avatar placeholder" aria-hidden="true">${escapeHtml(profile.name?.[0]?.toUpperCase() || "")}</div>`;

		const socials = profile.socials?.length
			? `<ul class="socials-list">
				${profile.socials
					.map(
						(s) => `<li><a href="${escapeAttribute(safeUrl(s.url))}" class="social-link" target="_blank" rel="noopener">
							<i class="bxl bx-${escapeAttribute(s.name)}" aria-hidden="true"></i>${escapeHtml(s.label || s.name)}
						</a></li>`,
					)
					.join("")}
			</ul>`
			: "";

		return `
			<div class="${cardClass(card, "hero-card")}">
				<div class="hero-wall" aria-hidden="true"></div>
				<div class="hero-top">
					${avatar}
					<p class="title">${escapeHtml(profile.title)}</p>
				</div>
				<h1>${escapeHtml(profile.name)}</h1>
				<div class="hero-bottom">
					<p class="description justify">${escapeHtml(profile.description)}</p>
					${socials}
				</div>
			</div>
		`;
	},
});
