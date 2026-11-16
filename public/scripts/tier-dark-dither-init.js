import { mountNavDither } from './klear-nav-dither.js';

for (const canvas of document.querySelectorAll('.tier--dark [data-nav-dither]')) {
  mountNavDither(canvas);
}
