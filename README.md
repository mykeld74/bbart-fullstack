# BBartFullStack

Monorepo for Brenda Bennett Art — the Sanity Studio and the SvelteKit site that
reads from it, in one place so a schema change and the queries that depend on it
land in the same commit.

| Path                      | What it is                                                    |
| ------------------------- | ------------------------------------------------------------- |
| `studio/`                 | Sanity Studio (Sanity 6, React 19) — the content backend       |
| `web/`                    | Public site (SvelteKit 2, Svelte 5), server-rendered per request |
| `packages/sanity-config/` | `projectId` / `dataset` / `apiVersion`, shared by both         |
| `docs/`                   | Written docs, including the Studio guide for content editors  |

Editing content rather than code? See [`docs/studio-guide.md`](docs/studio-guide.md),
or hand someone the printable [Studio User Guide](docs/Brenda-Bennett-Art-Studio-Guide.pdf).

The PDF is generated — edit `docs/build-studio-guide.py` and re-run it, then
update the markdown to match:

```bash
pip install reportlab && python docs/build-studio-guide.py
```

## Setup

```bash
pnpm install
```

Node 22.12+ (see `.nvmrc`). pnpm workspaces — always install from the repo root.

## Everyday commands

Run these from the root:

```bash
pnpm dev            # web app at localhost:5173
pnpm dev:studio     # studio at localhost:3333
pnpm typegen        # regenerate types from the schema (see below)
pnpm check          # typecheck the web app
pnpm build          # typegen + build the web app
pnpm build:studio   # build the studio
pnpm deploy:studio  # deploy the studio to Sanity
```

## Typed queries

`web/src/lib/sanity.types.ts` is **generated**, not hand-written. Do not edit it.

`pnpm typegen` extracts the schema from `studio/` and types every `defineQuery()`
call in `web/src`. Because `overloadClientMethods` is on, `client.fetch(someQuery)`
returns the exact shape that query produces — so renaming a field in the Studio
turns into a type error in the web app instead of a blank page in production.

Two rules make this work:

1. Wrap every GROQ query in `defineQuery()` from `groq`.
2. Keep the query string static — no `${interpolation}`, or typegen can't read it.

Re-run `pnpm typegen` after any schema change, and commit the regenerated file.
The intermediate `studio/schema.json` is gitignored; the generated types are not.

## Visual preview (Presentation)

To edit exhibitions page builder blocks against a live preview:

1. Copy `web/.env.example` → `web/.env` and set `SANITY_VIEWER_TOKEN` (Viewer role).
2. Copy `studio/.env.example` → `studio/.env` (defaults to `http://localhost:5173`).
3. Run `pnpm dev` and `pnpm dev:studio`.
4. In Studio, open **Presentation**, then the Shows/Exhibitions page.

Click overlays jump to the matching field; layout changes update in the iframe.

## History

Grafted from the two original repos with `git subtree`, so `git log` still
reaches commits from both `BBartBackend-v3` and `BBartFrontend`.
