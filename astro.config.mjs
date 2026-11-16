// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  trailingSlash: 'always',
  redirects: {
    '/slef-filers/': '/self-filers/',
  },
  build: {
    format: 'directory',
  },
});
