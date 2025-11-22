import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.svelte'], // `.ts` hinzufügen
	},
});
