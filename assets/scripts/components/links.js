export function createLinks(card) {
  return `
    <div class="card">
      <div class="card-header">
        <span class="card-title">
          ${card.title || "Links"}
        </span>
      </div>

      <div class="links-list">
        ${card.items.map(link => `
          <a href="${link.url}" class="link-item">
            <div class="link-icon">
              <i class="${link.icon || "bx-link"}"></i>
            </div>

            <span class="link-text">
              ${link.name}
            </span>
          </a>
        `).join("")}
      </div>
    </div>
  `;
}