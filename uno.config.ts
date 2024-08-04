// uno.config.ts
import {
	defineConfig,
	presetIcons,
	presetUno,
	presetWebFonts,
	transformerDirectives
} from 'unocss';

export default defineConfig({
	presets: [
		presetUno(),
		presetIcons(),
		presetWebFonts({
			provider: 'google',
			fonts: {
				sans: 'Noto Sans JP'
			}
		})
	],
	theme: {
		colors: {
			main: '#064E6B'
		}
	},
	transformers: [transformerDirectives()]
});
