export function createLayout() {
  const container = document.createElement("div");
  container.className = "container";

  const grid = document.createElement("main");
  grid.className = "bento-grid";

  container.appendChild(grid);
  document.body.appendChild(container);

  return {
    container,
    grid
  };
}

export function createFooter(config) {
  if (config.footer?.enabled === false) {
    return null;
  }

  const footer = document.createElement("footer");
  footer.className = "footer";

  footer.innerHTML = `
    <p>
      Built with
      <a href="https://github.com/aardaakpinar/wall" target="_blank">
        Wall
      </a>
    </p>
  `;

  return footer;
}