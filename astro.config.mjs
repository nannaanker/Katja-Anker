import { defineConfig } from 'astro/config';

import alpinejs from "@astrojs/alpinejs";

import svelte from '@astrojs/svelte';


// https://astro.build/config
export default defineConfig({
  integrations: [alpinejs(), svelte()],
});





