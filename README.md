<p align="center">
  <img width="100px" src="assets/img/logo.png" />
  <h1 align="center">Wall</h1>
</p>

<p align="center">
  Wall is a modular, YAML-driven Bento Grid portfolio engine.
</p>

Wall is a fully configurable, static-first Bento Grid engine. It turns YAML into a modern UI without frameworks or backend dependencies.

---

## Features

Wall is designed to be minimal in concept but powerful in composition.

* **YAML-driven architecture**
  Build entire portfolios using only a single `config.yaml` file.

* **Static-first rendering**
  No backend, no database. Everything runs in the browser.

* **Modular Bento Grid system**
  Each section (hero, links, projects, images) is a reusable card module.

* **Theme customization**
  Fully customizable design tokens via YAML (colors, radius, typography).

* **SEO ready**
  Dynamic meta tag generation (Open Graph, Twitter main, favicon support).

* **Extensible card system**
  Easily add new card types via a simple renderer map.

* **Responsive by design**
  Works seamlessly across desktop, tablet, and mobile layouts.

---

## Screenshot

![Wall](assets/img/example.png)

---

## How It Works

Wall reads a single configuration file (`config.yaml`) and dynamically generates a complete Bento Grid layout.

1. Loads configuration via `fetch`
2. Parses YAML using `jsyaml`
3. Applies theme variables to CSS root
4. Injects SEO metadata dynamically
5. Renders main based on their `type`
6. Mounts everything into `.bento-grid`

---

## Example Config Structure

```yaml
profile:
  name: Arda
  title: Developer
  description: Building minimal and fast web experiences.
  avatar: assets/avatar.png
  socials:
    - name: github
      url: https://github.com/username

theme:
  background: "#0f0f0f"
  foreground: "#ffffff"
  radius: "16px"

main:
  - type: hero
  - type: links
    title: Links
    items:
      - name: GitHub
        url: https://github.com
        icon: bxl-github
```

---

## Future Plans

Wall is still actively under development. The long-term goal is to keep it:

* online 
* ultra-lightweight
* dependency-free
* fully declarative
* and easy to deploy anywhere (GitHub Pages, Vercel, Netlify)

Planned improvements include:

* animation system for card transitions
* markdown-supported project descriptions
* plugin-based card extensions
* better layout presets (masonry, dense, asymmetric grids)
* drag and drop grid editor
* live YAML editor (CMS mode)

---

## License

MIT © Arda
[http://aardaakpinar.github.io](http://aardaakpinar.github.io)