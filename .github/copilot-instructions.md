# Copilot Instructions for Burke Holland's Blog

## Project Overview

This is a Jekyll-based personal blog deployed via GitHub Pages. The site uses a modern theming system with Tailwind CSS loaded via CDN and features multiple switchable themes.

## Architecture

### Jekyll Structure
- **`_posts/`** - Published blog posts (format: `YYYY-MM-DD-slug.md`)
- **`_drafts/`** - Unpublished posts (same format, not date-dependent)
- **`_layouts/`** - Page templates (`default.html`, `home.html`, `post.html`)
- **`_includes/`** - Reusable partials (`head.html`, `pagination.html`, `youtubePlayer.html`)
- **`assets/`** - Static files (images, CSS)
- **`_site/`** - Generated output (do not edit directly)

### Theming System
The site uses CSS custom properties for theming, defined in `assets/css/themes.css`. Themes are applied via body classes (e.g., `theme-neon-glass`, `theme-terminal`). The theme switcher logic is in [_includes/head.html](_includes/head.html) and persists selection to localStorage.

Key theme variables:
- `--bg-color`, `--text-color`, `--accent-color`
- `--font-main`, `--font-header`, `--font-mono`

### Styling Approach
- **Tailwind CSS** via CDN with typography and aspect-ratio plugins
- Custom Tailwind config in [_includes/head.html](_includes/head.html) extends theme colors and fonts
- Prose classes handle blog post typography: `prose prose-lg prose-invert`
- Neon color utilities: `text-neon-cyan`, `text-neon-pink`, `bg-white/10`

## Blog Post Conventions

### Front Matter (required)
```yaml
---
layout: post
title: "Post Title"
date: YYYY-MM-DD HH:MM:SS +0000
categories: posts
permalink: /posts/slug-name/
---
```

### Embedding Content
- **YouTube videos**: `{% include youtubePlayer.html id="VIDEO_ID" %}`
- **Images**: Store in `/assets/` and reference as `/assets/image-name.png`

## Development Commands

```bash
# Install dependencies
bundle install

# Run local server with drafts visible
bundle exec jekyll serve --drafts

# Build for production
bundle exec jekyll build
```

## Key Conventions

1. **Post URLs** use `/posts/slug-name/` permalink format (not the default Jekyll date-based URLs)
2. **Pagination** is configured for 5 posts per page via `jekyll-paginate`
3. **Code highlighting** uses Rouge with Kramdown markdown processor
4. **Responsive design** disables CSS transforms on mobile (see `head.html` media queries)

## API Directory

The `/api/` folder contains scaffolding for Azure Functions but is currently empty/unused. Ignore for most tasks.

## When Writing Posts

- Use descriptive, kebab-case slugs in the permalink
- Keep images optimized and stored in `/assets/`
- Test locally with `--drafts` flag before publishing
- Move posts from `_drafts/` to `_posts/` with correct date prefix to publish
