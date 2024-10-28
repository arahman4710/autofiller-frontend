/**
  rules:
    some rules are turned off in order to avoid conflict with the eslint-perfectionist plugin
**/
module.exports = {
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:perfectionist/recommended-natural'],
  ignorePatterns: [
    '**/gql/__generated__/**',
    'next.config.js',
    '**/sanity/types.ts',
    '**/sanity-studio/sanity.types.ts',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['perfectionist', '@typescript-eslint', 'react'],
  root: true,
  rules: {
    '@typescript-eslint/adjacent-overload-signatures': 'off',
    '@typescript-eslint/ban-ts-comment': ['warn'],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        format: ['PascalCase'],
        prefix: ['T'],
        selector: 'typeLike',
      },
      {
        format: ['PascalCase'],
        prefix: ['I'],
        selector: 'interface',
      },
      {
        format: ['PascalCase'],
        prefix: ['E'],
        selector: 'enum',
      },
    ],
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/sort-type-constituents': 'off',
    'import/order': 'off',
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            importNames: ['default'],
            message: 'Please use named imports instead.',
            name: 'react',
          },
        ],
      },
    ],
    'perfectionist/sort-imports': [
      'error',
      {
        'custom-groups': {
          value: {
            '@': '@/**',
            '@gql': '@gql/**',
            react: ['react'],
          },
        },
        groups: [
          'type',
          'react',
          ['builtin', 'external'],
          '@gql',
          ['internal', 'internal-type', '@'],
          ['parent-type', 'sibling-type', 'index-type'],
          ['parent', 'sibling', 'index'],
          'style',
          'object',
          'unknown',
        ],
        'newlines-between': 'always',
        order: 'asc',
        type: 'natural',
      },
    ],
    'perfectionist/sort-objects': [
      'error',
      {
        order: 'asc',
        type: 'natural',
      },
    ],
    'react/jsx-sort-props': 'off',
    'react/prop-types': ['error'],
    'sort-imports': 'off',
    'sort-keys': 'off',
  },
}
