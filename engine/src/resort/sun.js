// Today's sunset at the guide's place, worked out on the phone (no service, works offline), shown on Home when site.json
// has "sunset": {"plan": "<plan id>"} (the plan that says where to watch it). Times in the country's time zone
// (src/profiles/countries/*.json "timezone"), so a phone still on its home time shows the resort's time.
// Formulas after NOAA's, as in the SunCalc library (Vladimir Agafonkin): accurate to about a minute.
import { t, locale } from '../i18n.js';
import { esc } from '../ui.js';
import { SITE, FILES } from '../site-data.js';
import { profileOf } from '../profiles.js';

const rad = Math.PI / 180, DAY = 864e5, J1970 = 2440588, J2000 = 2451545, E = rad * 23.4397, J0 = 0.0009;
const toDays = d => d.valueOf() / DAY - 0.5 + J1970 - J2000;
const fromJulian = j => new Date((j + 0.5 - J1970) * DAY);
const transit = (ds, M, L) => J2000 + ds + 0.0053 * Math.sin(M) - 0.0069 * Math.sin(2 * L);

export function sunsetAt(date, lat, lng) {
  const lw = rad * -lng, phi = rad * lat, n = Math.round(toDays(date) - J0 - lw / (2 * Math.PI));
  const ds = J0 + lw / (2 * Math.PI) + n, M = rad * (357.5291 + 0.98560028 * ds);
  const L = M + rad * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M)) + rad * 102.9372 + Math.PI;
  const dec = Math.asin(Math.sin(E) * Math.sin(L));
  const w = Math.acos((Math.sin(-0.833 * rad) - Math.sin(phi) * Math.sin(dec)) / (Math.cos(phi) * Math.cos(dec)));
  return fromJulian(transit(J0 + (w + lw) / (2 * Math.PI) + n, M, L));
}

// The key fact under the house card: "Sunset today 17:32", opening the plan that says where to watch it.
export function sunsetFact(now = new Date()) {
  const cfg = SITE.sunset, h = FILES.house;
  if (!cfg || !h || typeof h.lat !== 'number') return '';
  const tz = profileOf(SITE).country.timezone;
  const time = sunsetAt(now, h.lat, h.lng).toLocaleTimeString(locale(), { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', ...(tz ? { timeZone: tz } : {}) });
  return `<a href="#s/${esc(cfg.section || 'plans')}" data-open="${esc(cfg.plan || 'sunset')}"><small>${esc(t('qSunset'))}</small><b>${esc(time)}</b></a>`;
}
