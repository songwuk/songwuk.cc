import type { AstroIntegration } from 'astro';
export default function(): AstroIntegration {
  return {
    name: '@astrojs/i18n',
    hooks: {
      'astro:config:setup': ({updateConfig, addRenderer, injectScript}) => {
        // injectScript('before-hydration', `import 'a';`);
        console.log('setup')
      },
      'astro:build:setup': ({ vite, target }) => {

      }
    }
  }
}