export function createHero(profile) {
  const avatarHtml = profile.avatar
    ? `<img class="avatar" src="${profile.avatar}" alt="${profile.name}">`
    : `
      <div class="avatar placeholder">
        ${profile.name?.[0]?.toUpperCase() || ""}
      </div>
    `;

  return `
    <div class="card hero-card">
      <div class="hero-content">
        ${avatarHtml}

        <div class="hero-info">
          <h1>${profile.name}</h1>
          <p class="title">${profile.title}</p>
          <p class="description">${profile.description}</p>
        </div>
      </div>

      ${profile.socials?.length ? `
        <div class="socials-list">
          ${profile.socials.map(s => `
            <a href="${s.url}" class="social-link" title="${s.name}">
              <i class="bxl bx-${s.name}"></i>
            </a>
          `).join("")}
        </div>
      ` : ""}
    </div>
  `;
}