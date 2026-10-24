# RAMACH SYSTEMS — Connected Built World

**Live site:** https://maxlightner.github.io/ramach-systems/

Corporate presentation with a dark, outlined two-line RAMACH / SYSTEMS wordmark drawn as SVG strokes; a depth-aware 3D camera that approaches each story node, reveals its copy after arrival, and returns to the central microchip for the closing brand beat, custom chapter glyphs, an owned-product strip, and a single central CTA, moving product ticker and narrow footer; the callback form opens only when the CTA is activated.

## Editorial / visual language
Eight chapters each identify a specific building-industry problem, where it occurs, and which RAMACH product or technology addresses it. Future initiatives are explicitly presented as future development, not completed functionality. Seven story nodes follow a deliberate 3D camera choreography: each approach changes camera position and distance, eases to a stop at the node, and reveals the associated text after arrival. At the end, the camera returns to the central microchip and a two-line RAMACH SYSTEMS title appears before the final screen. The final screen has a moving product ticker, one central CTA and a narrow utility footer. The callback form opens as a dialog and does not store or transmit numbers unless `VITE_CONTACT_ENDPOINT` is configured. The camera translates along a spline without alternating orbit or abrupt height changes.

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
