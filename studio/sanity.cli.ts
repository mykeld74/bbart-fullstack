import {defineCliConfig} from 'sanity/cli'
import {dataset, projectId, studioAppId} from '@bbart/sanity-config'

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  deployment: {
    appId: studioAppId,
  },
  // Types are generated from this Studio's schema into the web app, so a schema
  // change that breaks a GROQ query shows up as a type error there.
  typegen: {
    path: '../web/src/**/*.ts',
    schema: './schema.json',
    generates: '../web/src/lib/sanity.types.ts',
    overloadClientMethods: true,
  },
  // lexorank is CJS; Vite SSR schema extract fails with "exports is not defined" unless externalized
  vite: (config) => ({
    ...config,
    ssr: {
      ...config.ssr,
      external: [...new Set([...(config.ssr?.external ?? []), 'lexorank'])],
    },
  }),
})
