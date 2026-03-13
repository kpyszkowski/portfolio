import { createRequire } from 'module'
import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettier from 'eslint-plugin-prettier/recommended'
import onlyWarn from 'eslint-plugin-only-warn'
import pathAlias from 'eslint-plugin-path-alias'

const require = createRequire(import.meta.url)

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  { plugins: { 'only-warn': onlyWarn, 'path-alias': pathAlias } },
  {
    rules: {
      'prettier/prettier': [
        'warn',
        {
          plugins: [require.resolve('prettier-plugin-tailwindcss')],
          tailwindStylesheet: './src/app/globals.css',
        },
      ],
      'path-alias/no-relative': 'warn',
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'next-env.d.ts',
    '.open-next/**',
  ]),
])

export default eslintConfig
