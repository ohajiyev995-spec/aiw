# Hogwarts: Houses & Wizards

## Project Purpose
- Deliver an accessible, dark-themed Hogwarts companion that catalogs houses, notable wizards, and shared timelines.
- Demonstrate an AI-driven build workflow where every change—from layout to data modeling—was produced programmatically.
- Provide interactive exploration tools that respect spoiler preferences while remaining mobile-first.

## Pages
- `index.html` — Hero landing with featured house and wizard highlights.
- `houses.html` — Filterable grid of house profiles, traits, founders, and lore.
- `wizards.html` — Searchable roster with house/year filters and spoiler-aware summaries.
- `timeline.html` — Chronological event stream combining house milestones and wizard achievements.
- `about.html` — Project background, credits, and contact details.
- `404.html` — Themed not-found page pointing visitors back to safety.

## How to Run Locally
- Open `index.html` directly in a modern browser, or
- Serve the project with a static server (example: `python3 -m http.server 8000`) and browse to `http://localhost:8000`.

## Tech Notes
- **Fonts:** Google Fonts `Cinzel Decorative` for headings and `Inter` for body copy (`font-display: swap`).
- **Accessibility:** Skip-to-content link on every page, focus outlines, keyboard-friendly navigation, aria-current states, and targeted spoiler masking.
- **Performance:** Minified assets (`styles.min.css`, `data.min.js`, `main.min.js`), deferred scripts, lazy-loaded WebP placeholders, and consistent color variables for reuse.
- **Packaging:** Production-ready files mirrored under `dist/` with a distributable archive at `release/hogwarts-houses-wizards.zip` for static hosting.
