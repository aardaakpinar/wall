import { resolvePackageUrl } from "../core/runtime.js";
import { cardClass } from "../core/card.js";
import { escapeAttribute, escapeCssUrl, escapeHtml, safeUrl } from "../core/html.js";

export function createImage(card) {
  const bg = safeUrl(resolvePackageUrl(card.image), "");

  const linkStart = card.url
    ? `<a href="${escapeAttribute(safeUrl(card.url))}" class="image-card-link">`
    : "";

  const linkEnd = card.url
    ? `</a>`
    : "";

  return `
    <div
      class="${cardClass(card, "image-card")}"
      style="background-image: url('${escapeCssUrl(bg)}')"
    >
      ${linkStart}

      ${card.alt ? `
        <div class="image-overlay">
          <span>${escapeHtml(card.alt)}</span>
        </div>
      ` : ""}

      ${linkEnd}
    </div>
  `;
}
