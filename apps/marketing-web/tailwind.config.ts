import type { Config } from 'tailwindcss'

import baseConfig from '@rag/ui/tailwind.config'
import plaiceholder from '@plaiceholder/tailwindcss'
import fs from 'node:fs'
import path from 'node:path'

export default {
  content: ['./src/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
  extends: {
    fontFamily: {
      mono: ['Ubunto Mono'],
    },
  },
  plugins: [
    plaiceholder({
      resolver: (src) => fs.readFileSync(path.join('./public', `${src}.jpg`)),
    }),
  ],
  presets: [baseConfig],
} satisfies Config
