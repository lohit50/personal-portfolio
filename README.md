# Lohit — Portfolio

A minimal, spacious, single-page portfolio. No frameworks, no build step —
just hand-written HTML, CSS, and a small amount of vanilla JavaScript.

## Features

- **Parallax** hero and background layers driven by a single lerped
  `requestAnimationFrame` loop (`data-speed` attributes)
- **Scroll reveals** via `IntersectionObserver`, with per-element stagger delays
- **Elegant type** — self-hosted [Fraunces](https://fonts.google.com/specimen/Fraunces)
  (display serif) paired with [Inter](https://fonts.google.com/specimen/Inter) (text)
- Custom cursor, scroll-progress bar, marquee divider
- Fully responsive, and honors `prefers-reduced-motion`

## Structure

```
index.html          # the whole page
assets/style.css    # design tokens + all styles
assets/main.js      # parallax, reveals, cursor (no dependencies)
assets/fonts/       # self-hosted woff2 files
```

## Run locally

It's a static site — open `index.html` directly, or:

```sh
python3 -m http.server 8000
# → http://localhost:8000
```

## Deploy

Works as-is on GitHub Pages: Settings → Pages → deploy from `main`, root.
