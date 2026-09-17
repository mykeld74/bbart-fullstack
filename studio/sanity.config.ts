import {defaultTheme, defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {dataset, projectId} from '@bbart/sanity-config'
import {StudioLayout} from './studio/studioLayout'
import {structure} from './studio/structure'

// Studio forms use container[1] (~640px by default). Raise it so artwork can spread out.
const theme = {
  ...defaultTheme,
  container: [320, 1400, 1600, 1920, 2400, 3200],
}

export default defineConfig({
  name: 'default',
  title: 'bbart',

  projectId,
  dataset,

  theme,

  plugins: [structureTool({structure}), visionTool()],

  studio: {
    components: {
      layout: StudioLayout,
    },
  },

  schema: {
    types: schemaTypes,
  },
})
