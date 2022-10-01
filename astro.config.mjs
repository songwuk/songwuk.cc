import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import i18n from 'astrojs-i18n'
import vue from "@astrojs/vue";
import image from "@astrojs/image";
import netlify from '@astrojs/netlify/functions';
import UnoCSS from 'unocss/astro'
import addClasses from 'rehype-add-classes'
// https://astro.build/config
export default defineConfig({
  site: 'https://www.songwuk.cc',
  output: 'server',
  adapter: netlify(),
  experimental: { integrations: true },
  integrations: [sitemap(), vue(), image(), UnoCSS(),i18n()],
  markdown: {
    extendDefaultPlugins: true,
    rehypePlugins: [
      [
        addClasses,
        {
          h1: 'text-4xl font-bold font-ubuntu my-2',
          h2: 'text-2xl font-bold font-ubuntu my-2',
          h3: 'text-xl font-bold font-ubuntu my-2',
          h4: 'text-lg font-bold font-ubuntu my-2',
          h5: 'font-bold font-ubuntu my-2',
          h6: 'font-bold font-ubuntu my-2',
          img: 'border border-slate-300 dark:border-zinc-700 rounded-xl mb-6',
          p: 'mb-6',
          a: 'underline underline-offset-2 hover:text-emerald-500 decoration-emerald-500'
        }
      ]
    ]
  }
});