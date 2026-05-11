import { loadConfig } from "./core/config.js";
import { applyTheme } from "./core/theme.js";
import { cardRenderers } from "./core/render.js";
import { createLayout, createFooter } from "./core/layout.js";

async function init() {
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