import { escapeHtml } from "../core/html.js";

export function createTitle(card) {
  return `
    <div class="section-title">
      <span>${escapeHtml(card.text)}</span>
    </div>
  `;
}
