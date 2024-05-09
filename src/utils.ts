import type { ImageMetadata } from 'astro';
export const images = import.meta.glob<{ default: ImageMetadata }>('/public/**/*.{jpeg,jpg,png,gif}')
