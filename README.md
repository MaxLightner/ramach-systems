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

## Interaction changes (Oct 2026)

- The opening SVG outline starts after window `load`, font readiness, two painted frames and a 950 ms pause. Stroke draws span about 4.07 seconds over RAMACH and SYSTEMS; a low-intensity blue halo remains behind the initially invisible wordmark.
- The scroll-controlled camera moves between 8 chapter stops plus a final return-to-hub stop. Every step is a 2.5-second cubic ease-in/out, followed by a 2.15-second minimum reading hold. Wheel, keyboard and touch are supported; dragging the scrollbar snaps to a nearby stop.
- The 14 light lanes use 98 independently phased desktop signal dots (42 mobile) in one GPU `THREE.Points` draw call, rather than 56 separate meshes. One procedurally generated 32×32 sprite texture (~4 KB) is shared by the point cloud. Signals are fixed-size 5 CSS px desktop / 4 CSS px mobile and update a single dynamic buffer. A reduced-motion preference intentionally freezes motion. Chrome/mobile visual parity and live FPS require browser-specific verification.
- Desktop pointer movement creates a low-opacity halo; it is disabled on coarse pointers and for reduced motion.
- Footer links and copyright are explicitly enlarged to 16 CSS px (15 CSS px on narrow screens). The build tests audit all authored CSS font declarations for a 13 CSS px minimum.

## Archyar 3D project viewer (preview)

The multi-page Vite build now also produces `archyar.html`. In the current GitHub Pages configuration the preview route is `/ramach-systems/archyar.html`. It is isolated from RAMACH's interactive landing page.

- Load a local Archyar v1 JSON project or the built-in sample room; metric X/Z floor plane and Y-up world coordinates are preserved.
- Render parametric walls with door/window openings, floor surfaces, simple furniture/structure/stair/MEP representations. This is a lightweight preview, **not** full Blender render fidelity or a GLB renderer.
- Allow orbit inspection, an explicitly local wall-height edit, and JSON download.
- Accept a configured secure WebSocket relay, session ID, and bearer session token. The viewer understands project.snapshot, camera.pose, object.upsert and object.delete protocol events.
- Follow mobile or Blender camera pose by project ID and session ID with quaternion interpolation. No video is transported.
- Viewer tokens are cleared from the address bar after loading; no tokens are stored in local storage.

The static site does **not** host a relay, create sessions, or grant real editing privileges. A server with role verification, event ordering, and persistence must be deployed before browser-to-phone or Blender live collaboration can work. The locally editable example must not be mistaken for shared project editing.

This is the first web integration layer; the Android Java adapter and Blender live network sender remain separate work.

### QR auto-join and web editor roles

When the trusted repository variable `ARCHYAR_RELAY_WS` is configured to the deployed WSS endpoint, the website build embeds `VITE_ARCHYAR_RELAY_WS`. QR links with a session/token join automatically and remove the token from browser history. With no configured endpoint, relay/server entry remains manual.

The relay determines Viewer, Editor or Owner by verifying the bearer token. Viewers cannot edit in-session. Editors and owners can submit wall-height changes using a revision-checked HTTPS PATCH, with the server broadcasting the accepted object update. These edits do not yet propagate into an already open Blender or Android workspace.

## Fix: motion parity and font floor (October 25)

The core issue was the prior wheel handler instantly moving `scrollTop` to the next stop before the 2.5-second camera animation finished, making wheel navigation look like a cut. Physical scroll and Three.js camera progress now share one 2.5-second easing timeline. Dragging the scrollbar still changes camera position directly. Previously, the browser's `prefers-reduced-motion` flag could independently disable all CSS logo animations, 3D camera movement and data signals; core cinematic motion now runs by default, with explicit `?reduceMotion=1` for opting out. SVG paths animate through measured `getTotalLength()` and Web Animations rather than overridden CSS keyframes. Footer link and utility text is 13 CSS px, not the previously oversized 16px; all authored font values are audited to remain at or above 13 CSS px.

## RAMACH visual polish — 2026-10-25

- Opening order: a lightweight, CSS-only circular loader on top of the dark hero; after page/font readiness it remains briefly visible, fades out over 350ms, then the real vector SVG stroke-draw begins. A subtle blue light bed sits behind the logo throughout.
- Light path positions retain the existing design but change from chamfered polyline corners to quadratic Bezier round-overs. Three concentric lightweight tubes per route provide core, additive cyan glow and readable structure. Eight radial segments remove visibly angular tube facets.
- Signals use a shared sprite and **two** GPU point clouds (small bright core, wide faint halo) referencing one dynamic buffer. The desktop has 154 points and mobile 84; no per-particle mesh or post-processing bloom. The 32×32 procedural sprite is about 4 KiB; signal motion and speed remain deterministic and diverse.
- Footer typography is 14 CSS px on mobile and desktop, preserving the site's 13 CSS px hard minimum without enlarging navigation to 16 px. CSS font declarations are audited in automated tests.
- Visual runtime FPS, actual Chrome hardware motion and layout/computed font sizes still require browser-based checks; passing CI alone is not visual verification.
