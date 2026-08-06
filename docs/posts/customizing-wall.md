---
title: Customizing Your Wall Portfolio
description: Learn how to personalize your Wall portfolio with themes and layouts.
date: 2026-06-02
---

# Customizing Your Wall Portfolio

One of the biggest advantages of Wall is how easy it is to personalize.

Because everything is configuration-based, you can redesign your portfolio without changing application logic.

## Editing the Layout

The main layout is controlled directly from your YAML file.

You can reorder cards like this:

```yaml
main:
  - type: hero
  - type: image
  - type: links
````

This makes experimentation extremely fast.

## Using Different Card Types

Wall supports multiple card components, including:

* hero cards
* project links
* blog cards
* image cards
* titles
* custom sections

You can combine them to create unique layouts for different projects or personal brands.

## Adding Images

Image cards help make portfolios feel more dynamic.

Example:

```yaml
- type: image
  image: assets/images/project.png
  alt: Project Preview
```

Large preview images work especially well in Bento layouts.

## Personalizing Themes

Wall uses CSS variables, making themes easy to customize.

You can modify:

* background colors
* text colors
* border radius
* spacing
* shadows

without touching component logic.

## Writing Blog Posts

Blog posts are powered by Markdown files.

This allows you to:

* write using simple syntax
* keep content separate from layout
* publish articles quickly

Each blog card can open a full markdown article inside a modal.