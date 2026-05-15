export function createImage(card) {
  const bg = card.image;

  const linkStart = card.url
    ? `<a href="${card.url}" class="image-card-link">`
    : "";

  const linkEnd = card.url
    ? `</a>`
    : "";

  return `
    <div
      class="card image-card"
      style="background-image: url('${bg}')"
    >
      ${linkStart}

      ${card.alt ? `
        <div class="image-overlay">
          <span>${card.alt}</span>
        </div>
      ` : ""}

      ${linkEnd}
    </div>
  `;
}