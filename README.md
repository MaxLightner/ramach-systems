# RAMACH SYSTEMS — Cinematic Connected Architecture

[Published website](https://maxlightner.github.io/ramach-systems/)

**Stack:** TypeScript · Three.js · Vite · GitHub Pages.

## Design and behavior

The opening uses a *dark, otherwise empty* viewport. Actual architectural line strokes trace the six letterforms **RAMACH** before the systems caption appears. Navigation is not shown over the opening.

As the visitor scrolls, a persistent real-time Three.js environment appears. The five physical environments (architectural studio, active construction site, owner oversight, data center, finance/operations) are deliberately widely separated and connected to the central RAMACH hub by illuminated, **bi-directional** data routes.

Scroll position determines narrative target; an independent, frame-rate compensated damping function eases the virtual camera to that position. Reverse scrolling reverses camera travel. Flat HTML narrative headings and explanations crossfade over the viewport; camera framing places the model on the opposite side of the text on desktop. The closing call to action is flat.

No authored CSS text is below **10 CSS pixels**.

Models are intentionally stylized minimalist geometry, not photorealistic GLB assets. Current phase does **not** connect applications, authenticate users, stream live project data, or operate a real backend.

## Build and deployment

```bash
npm ci
npm test
npm run build
npm run dev
```

Pushes to `main` run tests, build Vite and deploy using the existing GitHub Pages Actions workflow. For custom domains, revise `BASE_PATH` and verified DNS configuration.

## Main modules

- `src/main.ts`: editorial story, SVG line-writing, scroll damping, navigation and chapter transitions
- `src/scene/world.ts`: world geometry, architecture vignettes, light flows, opposing camera compositions
- `src/styles.css`: luxury brand art direction, responsive typography, opening/closing experiences

## Next phase

Visual QA on multiple devices; if needed, replace procedural models with bespoke art-directed meshes; later integrate app subdomains and authenticated 3D sessions separately. Contact currently points to GitHub Discussions until official company contact details are supplied.
