import { resolvePackageUrl } from "../core/runtime.js";
import { cardClass } from "../core/card.js";
import { escapeAttribute, escapeHtml, safeUrl } from "../core/html.js";

export function createHero(card, profile) {
  const avatarHtml = profile.avatar
    ? `<img class="avatar" src="${escapeAttribute(safeUrl(resolvePackageUrl(profile.avatar), ""))}" alt="${escapeAttribute(profile.name)}">`
    : `
      <div class="avatar placeholder">
        ${escapeHtml(profile.name?.[0]?.toUpperCase() || "")}
      </div>
    `;

  return `
    <div class="${cardClass(card, "hero-card")}">
      <div class="hero-content">
        ${avatarHtml}

        <div class="hero-info">
          <h1>${escapeHtml(profile.name)}</h1>
          <p class="title">${escapeHtml(profile.title)}</p>
          <p class="description">${escapeHtml(profile.description)}</p>
        </div>
      </div>

      ${profile.socials?.length ? `
        <div class="socials-list">
          ${profile.socials.map(s => `
            <a href="${escapeAttribute(safeUrl(s.url))}" class="social-link" title="${escapeAttribute(s.name)}">
              <i class="bxl bx-${escapeAttribute(s.name)}"></i>
            </a>
          `).join("")}
        </div>
      ` : ""}
    </div>
  `;
}
