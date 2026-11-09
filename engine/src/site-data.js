// Where a guide's data comes from. Built sites bundle sites/<site>/ at build time (offline-first).
// The shared viewer (/g/<name>) instead sets window.__GUIDE__ from the database before the app starts.
import SITE_FILE from '@site/site.json';
import { withProfiles } from './profiles.js';
const G = typeof window !== 'undefined' ? window.__GUIDE__ : null;
const byName = glob => Object.fromEntries(Object.entries(glob).map(([p, v]) => [p.match(/([\w-]+)\.json$/)[1], v]));
export const SITE = G ? G.site : SITE_FILE;
export const FILES = G ? G.files : byName(import.meta.glob('@site/content/*.json', { eager: true, import: 'default' }));
export const PRIVATE = G ? (G.private || {}) : byName(import.meta.glob('@site/private/*.json', { eager: true, import: 'default' }));
// The guide's own strings sit on top of its type's and its country's (src/profiles/), which sit on top of the engine's.
export const SITE_I18N = withProfiles(SITE, G ? (G.i18n || {}) : byName(import.meta.glob('@site/i18n/*.json', { eager: true, import: 'default' })));
