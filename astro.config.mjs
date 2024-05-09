import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vue from "@astrojs/vue";
import netlify from '@astrojs/netlify';
import UnoCSS from 'unocss/astro'
import addClasses from 'rehype-add-classes'
export default defineConfig({
  site: 'https://www.songwuk.cc/',
  output: 'server',
  adapter: netlify(),
  integrations: [sitemap(), vue(), UnoCSS({
    injectReset: true // or a path to the reset file
  })],
  markdown: {
    gfm: true,
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
          pre: 'bg-zinc-300 dark:bg-black dark:border-zinc-700 border border-slate-100 rounded-xl padding-1',
          a: 'underline underline-offset-2 hover:text-orange-500 decoration-orange-500',
          strong: 'dark:bg-zinc-300 dark:c-black bg-black c-zinc-300 rounded-1'
        }
      ]
    ]
  }
});
