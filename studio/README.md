# Studio

Sanity Studio for Brenda Bennett Art. Project `eyosaf8p`, dataset `production`
(see `packages/sanity-config`).

**Editing content?** Read [`docs/studio-guide.md`](../docs/studio-guide.md) —
that's the guide for the Studio itself. This file is the developer notes.

## Commands

Run from the repo root:

```bash
pnpm dev:studio     # localhost:3333
pnpm build:studio
pnpm deploy:studio  # deploys to the Sanity-hosted Studio
pnpm typegen        # extract schema + regenerate web/src/lib/sanity.types.ts
```

## Layout

| Path                 | What it is                                                     |
| -------------------- | --------------------------------------------------------------- |
| `schemas/`           | Document and object types; `schemas/blocks/` are page builder blocks |
| `studio/structure.ts`| Sidebar — Artwork (orderable), Events, Pages, Footer Links, then the rest |
| `studio/*FormInput.tsx` | Custom document form layouts for artwork, event and page    |
| `studio/studioLayout.tsx` | CSS overrides that let forms use the full pane width       |
| `presentation/resolve.ts` | Document ↔ front-end route mapping for Presentation        |
| `components/`        | Legacy input components, not currently wired into any schema     |

## Things to know

- **`releases` and `scheduledDrafts` are disabled** in `sanity.config.ts`. They
  are paid features on this plan and Studio edits 403 without that.
- **The theme widens `container`** so artwork forms can spread out; `StudioLayout`
  adds the CSS to make that stick.
- **Gallery pages match Series / Image Type titles as exact strings.** Renaming a
  `series` or `imageType` document silently empties the gallery page that
  filters on it. See the guide's gallery table for the current mapping.
- **`page` documents have no catch-all route.** The web app has a fixed set of
  routes; a new `page` document appears in the nav and 404s. Adding a page means
  adding a route in `web/src/routes`.
- **Presentation routes** are declared in `presentation/resolve.ts` — currently
  `exhibitions`, `artist-biography`, `her-studio` and `event`. Artwork has no
  location mapped yet, so it gets no Visual Editor button; the gallery routes are
  dynamic now, so adding one is just a `defineLocations` entry per gallery.
- **Nothing is prerendered.** Every route server-renders per request through
  `locals.sanity.loadQuery`, so published content is live without a rebuild.
  Gallery queries live in `web/src/lib/artworkQueries.ts`.
- **Re-run `pnpm typegen` after any schema change** and commit the regenerated
  `web/src/lib/sanity.types.ts`.

## Unused schemas

`schemas/post.ts`, `author.ts` and `category.ts` are left over from the Sanity
blog template and are commented out of `schemas/index.ts`. `components/` is
likewise unreferenced.
