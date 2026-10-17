# Copilot Instructions for Burke Holland's Blog

## Project Overview

Jekyll blog deployed with GitHub Pages from the `gh-pages` branch. The whole site is designed as a thermal receipt printer (the "BH-80"): a printer header with three keys (POSTS, PROJECTS, ABOUT) and one paper receipt per page. Lines "print" one at a time, images are dithered like thermal print, and moving to another page tears the receipt off and prints a new one.

## Architecture

- **`_layouts/default.html`** - every page: `head.html`, the SVG thermal filter, the printer header, and `<main id="feed"><article class="paper" data-receipt>`.
- **`_layouts/home.html`** - the posts receipt (all posts grouped by year, read times, totals).
- **`_layouts/post.html`** - a single post receipt (item number, dept, read time, body, newer/older links).
- **`about.html`, `projects.html`, `404.html`, `staging/index.html`** - the other receipts.
- **`_data/projects.yml`** - the projects list. Add a project here, not in the HTML.
- **`_includes/`** - `head.html` (meta/OG tags), `printer.html` (header + keys), `thermal-filter.html`, `barcode.html`, `center.html`, `youtubePlayer.html`.
- **`assets/css/receipt.css`** - all styles. No Tailwind, no frameworks.
- **`assets/js/printer.js`** - printing, tear-off page transitions (fetches the next page and swaps the `.paper`), image tap-to-reveal, REPRINT.

## Receipt markup rules

- Anything that should print line by line gets the class `line`. In post bodies (`.body`), JS adds `line` to every direct child, so Markdown needs nothing special.
- Lines are only hidden when JS runs (`html.js`), so the site still reads fine without JS.
- Helpers: `.center`, `.big`, `.muted`, `.small`, `.row` (left/right columns), `.dept` (section heading), `.item` (clickable row), `<hr class="rule">` (dashed divider), `{% include barcode.html code="..." %}`.
- `[data-now]` and `[data-order]` get filled with the reader's current time and an order number.

## Blog Post Conventions

```yaml
---
title: "Post Title"
date: YYYY-MM-DD HH:MM:SS +0000
categories: posts
permalink: /posts/slug-name/
dept: ai   # ai, tools, cloud, javascript or life - printed on the receipt
---
```

- `layout: post` is applied automatically by `defaults` in `_config.yml`.
- Never change an existing post's `permalink` - old URLs must keep working.
- Read time is computed from word count (200 words per minute).
- Optional `image:` front matter prints as the first image and is used for social cards.
- YouTube: `{% include youtubePlayer.html id="VIDEO_ID" %}`. Images live in `/assets/`.

## Development Commands

```bash
bundle install
bundle exec jekyll serve
bundle exec jekyll build
```
