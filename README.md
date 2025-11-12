# Hogwarts: Houses & Wizards

## Overview
- Dark-theme, multi-page Hogwarts fan site built entirely with AI-authored HTML, CSS, and JavaScript.
- Features searchable house and wizard directories, spoiler-aware summaries, and a combined historical timeline.
- Optimized for desktop and mobile with responsive layouts, accessible focus states, and lazy-loaded WebP imagery.

## Project Structure
```
.
├── 404.html
├── about.html
├── houses.html
├── index.html
├── timeline.html
├── wizards.html
├── assets
│   ├── css
│   │   ├── styles.css
│   │   └── styles.min.css
│   ├── img
│   │   ├── favicon.webp
│   │   ├── house-gryffindor.webp
│   │   ├── house-hufflepuff.webp
│   │   ├── house-ravenclaw.webp
│   │   ├── house-slytherin.webp
│   │   ├── sparkle.svg
│   │   ├── wizard-albus-dumbledore.webp
│   │   ├── wizard-draco-malfoy.webp
│   │   ├── wizard-harry-potter.webp
│   │   ├── wizard-hermione-granger.webp
│   │   ├── wizard-luna-lovegood.webp
│   │   ├── wizard-minerva-mcgonagall.webp
│   │   ├── wizard-neville-longbottom.webp
│   │   ├── wizard-ron-weasley.webp
│   │   ├── wizard-rubeus-hagrid.webp
│   │   └── wizard-severus-snape.webp
│   └── js
│       ├── data.js
│       ├── data.min.js
│       ├── main.js
│       └── main.min.js
├── CHANGELOG.md
└── LICENSE
```

## Edited Files
- `index.html` — Home page with hero, featured section, global header/footer.
- `houses.html` — Houses directory with search and trait filter.
- `wizards.html` — Wizard cards with house/year filters and spoiler toggle.
- `timeline.html` — Accessible, collapsible event timeline.
- `about.html` — Project background, credits, and contact details.
- `404.html` — Themed not-found page with return CTA.
- `assets/css/styles.css` — Dark theme, responsive layouts, accessibility styling.
- `assets/css/styles.min.css` — Minified production stylesheet.
- `assets/js/data.js` — Structured Hogwarts house and wizard data model.
- `assets/js/data.min.js` — Minified data bundle.
- `assets/js/main.js` — Page interactivity, filters, spoiler logic, timeline rendering.
- `assets/js/main.min.js` — Minified application script.
- `assets/img/*.webp` — Lightweight placeholder imagery for houses, wizards, and favicon.
- `assets/img/sparkle.svg` — Decorative sparkle icon referenced in UI.
- `README.md` — Project documentation and run instructions.

## Run Locally
- Open `index.html` directly in any modern browser, or
- Serve the workspace via a simple static server (e.g., `python3 -m http.server`) and navigate to `http://localhost:8000`.

## Known Limitations
- Placeholder WebP imagery uses solid color blocks; replace with detailed art for production use.
- Social links and contact email contain placeholder handles (`your-username`, `your-email@example.com`) and should be personalized.
- Timeline content reflects curated highlights from the provided data sets; expand the data model for deeper coverage.