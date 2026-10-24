# RAMACH SYSTEMS — Connected Built World

**Live site:** https://maxlightner.github.io/ramach-systems/

Corporate presentation with a dark, single-line SVG RAMACH SYSTEMS drawing; a persistent scroll-driven 3D environment and a flat, final contact call to action.

## Editorial / visual language
Eight chapters each identify a specific building-industry problem, where it occurs, and which RAMACH product or technology addresses it. Future initiatives are explicitly presented as future development, not completed functionality. Six widely separated 3D nodes are symbolic minimalist sculptures, not toy rooms or miniature metaverse scenes. The central intelligence core connects the nodes with precise chamfered circuit paths, running gold outbound and teal return light pulses.

Chapter copy is normal accessible HTML/CSS, never 3D labels. The opposite side of the frame is reserved for the 3D object. Scroll sets target progress; easing drives reversible camera movement without raw mouse-wheel jumps.

**Hard typography constraint:** no authored text smaller than **9 CSS px** across desktop and mobile. The automated test audits authored CSS font sizes; UX also favors substantially larger readable editorial text.

## Stack / deployment
Vite + TypeScript + Three.js, GitHub Pages through GitHub Actions. Responsive, progressive lazy-load of the single WebGL scene. All assets are generated with native geometry; no external GLB downloads, backend or logins.

```sh
npm ci
npm test
npm run build
npm run dev
```

Changes to main run tests, build and deploy via existing GitHub Pages workflow. Later milestones will integrate the three application subdomains and live Blender/mobility services, separately from this corporate site.
