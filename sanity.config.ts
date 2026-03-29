'use client'

/**
 * This configuration is used for the Sanity Studio route mounted at
 * `/${process.env.NEXT_PUBLIC_STUDIO_PATH || 'studio'}`.
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes'

export default defineConfig({
  // Use the variable, or fall back to 'studio' if it's missing.
  basePath: `/${process.env.NEXT_PUBLIC_STUDIO_PATH || 'studio'}`,
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    deskTool(),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
