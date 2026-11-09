// Home tiles for the sections countries add (icon and colour, as ui.js SECTION_LOOK does for the others).
import { SECTION_LOOK } from '../ui.js';
import { MORE_GUIDE_ICONS } from './icons.js';
const P = d => `<svg class="ci" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;

Object.assign(SECTION_LOOK, {
  // Good to know: weather and boats, money, power (the Philippines). A sun behind a cloud.
  goodtoknow: { icon: P('<circle cx="9" cy="8" r="3"/><path d="M9 2v1.5M3 8h1.5M4.8 3.8l1 1M13.2 3.8l-1 1"/><path d="M7 20h10a4 4 0 0 0 0-8 5 5 0 0 0-9.6 1.5A3.3 3.3 0 0 0 7 20z"/>'), color: 'var(--k-blue)' }
});
