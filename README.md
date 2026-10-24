# RAMACH SYSTEMS

Interactive architectural-technology brand website.

**Website:** https://maxlightner.github.io/ramach-systems/

## Direction

- The opening is a quiet, flat architectural-line RAMACH mark: no 3D scene in the first viewport.
- The first scroll reveals a **persistent, art-directed Three.js world** with five recognizable zones: architecture studio, construction site, owner oversight, data center, finance/operations.
- The camera travels through a timeline controlled by **scroll in both directions**. Raw wheel delta never drives the camera. Frame-rate independent exponential damping produces soft, reversible movement.
- Text is regular HTML/CSS on top of the scene, not 3D meshes. Typography is at least **9 CSS pixels** across breakpoints.
- Final contact/CTA is the **only full-width static section after the 3D narrative**.

## Stack

TypeScript / Vite / Three.js, static GitHub Pages build. No backend, accounts, live app links, Blender bridges or streaming in this phase.

```bash
npm ci
npm test
npm run build
npm run dev
```

GitHub Actions publishes the Vite output on pushes to main. Do not change the Pages base unless the custom domain is configured.

## Components

- `src/main.ts` — editorial story, flat copy, scroll damping, chapter transitions
- `src/scene/world.ts` — 3D world, sculptural central hub, architectural mini-environments, paths and reversible camera choreography
- `src/styles.css` — brand art direction, intro line drawing, cinematic overlays, CTA and responsive layout

The 3D objects are **stylized, procedural concept art**. They are not detailed photorealistic site assets or production digital twins. The phase does not connect real projects or users.

## Performance

Lazy scene import when approaching the interactive section; capped pixel ratio on desktop and mobile; no external 3D model downloads; supports reduced-motion settings; canvas rendering is skipped when narrative is outside the viewport.

## Next

Replace the temporary GitHub Discussions contact with verified business contact. In later phases add site pages, high-fidelity 3D assets, product links and separate application subdomains after their production endpoints are verified.
