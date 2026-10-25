# RAMACH SYSTEMS — visual direction, October 2026

## Design intent

RAMACH is a **technical editorial atlas** for a family of physical-world software products, not a collection of unrelated SaaS cards. The homepage is an authored cinematic movement around one chip and seven nodes. Every other page should feel like an intelligible close-up of that technology.

The design decision uses the public guidance from Anthropic's `frontend-design`, the UI/UX Pro Max skill and Vercel's Web Interface Guidelines. The account-specific `personal-expert-skills` GitHub repository was checked but contained only README.md at the time of this work, so no claim is made that an additional personal skill implementation was executable.

## Intentional design tokens

| Role | Token | Color |
|---|---|---|
| Main ink | `--rm-ink` | `#061318` |
| Deep background | `--rm-night` | `#030b0e` |
| Raised surface | `--rm-surface-raised` | `#102b30` |
| Editorial text | `--rm-paper` | `#eeece4` |
| Engineering / connectivity | `--rm-green` | `#b0dcca` |
| Spatial / digital | `--rm-blue` | `#8fcae1` |
| Human materials | `--rm-sand` | `#ccb78d` |
| Supporting type | `--rm-muted` | `#aac0b7` |

Use **Vazirmatn Variable** for Persian content and **Manrope Variable** for compact technical labels and English marks. Use editorial type hierarchy, not a rainbow of badges.

## Layout hierarchy

1. **Opening:** empty night → existing spinner → original path-drawn RAMACH/SYSTEMS with restrained halo. This is the only large automatic opening motion. No new hero illustration.
2. **Journey:** preserve the 3D WebGL scene, camera path, chapter stops, signal traces, text reveal and read time. Content remains normal HTML outside WebGL. No generic sticky “marketing hero” treatment.
3. **Closing:** a strong centered Persian statement, one main dialog CTA, then a typographic directory of six products/services. Avoid six identical rounded sales cards.
4. **Product page:** story text plus an abstract technical drawing / specimen for each product, not a fake product screenshot. Accent color is keyed by the URL-selected product.
5. **Website services:** real public projects and honest state labels. Editorial first case study spans the grid; different product contexts and the actual isolated timeline demo illustrate the specialist approach.
6. **Timeline demo:** technical, readable ledger with a clear active stage, pressed filters, and distinct event details. It must remain fictional and never call private WordPress APIs.

## Layout sketches

```text
Home finish, desktop
  [one centered brand statement / main CTA]
  ---------------------------------------------------------
  Products & Services             RAMACH / DIRECTORY
  [01 Archiyar] [02 Chido]    [03 Kitchyar]
  [04 Kamcheh]  [05 Mizato]   [06 Websites]
  ---------------------------------------------------------
  slim utility footer

Catalog, desktop
  Header ----------------------------------------------
  stage: PRODUCT TYPE
  [ large product text / actions ] [ technical specimen ]
  -------------------------------------------------------
  capabilities (three editorial columns, not raised cards)
  case studies and differentiators only for website service
  related product links

Timeline, desktop
  Page title / sample disclaimer
  | Project name                    [manager] [owner] |
  | Foundation | Structure | MEP | Finishing          |
  | [all] [reports] [follow-ups]                    |
  |   dated construction-event spine                |
```

## Interaction guardrails

- Existing `cameraTravelMs = 2500` and `minimumReadMs = 780` are not changed.
- The original SVG wordmark draw and WebGL route geometry/signal animation are not changed.
- The project callback dialog remains the only main CTA on the final cinematic panel.
- Desktop readable text must remain at least 15 CSS px; mobile at least 13 CSS px. The inherited base CSS includes historical sizes; the visual layer scopes final readable overrides.
- Links are real anchors, actions are buttons; 44px min touch targets in the new UI; focus-visible must be clear.
- No third-party images, tracking scripts, extra JS dependencies or heavy post-processing.
- Reduced-motion media cuts ornamental CSS transitions. The pre-existing scene uses the explicit reduceMotion query parameter as previously requested; changing that requires separate UX approval.
- Public demos never imply production maturity; the timeline uses fabricated events.

## Implementation and verification

All new styling is centralized in `src/ui/finish.css`, a **replacement** for the previous patchy finish layer, not an appended second finish layer. CSS base files and 3D source remain intact to preserve deployed behavior. Source-based regression tests cover existing features, links, minimum font values and new styling markers.

Passing GitHub Actions confirms syntax/build/tests/deploy. A live Chromium visual inspection (desktop 1440, 1024 and mobile 390, 360; light/dark text contrast; real wheel travel and WebGL) is still required for visual acceptance.
