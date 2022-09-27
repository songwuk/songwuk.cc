import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vue from "@astrojs/vue";
import image from "@astrojs/image";
import UnoCSS from 'unocss/astro'
// https://astro.build/config
export default defineConfig({
  site: 'https://www.songwuk.cc',
  integrations: [sitemap(), vue(), image(), UnoCSS()]
});