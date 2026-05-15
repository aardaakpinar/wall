import { loadConfig } from "./core/config.js";
import { applyTheme } from "./core/theme.js";
import { cardRenderers } from "./core/render.js";
import { createLayout, createFooter } from "./core/layout.js";

const stylesheetUrl = new URL("../styles/main.css", import.meta.url);

function loadStylesheet(url) {
  const existingLink = document.querySelector(`link[rel="stylesheet"][href="${url.href}"]`);

  if (existingLink) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const link = document.createElement("link");

    link.rel = "stylesheet";
    link.href = url.href;
    link.onload = resolve;
    link.onerror = () => reject(new Error(`Stylesheet could not be loaded: ${url.href}`));

    document.head.appendChild(link);
  });
}

async function init() {
  await loadStylesheet(stylesheetUrl);

  const config = await loadConfig();

  if (config.theme) {
    applyTheme(config.theme);
  }
  
  if (!config.main) {
    console.error("main zorunlu!");
    return;
  }

  const { container, grid } = createLayout();

  const html = config.main
    .map(card => {
      const renderer = cardRenderers[card.type];

      if (!renderer) {
        console.warn("Unknown card type:", card.type);
        return "";
      }

      return renderer(card, config);
    })
    .join("");

  grid.innerHTML = html;

  const footer = createFooter(config);

  if (footer) {
    container.appendChild(footer);
  }
}

init();
