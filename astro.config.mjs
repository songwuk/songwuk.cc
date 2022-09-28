import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vue from "@astrojs/vue";
import image from "@astrojs/image";
import UnoCSS from 'unocss/astro'
import addClasses from 'rehype-add-classes'
// https://astro.build/config
export default defineConfig({
  site: 'https://www.songwuk.cc',
  integrations: [sitemap(), vue(), image(), UnoCSS()],
  markdown: {
    extendDefaultPlugins: true,
    rehypePlugins: [
      [
        addClasses,
        {
          h1: 'text-4xl font-bold font-ubuntu',
          h2: 'text-2xl font-bold font-ubuntu',
          h3: 'text-xl font-bold font-ubuntu',
          h4: 'text-lg font-bold font-ubuntu',
          h5: 'font-bold font-ubuntu',
          h6: 'font-bold font-ubuntu',
          img: 'border border-slate-300 dark:border-zinc-700 rounded-xl mb-6',
          p: 'mb-6',
          a: 'underline underline-offset-2 hover:text-orange-500 decoration-orange-500'
        }
      ]
    ]
  }
});