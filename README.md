<p align="center">
  <img width="100px" src="assets/img/logo.png" alt="Wall logo" />
  <h1 align="center">Wall</h1>
</p>

<p align="center">
  A static and modular Bento Grid portfolio system powered by YAML.
</p>

Wall generates a modern portfolio interface from a single `config.yaml` file. It requires no backend, build step, or framework. The page runs in the browser, reads the YAML file, builds the cards, and applies themes using CSS variables.

---

## Features

The content of the page is defined through several key sections in `config.yaml`:

* **`profile`:** Contains the name, title, description, avatar, and social links shown in the hero card.
* **`main`:** Defines the card flow of the page. The order of cards follows the YAML list order.
* **`type`:** Determines which card renderer is used for each `main` item. Currently supports `hero`, `links`, `projects`, `image`, and `title`.
* **`links.items`:** Defines quick links using `name`, `url`, and Boxicons `icon` classes.
* **`projects.items`:** Defines feature/project/content cards using `name`, `description`, `url`, and optional `tags`.
* **`image`:** Adds image cards with `image`, `alt`, and optional `url`.
* **`title`:** Creates section separator headings inside the grid.
* **`theme`:** Maps color and radius values from YAML to CSS variables.
* **`footer.enabled`:** Enables or disables the default Wall footer.
* **CDN support:** CSS and JS files can be loaded via jsDelivr, allowing deployment with only `index.html` and `config.yaml`.
* **HTML meta management:** SEO, Open Graph, Twitter Card, canonical, and favicon tags are managed directly in `index.html`, not YAML.

---

## Screenshot

![Wall](assets/img/example.png)

---

## How It Works

1. `index.html` loads the Wall JS file as an ES module (local or CDN version).
2. `loadConfig()` fetches `config.yaml` and parses it using `js-yaml`.
3. `applyTheme()` maps theme values to CSS variables if defined.
4. `createLayout()` builds the `.container` and `.bento-grid` structure.
5. Each item in `config.main` is rendered via the appropriate function in the `cardRenderers` map.
6. The generated HTML is injected into the grid.
7. If `footer.enabled` is not false, the default Wall footer is added.

> Note: Since `config.yaml` is loaded via `fetch`, you must run the project on a local server instead of opening it directly with `file://`.

---

## Quick Usage with HTML

You can use Wall via CDN without copying the project. You only need an `index.html` and a `config.yaml` file in the same directory.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Update SEO and sharing metadata here -->
  <title>Site Title</title>
  <meta name="description" content="Site description">
  <meta name="keywords" content="portfolio, bento, personal site">
  <meta name="author" content="Your Name">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="#0f0f0f">

  <link rel="canonical" href="https://example.com/">

  <meta property="og:type" content="website">
  <meta property="og:title" content="Site Title">
  <meta property="og:description" content="Site description">
  <meta property="og:url" content="https://example.com/">
  <meta property="og:image" content="https://example.com/preview.png">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Site Title">
  <meta name="twitter:description" content="Site description">
  <meta name="twitter:image" content="https://example.com/preview.png">

  <link rel="icon" href="favicon.png">

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/aardaakpinar/wall@v0.0.1/assets/css/style.css">
</head>
<body>
  <script src="https://cdn.jsdelivr.net/npm/js-yaml@4/dist/js-yaml.min.js"></script>
  <script type="module" src="https://cdn.jsdelivr.net/gh/aardaakpinar/wall@v0.0.1/assets/js/app.js"></script>
</body>
</html>
```

This approach is ideal for fast deployment. All content and theme settings come from `config.yaml`, while meta tags remain in HTML for better SEO and social preview support.

CDN URLs:

```text
https://cdn.jsdelivr.net/gh/aardaakpinar/wall@v0.0.1/assets/css/style.css
https://cdn.jsdelivr.net/gh/aardaakpinar/wall@v0.0.1/assets/js/app.js
```

---

## Project Structure

```text
.
├── index.html
├── config.yaml
├── assets/
│   ├── css/
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── style.css
│   │   └── components/
│   ├── img/
│   └── js/
│       ├── app.js
│       ├── core/
│       └── components/
└── README.md
```

`assets/style.css` contains the legacy single-file stylesheet. The current build uses `assets/css/style.css`.

---

## Running Locally

No installation is required. Any static server will work:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

You can also use VS Code Live Server, GitHub Pages, Netlify, or Vercel.

---

## Config Example

```yaml
profile:
  name: Wall Engine
  title: YAML-Based Bento Grid System
  description: >
    Wall is a fully configurable, static-first Bento Grid engine.
  avatar: assets/img/logo.png
  socials:
    - name: github
      url: https://github.com/aardaakpinar/wall

theme:
  light:
    background: "#fafafa"
    foreground: "#0f0f0f"
    card: "#ffffff"
    cardForeground: "#0f0f0f"
    primary: "#7c3aed"
    primaryForeground: "#ffffff"
    muted: "#f4f4f5"
    mutedForeground: "#525252"
    border: "#e5e5e5"
    radius: "16px"

  dark:
    background: "#0f0f0f"
    foreground: "#fafafa"
    card: "#171717"
    cardForeground: "#fafafa"
    primary: "#a78bfa"
    primaryForeground: "#18181b"
    muted: "#262626"
    mutedForeground: "#a3a3a3"
    border: "#262626"
    radius: "16px"

main:
  - type: hero

  - type: links
    title: Project Links
    items:
      - name: Live Demo
        url: https://aardaakpinar.github.io/wall
        icon: bx bx-link

  - type: image
    image: https://picsum.photos/800/500
    alt: Wall Bento Grid Preview
    url: https://github.com/aardaakpinar/wall

  - type: title
    text: Features

  - type: projects
    items:
      - name: YAML Driven UI
        description: Everything is controlled via a single config.yaml file.
        url: https://github.com/aardaakpinar/wall

      - name: Bento Grid Engine
        description: Responsive grid system inspired by modern UI design.
        url: https://github.com/aardaakpinar/wall
        tags:
          - YAML
          - Static

footer:
  enabled: true
```

---

## Supported Card Types

### `hero`

Displays profile information from the `profile` section.

```yaml
profile:
  name: Arda
  title: Developer
  description: Minimal web experiences.
  avatar: assets/img/avatar.png
```

### `links`

Creates a titled list of links.

```yaml
- type: links
  title: Links
  items:
    - name: GitHub
      url: https://github.com
      icon: bx bxl-github
```

### `projects`

Creates individual cards for each item. Useful for projects, features, or services. `tags` are optional.

```yaml
- type: projects
  items:
    - name: Project Name
      description: Short project description.
      url: https://example.com
      tags:
        - JavaScript
        - CSS
```

### `image`

Creates an image-based card. If `url` is provided, the card becomes clickable.

```yaml
- type: image
  image: assets/img/example.png
  alt: Preview
  url: https://example.com
```

### `title`

Creates a full-width section header inside the grid.

```yaml
- type: title
  text: Projects
```

---

## Theme System

The `theme` section defines light and dark design tokens. Wall automatically applies the correct mode based on the user’s system preference:

```yaml
theme:
  light:
    background: "#fafafa"
    foreground: "#0f0f0f"
    card: "#ffffff"
    cardForeground: "#0f0f0f"
    primary: "#7c3aed"
    primaryForeground: "#ffffff"
    muted: "#f4f4f5"
    mutedForeground: "#525252"
    border: "#e5e5e5"
    radius: "16px"

  dark:
    background: "#0f0f0f"
    foreground: "#fafafa"
    card: "#171717"
    cardForeground: "#fafafa"
    primary: "#a78bfa"
    primaryForeground: "#18181b"
    muted: "#262626"
    mutedForeground: "#a3a3a3"
    border: "#262626"
    radius: "16px"
```

Each mode supports `background`, `foreground`, `card`, `cardForeground`, `primary`, `primaryForeground`, `muted`, `mutedForeground`, `border`, and `radius`. These map to CSS variables used throughout the UI.

---

## Adding a New Card Type

1. Add a new component file under `assets/js/components/`.
2. Write a function that returns an HTML string.
3. Import it in `assets/js/core/render.js`.
4. Add it to the `cardRenderers` map using a new `type`.
5. Optionally add styles under `assets/css/components/` and import them in `assets/css/style.css`.

---

## License

MIT © Arda
[http://aardaakpinar.github.io](http://aardaakpinar.github.io)