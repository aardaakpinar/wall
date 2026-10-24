<div align="center">
  <img width="100px" src="docs/images/logo.svg" alt="Wall logo" />
  <h1>Wall</h1>
  <p><strong>A static, modular Bento Grid portfolio powered by one YAML file</strong></p>
</div>

---

## Add Wall to your site

No installation, no build process. Add a script tag inside the <body>:

```html
<script type="module" src="https://cdn.jsdelivr.net/gh/aardaakpinar/wall@[VERSION]/src/main.js"></script>
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

Replace `@main` with a release tag to pin your site to a fixed version. Relative image paths in `config.yaml` load from your own site.

---

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
