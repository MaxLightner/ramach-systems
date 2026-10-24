# RAMACH SYSTEMS

Persian-first, architectural technology homepage with a minimal real-time WebGL circuit board.

- **Live:** https://maxlightner.github.io/ramach-systems/
- **Stack:** TypeScript, Vite, Three.js. Static delivery; no server, user accounts, tracking or operational integrations.
- **Design:** charcoal green, warm mineral paper, copper light; local Vazirmatn and Manrope variable fonts.

## Development

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

Node 22.12+ or 24+. Dependencies and lockfile are committed. GitHub Actions builds/tests pushes to `main`, then uploads and deploys `dist` to GitHub Pages. Pull requests build/test without deploying. Pages source must be **GitHub Actions**.

## Modules

```text
src/
  config/ecosystem.ts   # Typed zone definitions and future product registry
  content/home.ts       # Company/service editorial content
  main.ts               # Semantic homepage and interaction state
  styles.css            # Responsive visual system
  scene/
    ecosystem.ts        # Renderer, camera, light, interaction, lifecycle
    board.ts            # Minimal processor, five modules, circuit traces and material system
docs/architecture.md    # Expansion decisions and boundaries
```

The five processor modules and animated traces illustrate the company's connected-ecosystem vision. They are **not a live project dashboard**. Product names are future connections, not active links. The homepage contains no photography or generated raster artwork; the hero is rendered entirely as interactive Three.js geometry.

## Interaction and performance

Drag horizontally to orbit; select a module using scene labels or accessible buttons below it. Reset restores the master view. Pause stops autonomous movement; reduced-motion preference pauses it initially and makes focus changes immediate. A quality toggle disables shadows and reduces pixel ratio. Mobile starts in this mode. Rendering suspends when the experience leaves the viewport or the tab is hidden. The simple board geometry avoids model downloads and expensive postprocessing. Three.js is loaded separately from the editorial page. If WebGL initialization fails, all company content and module explanations remain usable.

Fonts and geometry ship locally: no third-party runtime API, photograph or model download. Labels are local canvas textures. Font licenses are included through the npm font packages. Three.js is MIT licensed; see its bundled package license. Company identity and original site design are not assigned an open-source license by this repository.

## Deployment on another domain

`BASE_PATH=/ramach-systems/ npm run build` is used by Pages. The default relative base also supports a domain root. For a verified custom domain, configure DNS and Pages first, update the workflow base to `/`, then add `public/CNAME` with the verified domain. No domain or subdomain is assumed by this release. See the [official Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

The initial contact route is this repository's GitHub Discussions because no verified company email or phone number was supplied. Replace it with confirmed company contact details when available.
