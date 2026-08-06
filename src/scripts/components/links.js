import { cardClass } from "../core/card.js";
import { escapeAttribute, escapeHtml, safeUrl } from "../core/html.js";

export function createLinks(card) {
  return `
    <div class="${cardClass(card)}">
      <div class="card-header">
        <span class="card-title">
          ${escapeHtml(card.title || "Links")}
        </span>
      </div>

      <div class="links-list">
        ${card.items.map(link => `
          <a href="${escapeAttribute(safeUrl(link.url))}" class="link-item">
            <div class="link-icon">
              <i class="${escapeAttribute(link.icon || "bx-link")}"></i>
            </div>

            <span class="link-text">
              ${escapeHtml(link.name)}
            </span>
          </a>
        `).join("")}
      </div>
    </div>
  `;
}
