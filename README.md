<div align="center">
  <img width="100px" src="docs/images/logo.png" alt="Wall logo" />
  <h1>Wall</h1>
  <p><strong>A static and modular Bento Grid portfolio system powered by YAML</strong></p>
</div>

---

## Overview

**Wall** generates a modern portfolio interface from a single `config.yaml` file. No backend required, no framework needed, and the repo includes an optional build step for producing optimized JS/CSS assets.

**Full documentation lives in [`wiki`](https://github.com/aardaakpinar/wall/wiki)** - configuration reference, card types, theming, blog system, custom cards, and deployment guides.

![ScreenShot](/docs/images/screenshot.png)

---

## Quick Start

Create an `index.html` and a `config.yaml` in your project folder:

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Portfolio - Your Name</title>
	</head>
	<body>
		<script type="module" src="https://cdn.jsdelivr.net/gh/aardaakpinar/wall@v1.0.0/public/main.js"></script>
	</body>
</html>
```

Then deploy `index.html` + `config.yaml` to GitHub Pages, Netlify, Vercel, or any static host.

See **[Configuration Reference](https://github.com/aardaakpinar/wall/wiki/Configuration)** for how to write `config.yaml`.


---

## License

MIT (c) Arda
[aardaakpinar.github.io](http://aardaakpinar.github.io)

Found a bug or have a feature idea? [Open an issue](https://github.com/aardaakpinar/wall/issues) or submit a pull request.
