/**
 * Single source of truth for the Sanity dataset both the Studio and the web
 * app talk to. Imported by studio/sanity.config.ts, studio/sanity.cli.ts and
 * web/src/lib/client.ts so these can never drift apart.
 */
export const projectId = 'eyosaf8p'
export const dataset = 'production'

/** API version the web app queries against. Bump deliberately, not casually. */
export const apiVersion = '2024-01-01'

/** Sanity-hosted Studio deployment target (`sanity deploy`). */
export const studioAppId = 'ebce90094749380500d3a37c'
