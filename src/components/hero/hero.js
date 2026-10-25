import { defineComponent } from "../../core/component.js";
import { cardClass } from "../../core/card.js";
import { resolveAssetUrl } from "../../core/runtime.js";
import { escapeAttribute, escapeHtml, safeUrl } from "../../core/html.js";

// Every part of the hero can be switched off from the card:
//
//   - type: hero
//     cols: 2          # 1-4 or "full"
//     rows: 2          # 1-4
//     minHeight: 20rem # any CSS length, a bare number means px
//     background: "#0f172a"
//     show: { avatar: false, title: false, pattern: false }
//
// Parts with no data in `profile` are never printed, whatever `show` says.
const SHOW_DEFAULTS = { avatar: true, title: true, name: true, description: true, socials: true, pattern: true };

const present = (value) => String(value ?? "").trim() !== "";

function resolveHero(card, config) {
	const profile = config.profile ?? {};
	const show = { ...SHOW_DEFAULTS };

	Object.keys(SHOW_DEFAULTS).forEach((key) => {
		if (card.show?.[key] === false) show[key] = false;
	});

	return {
		profile,
		pattern: show.pattern,
		avatar: show.avatar && (present(profile.avatar) || present(profile.name)),
		title: show.title && present(profile.title),
		name: show.name && present(profile.name),
		description: show.description && present(profile.description),
		socials: show.socials && Array.isArray(profile.socials) && profile.socials.length > 0,
	};
}

// Inline custom properties, only when the value is a real CSS value.
function heroStyle(card) {
	const vars = [];
	const minHeight = typeof card.minHeight === "number" ? `${card.minHeight}px` : card.minHeight;

	if (present(minHeight) && CSS.supports("min-height", String(minHeight))) {
		vars.push(`--hero-min-height: ${minHeight}`);
	}

	if (present(card.background) && CSS.supports("background-color", String(card.background))) {
		vars.push(`--hero: ${card.background}`);
	}

	return vars.length ? ` style="${escapeAttribute(vars.join("; "))}"` : "";
}

export default defineComponent({
	type: "hero",
	styles: new URL("./hero.css", import.meta.url).href,

	isEmpty(card, { config }) {
		const hero = resolveHero(card, config);

		return !(hero.avatar || hero.title || hero.name || hero.description || hero.socials);
	},

	render(card, { config }) {
		const hero = resolveHero(card, config);
		const { profile } = hero;

		const avatar = !hero.avatar
			? ""
			: profile.avatar
				? `<img class="avatar" src="${escapeAttribute(safeUrl(resolveAssetUrl(profile.avatar), ""))}" alt="">`
				: `<div class="avatar placeholder" aria-hidden="true">${escapeHtml(String(profile.name).trim()[0]?.toUpperCase() ?? "")}</div>`;

		const title = hero.title ? `<p class="title">${escapeHtml(profile.title)}</p>` : "";

		const socials = hero.socials
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

		const description = hero.description ? `<p class="description justify">${escapeHtml(profile.description)}</p>` : "";

		return `
			<div class="${cardClass(card, "hero-card")}"${heroStyle(card)}>
				${hero.pattern ? '<div class="hero-wall" aria-hidden="true"></div>' : ""}
				${avatar || title ? `<div class="hero-top">${avatar}${title}</div>` : ""}
				${hero.name ? `<h1>${escapeHtml(profile.name)}</h1>` : ""}
				${description || socials ? `<div class="hero-bottom">${description}${socials}</div>` : ""}
			</div>
		`;
	},
});
