import {defaultTheme, defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool} from 'sanity/presentation'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {dataset, projectId} from '@bbart/sanity-config'
import {StudioLayout} from './studio/studioLayout'
import {structure} from './studio/structure'
import {locations, mainDocuments} from './presentation/resolve'

// Studio forms use container[1] (~640px by default). Raise it so artwork can spread out.
const theme = {
  ...defaultTheme,
  container: [320, 1400, 1600, 1920, 2400, 3200],
}

const previewUrl =
	process.env.SANITY_STUDIO_PREVIEW_URL ||
	(process.env.MODE === 'development' || process.env.NODE_ENV === 'development'
		? 'http://localhost:5173'
		: 'https://bbart-svelte.netlify.app')

export default defineConfig({
  name: 'default',
  title: 'bbart',

  projectId,
  dataset,

  theme,

  // Content Releases is a paid feature; leave it off so Studio edits don't 403
  releases: {
    enabled: false,
  },
  scheduledDrafts: {
    enabled: false,
  },

  plugins: [
    structureTool({structure}),
    presentationTool({
      previewUrl: {
        // Origin only — document locations decide the path for the page being edited
        initial: previewUrl,
        previewMode: {
          enable: '/preview/enable',
          disable: '/preview/disable',
        },
      },
      allowOrigins: [
        'http://localhost:*',
        'https://bbart-svelte.netlify.app',
        previewUrl,
      ],
      resolve: {
        mainDocuments,
        locations,
      },
    }),
    visionTool(),
  ],

  studio: {
    components: {
      layout: StudioLayout,
    },
  },

  schema: {
    types: schemaTypes,
  },
})
