# Tool Page Server-Rendered Content Verification

Date: 2026-09-26

## Result

All primary tool routes tested pass. Their generated HTML contains readable, tool-specific explanatory copy before client-side JavaScript runs, visible FAQ text, FAQPage JSON-LD, and a canonical URL pointing to the same route.

The request described 22 tool pages. The repository contains 23 canonical tool routes: 21 routes in `lib/toolMetadata.js`, plus `/site-maker` and `/indian-forms`. All 23 were included below rather than omitting a live tool.

## Per-route results

“Raw words” is a count of readable words after stripping tags, scripts, and styles from the generated HTML; it includes initial tool controls and labels, so it is not a count of editorial copy alone. FAQ counts are visible `<summary>` questions in the generated HTML.

| Route | Raw HTML text | Raw words | Visible FAQ | FAQPage JSON-LD | Self-canonical |
|---|---:|---:|---:|---:|---:|
| `/base64` | PASS | 1,123 | 5 | PASS | PASS |
| `/capsule-manager` | PASS | 895 | 5 | PASS | PASS |
| `/domain` | PASS | 636 | 5 | PASS | PASS |
| `/emi` | PASS | 1,610 | 5 | PASS | PASS |
| `/hashtag` | PASS | 1,559 | 5 | PASS | PASS |
| `/image-tools` | PASS | 1,454 | 5 | PASS | PASS |
| `/imagegen` | PASS | 1,210 | 5 | PASS | PASS |
| `/invoice` | PASS | 402 | 5 | PASS | PASS |
| `/json` | PASS | 970 | 5 | PASS | PASS |
| `/keyword` | PASS | 1,366 | 5 | PASS | PASS |
| `/loan` | PASS | 1,011 | 5 | PASS | PASS |
| `/passport` | PASS | 572 | 5 | PASS | PASS |
| `/password` | PASS | 592 | 5 | PASS | PASS |
| `/pdf` | PASS | 1,137 | 5 | PASS | PASS |
| `/qr` | PASS | 1,110 | 5 | PASS | PASS |
| `/resume` | PASS | 3,355 | 5 | PASS | PASS |
| `/story` | PASS | 1,119 | 5 | PASS | PASS |
| `/tts` | PASS | 530 | 5 | PASS | PASS |
| `/unit` | PASS | 1,167 | 5 | PASS | PASS |
| `/video` | PASS | 603 | 5 | PASS | PASS |
| `/word-counter` | PASS | 1,104 | 5 | PASS | PASS |
| `/site-maker` | PASS | 494 | 5 | PASS | PASS |
| `/indian-forms` | PASS | 609 | 3 | PASS | PASS |

## Verification method

Ran `npm run build`, then inspected the generated `.next/server/app/<route>.html` artifacts directly. The check removed script and style elements before checking for route-specific readable text, counted visible FAQ disclosure summaries, verified FAQPage markup in JSON-LD, and compared each canonical URL with `https://toolvoid.com/<route>`. No JavaScript hydration or browser execution was used for these checks.

The route components continue to own the interactive tools. Static copy and FAQ markup are rendered from server components/layouts around them; no tool-processing logic was moved out of its client implementation.

## Scope note

Legacy alias paths are not counted as independent tool pages: `/capsule-manager-page`, `/hashtag-generator`, `/image-generator`, and `/keyword-generator` permanently redirect to their primary routes. `/story-generator` already redirects to `/story`. Four `/tools/...` guide pages remain distinct instructional routes and are outside the 23 canonical tool-page count above.
