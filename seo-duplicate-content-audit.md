# Tool Landing-Page SEO Audit

Audit date: 2026-09-26

## Scope and method

Reviewed user-facing tool routes under `app/**/page.js`, shared metadata in `lib/toolMetadata.js`, inherited metadata in `app/layout.js`, and route entries in `app/sitemap.js`. Legal, contact, about, API, and home pages were excluded. Compared rendered route/component reuse, page-level prose, title/description metadata, FAQ JSON-LD wording, and canonical declarations.

## Findings

### Exact duplicate routes

| Routes | What is duplicated | Similarity source / SEO effect |
|---|---|---|
| `/capsule-manager` and `/capsule-manager-page` | Same metadata, body copy, FAQ JSON-LD, and client component | `/capsule-manager/page.js` originally re-exported the complete page from `/capsule-manager-page/page.js`; both advertised `/capsule-manager` as canonical. The alias now redirects permanently to `/capsule-manager`. |
| `/hashtag` and `/hashtag-generator` | Same tool client and therefore the same visible tool experience; alias has no route-specific copy or metadata | `/hashtag-generator/page.js` re-exports `HashtagClient`; it inherits the root title, description, and `/` canonical. |
| `/keyword` and `/keyword-generator` | Same tool client and visible tool experience; alias has no route-specific copy or metadata | `/keyword-generator/page.js` re-exports `KeywordClient`; it inherits the root title, description, and `/` canonical. |
| `/imagegen` and `/image-generator` | Same tool client and visible tool experience; alias has no route-specific copy or metadata | `/image-generator/page.js` re-exports `ImageGeneratorClient`; it inherits the root title, description, and `/` canonical. |

### Near-duplicate FAQ templates

The following routes emit FAQPage JSON-LD with a recurring three-part structure: a free-use question, a data/server/privacy question, and a tool-capability question. The actual question wording and answers are mostly tool-specific; this is a structural similarity signal, not evidence that the pages contain copied FAQ text. Their main body paragraphs are distinct and substantially longer than a generic one-line template. Keep schema questions accurate to visible user-facing content and avoid treating a shared FAQ structure alone as a duplicate-content finding.

`/base64` (`app/base64/page.js`), `/domain` (`app/domain/page.js`), `/emi` (`app/emi/page.js`), `/hashtag` (`app/hashtag/page.js`), `/image-tools` (`app/image-tools/page.js`), `/invoice` (`app/invoice/page.js`), `/json` (`app/json/page.js`), `/loan` (`app/loan/page.js`), `/passport` (`app/passport/page.js`), `/password` (`app/password/page.js`), `/pdf` (`app/pdf/page.js`), `/qr` (`app/qr/page.js`), `/resume` (`app/resume/page.js`), `/tts` (`app/tts/page.js`), `/unit` (`app/unit/page.js`), `/video` (`app/video/page.js`), and `/word-counter` (`app/word-counter/page.js`).

Examples include “Is this [tool] free?”, a question about device/server handling, and a question about tool-specific formats, options, or calculations. `/capsule-manager` uses a related free/privacy structure alongside a capsule-specific question. `/story` and `/site-maker` have longer, subject-specific FAQ sets. No pages in this group were found to share verbatim FAQ answers in the reviewed source.

### Repeated guide-page structure

`/tools/hashtag-generator` (`app/tools/hashtag-generator/page.js`), `/tools/image-generator` (`app/tools/image-generator/page.js`), `/tools/keyword-generator` (`app/tools/keyword-generator/page.js`), and `/tools/story-generator` (`app/tools/story-generator/page.js`) use nearly the same short guide structure: back control, one-sentence tool summary, numbered “How To Use” list, daily limit, and tool link. The feature details differ, but there is little audience context or substantive scenario-based guidance. These routes also inherit the homepage title/description and `/` canonical because the modules are client components without route metadata.

### Metadata and canonical issues

- `/image-generator`, `/keyword-generator`, and `/hashtag-generator` have no route metadata and inherit the generic root title/description and `https://toolvoid.com/` canonical, rather than identifying the tool or the route.
- The four `/tools/...` guide routes inherit the same generic root title/description and canonical; each needs route-specific metadata and a self-canonical if retained as an indexable guide.
- `/indian-forms` declares route-specific metadata and a self-canonical in `app/indian-forms/layout.js`.
- `/capsule-manager-page` was an exact duplicate route and pointed to `/capsule-manager`; it now permanently redirects to that primary landing page.
- `/capsule-manager`, `/domain`, `/emi`, `/hashtag`, `/image-tools`, `/imagegen`, `/invoice`, `/json`, `/keyword`, `/loan`, `/passport`, `/password`, `/pdf`, `/qr`, `/resume`, `/story`, `/site-maker`, `/tts`, `/unit`, `/video`, and `/word-counter` have tool-specific canonical URLs through route declarations or `createToolMetadata()`.
- Before remediation, live title and description copy reused similar benefit-led phrasing (“instantly”, “in seconds”, “fast”, “free”, “no signup”). Primary tool metadata now differentiates audience and purpose while `createToolMetadata()` emits a slug-specific canonical. The custom title/description on `/imagegen` remains overridden by its shared metadata spread, which is now intentionally tool-specific.
- `app/sitemap.js` lists the alias routes `/hashtag-generator`, `/image-generator`, and `/keyword-generator`, while omitting their primary routes `/hashtag`, `/imagegen`, and `/keyword`. It also omits `/site-maker` and includes `/indian-forms`, whose canonical currently points to the site root.

## Recommended page-level remediation

1. Give each retained primary landing page an original 300–400 word tool-specific section with its own audience, concrete scenarios, and practical steps; do not reuse the same sentence pattern.
2. Keep FAQ schema accurate to visible user-facing content and avoid using a templated FAQ pattern as the sole content differentiator.
3. Keep each retained landing page's title, description, and canonical specific to its own URL. For alternate paths that are exact aliases, use a permanent redirect to the primary route instead of presenting a second duplicate landing page.
4. Align sitemap entries with the retained canonical routes.

## Audit limits

This is a source-level audit. It compares route modules, shared metadata, JSX/schema text, and route wiring; it does not measure rendered DOM similarity or Google Search Console indexing/canonical selection.