# Extension architecture

## Current boundary

The homepage is a static, independently deployable brand site. Content, product configuration, 3D rendering and interface behavior are separate modules. The WebGL dependency is dynamically imported after the readable HTML is constructed. Home sections use native anchors rather than incomplete placeholder pages.

## Future pages

When substantive content is approved, extract the header/footer into shared components and add independently rendered `/services/`, `/company/`, `/insights/` and `/contact/` entries. Use Vite multi-page output for a small static expansion, or adopt a static-first framework if content volume warrants it. Do not add empty routes or rely on an SPA catch-all on GitHub Pages. Shared content/config modules remain reusable.

## Archiyar, Kitchyar, Chido

`src/config/ecosystem.ts` is the product registry. Entries intentionally contain no URLs. Once verified, add explicit absolute URLs and product-specific metadata. Deploy each product separately on its chosen subdomain; keep its lifecycle and bundles independent of the corporate site. A future shared package can provide typography, tokens, navigation and metadata without coupling releases. DNS/SSL settings are infrastructure work for that later phase.

## Later integrations

Authentication, operational backend, streaming, financial transactions and application data are out of scope. No API keys, environment secrets or user models are included. If introduced later, APIs must live outside the static Pages frontend. Authentication and cross-subdomain cookie design require a separate security review based on actual product requirements. Avoid prematurely sharing sessions across every product.

## Rendering

Five semantic modules map to scene coordinates and camera destinations. A central RAMACH processor connects to them with sparse, straight circuit traces and animated data pulses. Simple beveled geometry, muted PBR surfaces, local canvas labels, ACES tone mapping and image-based light provide depth without photographic assets or detailed architectural models. Desktop enables shadows; the low quality path reduces resolution and skips shadows. Neither path requires postprocessing. Both keep equivalent navigation/content.

## Quality limits

This scene intentionally follows a simple, minimal digital-board direction. Browser QA and production build checks should accompany visual changes. Test on real iOS/Android hardware before making device-specific performance guarantees.
