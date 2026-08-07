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

Wall uses the popular **marked** library to convert Markdown into HTML.

Although rendering errors are uncommon, the system is designed to recover gracefully if parsing fails.

Instead of displaying a broken page, Wall escapes the raw text and converts paragraph breaks into HTML paragraphs. The formatting may be simpler, but the content remains readable and, most importantly, the page never crashes because of a malformed Markdown file.

## Security Comes First

Rendering user-generated content always requires careful handling.

Before any content from `config.yaml` or Markdown files is injected into the DOM, Wall processes it through a set of helper utilities located in `src/scripts/core/html.js`.

These utilities are responsible for:

* Escaping HTML characters.
* Escaping HTML attribute values.
* Safely handling CSS URLs.
* Rejecting unsafe URLs such as `javascript:` and `data:` schemes.
* Sanitizing rendered blog HTML before it reaches the browser.

The `sanitizeHtml()` helper specifically removes potentially dangerous elements such as `script`, `iframe`, `object`, `embed`, `link`, and `meta` tags. It also strips every inline event handler (`on*`) and removes unsafe `href` and `src` values.

This provides solid protection against common XSS and link injection attacks while keeping the implementation lightweight. Since the sanitizer intentionally focuses on the most common attack vectors, blog content should still come from trusted sources whenever possible.

## Resolving Asset URLs Automatically

Wall also simplifies the way static assets are referenced.

The `resolvePackageUrl()` helper converts relative asset paths into absolute URLs based on the package's runtime location. This applies to profile avatars, image cards, and any other asset that relies on relative paths.

The behavior is straightforward:

* Empty paths are returned unchanged.
* External URLs (`http://`, `https://`, or protocol-relative URLs) are preserved.
* Anchor links beginning with `#` remain untouched.
* All other relative paths are resolved against the package's base URL.

The base URL itself is determined automatically at runtime.

When Wall is loaded from a built distribution, the loader calculates the correct base directory differently than when it's loaded directly from the source or a CDN. This allows the same configuration to work seamlessly across different deployment environments.

For projects that need additional control, developers can explicitly define `window.__WALL_PACKAGE_BASE_URL__`. During startup, Wall detects this value and uses it as the package base instead of relying on automatic detection.

## Final Thoughts

Wall's blog system is intentionally simple, but simplicity doesn't mean sacrificing quality.

By combining Markdown-based content, graceful error handling, built-in HTML sanitization, and automatic asset resolution, it provides a reliable blogging experience without introducing unnecessary complexity.

Whether you're building a personal portfolio, documentation site, or a fully static website, Wall offers a clean and developer-friendly foundation for publishing content while keeping both security and maintainability in mind.
