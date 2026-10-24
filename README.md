# RAMACH SYSTEMS — Connected Built World

**Live site:** https://maxlightner.github.io/ramach-systems/

Corporate presentation with a dark, outlined two-line RAMACH / SYSTEMS wordmark drawn as SVG strokes; a depth-aware 3D camera that approaches each chapter mark, settles, then reveals the matching copy, custom chapter glyphs, an owned-product strip, and a compact callback form.

## Editorial / visual language
Eight chapters each identify a specific building-industry problem, where it occurs, and which RAMACH product or technology addresses it. Future initiatives are explicitly presented as future development, not completed functionality. Seven story nodes follow a deliberate 3D camera choreography: each approach changes camera position and distance, eases to a stop at the node, and reveals the associated text only after the camera settles. The camera follows reversible quadratic paths with a small vertical arc rather than a flat pan. A small central microchip connects directly to the nodes through thin chamfered circuit paths with restrained gold outbound and teal return pulses. The camera translates along a spline without alternating orbit or abrupt height changes.

Chapter copy is normal accessible HTML/CSS, never 3D labels. The opposite side of the frame is reserved for the 3D object. Scroll progress selects the same eight beats used by the editorial copy. Camera focus transitions are centered on chapter boundaries; node halos emphasize the corresponding story beat.

**Hard typography constraint:** no authored text smaller than **13 CSS px** across desktop and mobile. The automated test audits authored CSS font declarations (including declarations without trailing semicolons); UX favors substantially larger readable editorial text. The callback form validates numbers but does not store or transmit them unless `VITE_CONTACT_ENDPOINT` is configured.

## Stack / deployment
Vite + TypeScript + Three.js, GitHub Pages through GitHub Actions. Responsive, progressive lazy-load of the single WebGL scene. All assets are generated with native geometry; no external GLB downloads, backend or logins.

```sh
npm ci
npm test
npm run build
npm run dev
```

Changes to main run tests, build and deploy via existing GitHub Pages workflow. Later milestones will integrate the three application subdomains and live Blender/mobility services, separately from this corporate site.
