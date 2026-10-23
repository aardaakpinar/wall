---
title: Markdown Blog System in Wall
description: Discover Wall's Markdown-based blogging system, offering a simple yet reliable publishing experience.
date: 2026-08-07
---

# Building a Simple, Secure, and Flexible Markdown Blog System in Wall

Managing a blog in a static website often means choosing between heavyweight CMS solutions and overly simplistic Markdown renderers. Wall takes a different approach by providing a lightweight blog system that is easy to maintain while still prioritizing security, reliability, and developer experience.

Let's take a closer look at how it works.

## Markdown-First Content

Every blog post in Wall is just a Markdown (`.md`) file. The blog component loads each file referenced in `items[].url`, extracts its metadata, and renders the content automatically.

Posts can optionally include a frontmatter block:

```yaml
---
title: Post Title
description: Short description
date: 2026-06-02
tags: tag1, tag2, tag3
---
```

These fields are used throughout the interface:

* **Title** becomes the post heading.
* **Description** is displayed as a preview on the blog card.
* **Date** appears as a small label to help readers identify when the post was published.
* **Tags** are split into individual badges for easier categorization.

If a post doesn't include frontmatter, that's perfectly fine. Wall simply treats the entire file as Markdown content and falls back to sensible default values for any missing metadata.

## From Blog Card to Reading Experience

The blog component does more than display a list of posts—it also provides a smooth reading experience.

Each card shows the publication date, title, description, and tags. When a reader clicks the card (or activates it with the keyboard using **Enter** or **Space**), the Markdown is converted into HTML, sanitized, and displayed inside a modal.

This allows users to read the article without leaving the current page. The modal can be dismissed either by clicking the close button or by clicking outside the content area.

Wall is also designed to be resilient. If loading a post fails—for example, because the Markdown file returns a 404—the failed post is simply removed from the list. The remaining posts continue to work normally without breaking the entire blog component.

Multiple blog components can even exist on the same page. Each instance receives its own unique identifier using `crypto.randomUUID()` (when available), ensuring they operate independently.

## Reliable Markdown Rendering

Wall ships its own small Markdown reader, so there is no dependency to install or update. It understands headings, paragraphs, lists, quotes, code blocks, links, images, bold, italic and inline code.

Every piece of text is escaped before it is turned into HTML. A raw `<script>` tag in a post is shown as text instead of running, and the page never crashes because of a malformed Markdown file.

## Security Comes First

Rendering user-generated content always requires careful handling.

Before any content from `config.yaml` or Markdown files is injected into the DOM, Wall processes it through a set of helper utilities located in `src/core/html.js`.

These utilities are responsible for:

* Escaping HTML characters.
* Escaping HTML attribute values.
* Safely handling CSS URLs.
* Rejecting unsafe URLs such as `javascript:` and `data:` schemes.
* Sanitizing rendered blog HTML before it reaches the browser.

The `sanitizeHtml()` helper specifically removes potentially dangerous elements such as `script`, `iframe`, `object`, `embed`, `link`, and `meta` tags. It also strips every inline event handler (`on*`) and removes unsafe `href` and `src` values.

This provides solid protection against common XSS and link injection attacks while keeping the implementation lightweight. Since the sanitizer intentionally focuses on the most common attack vectors, blog content should still come from trusted sources whenever possible.

## Assets Load From Your Site

Relative paths in `config.yaml`, such as the avatar or an image card, are resolved against the page that uses Wall. Put your pictures next to your own `index.html` and refer to them by name. External URLs (`http://`, `https://`, or protocol-relative) are left untouched.

## Final Thoughts

Wall's blog system is intentionally simple, but simplicity doesn't mean sacrificing quality.

By combining Markdown-based content, graceful error handling, built-in HTML escaping, and simple asset paths, it provides a reliable blogging experience without introducing unnecessary complexity.

Whether you're building a personal portfolio, documentation site, or a fully static website, Wall offers a clean and developer-friendly foundation for publishing content while keeping both security and maintainability in mind.
