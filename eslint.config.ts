import pluginVue from 'eslint-plugin-vue';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
	{
		name: 'app/files-to-lint',
		files: ['**/*.{ts,mts,tsx,vue}']
	},

	{
		name: 'app/files-to-ignore',
		ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**']
	},
	{
		rules: {
			'no-debugger': 'off',
			'typescript-eslint/no-unused-vars': 'warn',
			'no-console':
				process.env.NODE_ENV !== 'development' ? ['warn', { allow: ['error'] }] : 'off',
			'vue/max-attributes-per-line': [
				'warn',
				{
					singleline: 20,
					multiline: 1
				}
			],
			'vue/camelcase': [
				'error',
				{
					ignoreDestructuring: true,
					properties: 'never'
				}
			],
			camelcase: [
				'error',
				{
					ignoreDestructuring: true,
					properties: 'never'
				}
			]
		}
	},

	pluginVue.configs['flat/essential'],
	vueTsConfigs.recommended,
	skipFormatting
);
