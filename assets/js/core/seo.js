export function applySEO(seo) {
  if (!seo) return;

  if (seo.title) {
    document.title = seo.title;
  }

  const setMeta = (name, content, attr = "name") => {
    if (!content) return;

    let el = document.querySelector(`meta[${attr}="${name}"]`);

    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }

    el.setAttribute("content", content);
  };

  const setLink = (rel, href) => {
    if (!href) return;

    let el = document.querySelector(`link[rel="${rel}"]`);

    if (!el) {
      el = document.createElement("link");
      el.setAttribute("rel", rel);
      document.head.appendChild(el);
    }

    el.setAttribute("href", href);
  };

  setMeta("description", seo.description);
  setMeta("keywords", seo.keywords);

  setLink("icon", seo.favicon);
  setLink("apple-touch-icon", seo.favicon);

  setMeta("og:title", seo.title, "property");
  setMeta("og:description", seo.description, "property");
  setMeta("og:image", seo.image, "property");
  setMeta("og:url", seo.url, "property");
  setMeta("og:type", "website", "property");

  setMeta("twitter:card", "summary_large_image");
  setMeta("twitter:title", seo.title);
  setMeta("twitter:description", seo.description);
  setMeta("twitter:image", seo.image);
}