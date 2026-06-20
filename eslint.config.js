import js from '@eslint/js'
import typescriptEslint from 'typescript-eslint'

import eslintPluginAstro from 'eslint-plugin-astro'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

export default [
	{ ignores: ['**/dist/**', '**/node_modules/**', '**/build/**', '', '**/.astro/**'] },
	js.configs.recommended,
	...typescriptEslint.configs.recommended,

	...eslintPluginAstro.configs.recommended,
	{
		files: ['**/*.tsx', '**/*.jsx'],
		plugins: { react, 'react-hooks': reactHooks },
		languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
		settings: { react: { version: '19.0' } },
	},
	{ files: ['*.ts', '*.tsx', '*.astro', '*.js', '*.jsx'] },
]
