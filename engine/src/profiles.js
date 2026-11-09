// A guide = a type (home or resort) x a country (es, ph...): site.json "type" and "country" (home and es when missing).
// Each is a profile in src/profiles/: its own words for the engine's strings, and what it switches on or off
// (read by the content check, later by the maker). Strings: engine < type < country < the guide's own i18n.
const load = glob => Object.fromEntries(Object.entries(glob).map(([p, v]) => [p.match(/([\w-]+)\.json$/)[1], v]));
export const TYPES = load(import.meta.glob('./profiles/types/*.json', { eager: true, import: 'default' }));
export const COUNTRIES = load(import.meta.glob('./profiles/countries/*.json', { eager: true, import: 'default' }));

export const profileOf = site => ({ type: TYPES[site.type || 'home'] || TYPES.home, country: COUNTRIES[site.country || 'es'] || COUNTRIES.es });

export function withProfiles(site, own) {
  const { type, country } = profileOf(site);
  const langs = new Set([...Object.keys(type.i18n || {}), ...Object.keys(country.i18n || {}), ...Object.keys(own || {})]);
  return Object.fromEntries([...langs].map(l => [l, { ...(type.i18n || {})[l], ...(country.i18n || {})[l], ...(own || {})[l] }]));
}
