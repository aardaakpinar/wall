<div align="center">
  <img width="100px" src="docs/images/logo.svg" alt="Wall logo" />
  <h1>Wall</h1>
  <p><strong>A static, modular Bento Grid portfolio powered by one YAML file</strong></p>
  <p><a href="https://aardaakpinar.github.io/wall/">Live preview</a></p>
</div>

---

## Add Wall to your site

No install, no build. Create an `index.html` with one script tag:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Portfolio - Your Name</title>
  </head>
  <body>
    <script type="module" src="https://cdn.jsdelivr.net/gh/aardaakpinar/wall@ma../src/main.js"></script>
  </body>
</html>
```

Then add a `config.yaml` next to it and upload both files to any static host (GitHub Pages, Netlify, Vercel).

```yaml
profile:
  name: Your Name
  title: What you do
  description: One or two sentences about you.

main:
  - type: hero
  - type: links
    items:
      - name: GitHub
        icon: bxl bx-github
        url: https://github.com/you
```

Replace `@main` with a release tag to pin your site to a fixed version. Relative image paths in `config.yaml` load from your own site. See the [wiki](https://github.com/aardaakpinar/wall/wiki) for every card type and theme option.

---

## Repository layout

```text
src/                     The engine, served to everyone through the CDN
  main.js                Entry point: loads the shared CSS, then app.js
  app.js                 Reads config.yaml and renders each card
  core/                  Shared code: config, yaml, markdown, html escaping, theme, component registry
  styles/                Shared CSS: design tokens, grid, card base
  components/            One folder per card type, each with its own JS and CSS
    hero/ image/ links/ projects/ title/ blog/
docs/                    The preview site published on GitHub Pages
  index.html             The preview itself
  components.html        Test page that shows every card type
```

## Components

Each card type is a self-contained component: a folder with a `.js` file and a `.css` file. The CSS is loaded only when a page uses that card.

```js
// src/components/quote/quote.js
import { defineComponent } from "../../core/component.js";
import { cardClass } from "../../core/card.js";
import { escapeHtml } from "../../core/html.js";

export default defineComponent({
  type: "quote", // the `type:` value in config.yaml
  styles: new URL("./quote.css", import.meta.url).href,
  render: (card) => `<blockquote class="${cardClass(card, "quote-card")}">${escapeHtml(card.text)}</blockquote>`,
  // optional: load(card, ctx) fetches data, mount(root, card, ctx, data) adds behavior
});
```

Then add it to the list in `src/components/index.js`. Long text can use the `justify` class to be set justified and hyphenated, like an official document.

## Development

Nothing to install. Serve the repository root and open `docs/`:

```bash
python3 -m http.server 8000
# http://localhost:8000/docs/
# http://localhost:8000/docs/components.html
```

On localhost the preview runs the code in `src/`. On GitHub Pages it loads Wall from the CDN, the same way your visitors do.

## Publishing the preview

In the repository, open **Settings > Pages**, choose **Deploy from a branch**, then pick the `main` branch and the `/docs` folder.

---

## License

MIT (c) Arda
[aardaakpinar.github.io](http://aardaakpinar.github.io)

Found a bug or have a feature idea? [Open an issue](https://github.com/aardaakpinar/wall/issues) or submit a pull request.
