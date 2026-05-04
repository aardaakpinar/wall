async function loadConfig() {
  const res = await fetch('config.yaml');
  const text = await res.text();
  return jsyaml.load(text);
}

/* ---------------- THEME ---------------- */

function applyTheme(theme) {
  const root = document.documentElement;

  const map = {
    background: "--background",
    foreground: "--foreground",
    card: "--card",
    cardForeground: "--card-foreground",
    primary: "--primary",
    primaryForeground: "--primary-foreground",
    muted: "--muted",
    mutedForeground: "--muted-foreground",
    border: "--border",
    radius: "--radius",
  };

  Object.entries(map).forEach(([key, cssVar]) => {
    if (theme?.[key]) {
      root.style.setProperty(cssVar, theme[key]);
    }
  });
}

function applySEO(seo) {
  if (!seo) return;

  // Title
  if (seo.title) {
    document.title = seo.title;
  }

  const setMeta = (name, content, attr = "name") => {
    if (!content) return;

    let el = document.querySelector(`meta[${attr}="${name}"]`);

    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }

    el.setAttribute("content", content);
  };

  const setLink = (rel, href) => {
    if (!href) return;

    let el = document.querySelector(`link[rel="${rel}"]`);

    if (!el) {
      el = document.createElement("link");
      el.setAttribute("rel", rel);
      document.head.appendChild(el);
    }

    el.setAttribute("href", href);
  };

  // Basic SEO
  setMeta("description", seo.description);
  setMeta("keywords", seo.keywords);
  setLink("icon", seo.favicon);
  setLink("apple-touch-icon", seo.favicon);

  // Open Graph
  setMeta("og:title", seo.title, "property");
  setMeta("og:description", seo.description , "property");
  setMeta("og:image", seo.image, "property");
  setMeta("og:url", seo.url, "property");
  setMeta("og:type", "website", "property");

  // Twitter Card
  setMeta("twitter:card", "summary_large_image", "name");
  setMeta("twitter:title", seo.title, "name");
  setMeta("twitter:description", seo.description, "name");
  setMeta("twitter:image", seo.image, "name");
}

/* ---------------- HERO ---------------- */

function createHero(profile) {
  const avatarHtml = profile.avatar
    ? `<img class="avatar" src="${profile.avatar}" alt="${profile.name}">`
    : `<div class="avatar placeholder">
         ${profile.name?.[0]?.toUpperCase() || ''}
       </div>`;

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
          `).join('')}
        </div>
      ` : ""}
    </div>
  `;
}

/* ---------------- LINKS ---------------- */

function createLinks(card) {
  return `
    <div class="card">
      <div class="card-header">
        <span class="card-title">${card.title || "Links"}</span>
      </div>

      <div class="links-list">
        ${card.items.map(link => `
          <a href="${link.url}" class="link-item">
            <div class="link-icon">
              <i class="${link.icon || 'bx-link'}"></i>
            </div>
            <span class="link-text">${link.name}</span>
          </a>
        `).join('')}
      </div>
    </div>
  `;
}

/* ---------------- PROJECTS ---------------- */

function createProjects(card) {
  return card.items.map(p => `
    <div class="card project-card">
      <a href="${p.url}" class="project-item-single">
        <div class="project-header">
          <span class="project-name">${p.name}</span>
        </div>

        <p class="project-description">${p.description}</p>

        <div class="project-tags">
          ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </a>
    </div>
  `).join('');
}

/* ---------------- IMAGE ---------------- */

function createImage(card) {
  const bg = card.image;
  const linkStart = card.url ? `<a href="${card.url}" class="image-card-link">` : "";
  const linkEnd = card.url ? `</a>` : "";

  return `
    <div class="card image-card" style="background-image: url('${bg}')">
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

/* ---------------- CARD RENDER SYSTEM ---------------- */

const cardRenderers = {
  hero: (card, config) => createHero(config.profile),

  links: (card) => createLinks(card),

  projects: (card) => createProjects(card),
  
  image: (card) => createImage(card),
};

/* ---------------- INIT ---------------- */

async function init() {
  const config = await loadConfig();
  const grid = document.querySelector('.bento-grid');

  if (config.theme) {
    applyTheme(config.theme);
  }

  if (config.seo) {
    applySEO(config.seo);
  }

  if (!config.cards) {
    console.error("cards zorunlu!");
    return;
  }

  const html = config.cards
    .map(card => {
      const renderer = cardRenderers[card.type];

      if (!renderer) {
        console.warn("Unknown card type:", card.type);
        return "";
      }

      return renderer(card, config);
    })
    .join('');

  grid.innerHTML = html;
}

init();