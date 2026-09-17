import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'eyosaf8p',
    dataset: 'production',
  },
  deployment: {
    appId: 'ebce90094749380500d3a37c',
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
