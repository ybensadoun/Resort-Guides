// Resorts: one guide, many units (villas or rooms) for different guests at once: content/units.json.
// The guest's own unit comes from the link (?unit=<id>, from a QR code in the villa or the booking message) or from the
// picker, and stays on this phone. This module runs before i18n.js and content.js (main.js imports it first): the unit's
// check-out time becomes the guide's, and its name replaces "Choose your room" on Home.
import { SITE, FILES, SITE_I18N } from '../site-data.js';

const U = FILES.units || {};
export const UNITS = U.units || [];
export const UNIT_GROUPS = U.groups || [];
const KEY = (SITE.storageKey || SITE.slug) + '-unit';
const find = id => UNITS.find(u => u.id === id) || null;

function chosen() {
  let u = null;
  try { u = new URLSearchParams(location.search).get('unit'); } catch (e) { /* no URL */ }
  if (find(u)) { try { localStorage.setItem(KEY, u); } catch (e) { /* storage blocked: the link keeps it */ } return u; }
  try { return localStorage.getItem(KEY); } catch (e) { return null; }
}
export const UNIT = UNITS.length ? find(chosen()) : null;

// Picking (or changing) a unit reloads the guide on its page, so every screen and string follows it. The unit also goes
// into the address, which keeps it when the phone does not allow storage.
export function chooseUnit(id) {
  try { if (id) localStorage.setItem(KEY, id); else localStorage.removeItem(KEY); } catch (e) { /* see above */ }
  const u = new URL(location.href);
  if (id) u.searchParams.set('unit', id); else u.searchParams.delete('unit');
  u.hash = '#s/house';
  history.replaceState(null, '', u.pathname + u.search + u.hash);
  location.reload();
}

const house = FILES.house;
if (UNIT) {
  if (house && UNIT.checkout) house.checkout = UNIT.checkout;
  if (house && UNIT.checkin) house.checkin = UNIT.checkin;
  for (const l of SITE.languages || ['en']) SITE_I18N[l] = { ...SITE_I18N[l], seeHouse: (UNIT.name || {})[l] || (UNIT.name || {}).en || UNIT.id };
} else if (UNITS.length && house) delete house.checkout;   // no unit chosen yet: Home shows no check-out time rather than a wrong one
