import { loadConfig } from "./core/config.js";
import { applyTheme } from "./core/theme.js";
import { applySEO } from "./core/seo.js";
import { cardRenderers } from "./core/render.js";

async function init() {
  const config = await loadConfig();

  const grid = document.querySelector(".bento-grid");

  if (config.theme) {
    applyTheme(config.theme);
  }

  if (config.seo) {
    applySEO(config.seo);
  }

  if (!config.main) {
    console.error("main zorunlu!");
    return;
  }

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
}

init();