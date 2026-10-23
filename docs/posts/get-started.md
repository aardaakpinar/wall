---
title: Add Wall to your site in three steps
description: One script tag, one YAML file. No install, no build.
date: 2026-10-24
tags: setup, quick start
---

# Add Wall to your site in three steps

Wall runs straight in the browser. There is nothing to install and nothing to build.

## 1. Create index.html

Add a single script tag to an empty page:

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

## 2. Create config.yaml

Put it next to `index.html`. Every card on the page is one entry in `main`:

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

## 3. Publish

Upload both files to GitHub Pages, Netlify, Vercel, or any static host. To try it on your computer, run a local server such as `python3 -m http.server`, because browsers block `config.yaml` on `file://` pages.

## Good to know

- Images and avatars with a relative path are loaded from your own site.
- Replace `@main` with a release tag to keep your site on a fixed version.
- Open the [component test page](components.html) to see every card type.
