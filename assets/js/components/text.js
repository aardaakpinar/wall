export function createText(card) {
  return card.items.map(p => `
    <div class="card project-card">
      <a href="${p.url}" class="project-item-single">

        <div class="project-header">
          <span class="project-name">
            ${p.name}
          </span>
        </div>

        <p class="project-description">
          ${p.description}
        </p>
      </a>
    </div>
  `).join("");
}