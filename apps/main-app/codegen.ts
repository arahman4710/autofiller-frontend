import type { CodegenConfig } from '@graphql-codegen/cli'

import 'dotenv/config'

const config: CodegenConfig = {
  documents: ['src/**/*.{gql, graphql}'],
  generates: {
    './src/gql/__generated__/': {
      plugins: [],
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
        gqlTagName: 'gql',
      },
    },
    './src/gql/__generated__/schema.graphql': {
      plugins: ['schema-ast'],
    },
    './src/gql/__generated__/zod.ts': {
      config: {
        schema: 'zod',
      },
      plugins: ['typescript', 'typescript-operations', 'typescript-validation-schema'],
    },
  },
  ignoreNoDocuments: true,
  overwrite: true,
  schema: process.env.NEXT_PUBLIC_API_URL,
}

export default config
