// Two kinds of page the Philippine profile adds to "around the house" (Yohann, 9 Nov 2026), drawn as expandable rows:
// - tours (content/tours.json "tours"): trips you book, not places: where they leave from, how long, the price, what is
//   included, and whether boats stop in bad weather. Booked at the front desk.
// - plans (content/plans.json "plans"): half and full days, their stops in order. A stop is a place of the guide
//   ("todo-patar": its map pin), a tour ("tours:hundred-islands") or just words (name{}).
// Their lists are not "items", so they are not map pins of their own (content.js).
import { t, tx } from '../i18n.js';
import { esc, ICON } from '../ui.js';
import { MAP_ITEMS } from '../content.js';
import { MORE_GUIDE_ICONS as GI } from './icons.js';

const TONE = k => `var(--tone-${k || 'blue'})`;
const fact = (label, v) => v ? `<div class="tfact"><small>${esc(t(label))}</small><span>${esc(tx(v))}</span></div>` : '';
const list = a => a?.length ? `<ul class="glist">${a.map(i => `<li>${esc(tx(i))}</li>`).join('')}</ul>` : '';
const maps = x => x.gmaps || (typeof x.lat === 'number' ? `https://www.google.com/maps/search/?api=1&query=${x.lat},${x.lng}` : '');

export function toursHTML(data) {
  return `<div class="mlist guide">${(data?.tours || []).map(x => `<details class="mrow" data-id="${esc(x.id)}" style="--cc:${TONE(x.tone)}"><summary>
      <span class="dot">${GI[x.icon] || GI.boat}</span>
      <span class="nm">${esc(tx(x.name))}${x.sub ? `<small>${esc(tx(x.sub))}</small>` : ''}</span><span class="rt"><span class="chev" aria-hidden="true"></span></span></summary>
      <div class="mbody">
        ${x.description ? `<p class="note">${esc(tx(x.description))}</p>` : ''}
        <div class="tfacts">${fact('tourFrom', x.from)}${fact('tourTime', x.duration)}${fact('tourPrice', x.price)}</div>
        ${x.includes?.length ? `<p class="note"><b>${esc(t('tourIncl'))}</b></p>${list(x.includes)}` : ''}
        ${list(x.notes)}
        ${x.weather ? `<p class="hnote">${esc(t('tourWeather'))}</p>` : ''}
        ${x.status === 'expected' ? `<p class="hnote">${esc(t('tourExpected'))}</p>` : ''}
        <div class="actions"><a class="btn primary" href="#s/emergency">${esc(t('tourBook'))}</a>${maps(x) ? `<a class="btn" href="${esc(maps(x))}" target="_blank" rel="noopener">${ICON.pin}Google Maps</a>` : ''}</div>
      </div></details>`).join('')}</div>`;
}

const stopLink = s => {
  if (s.ref?.startsWith('tours:')) return { href: '#s/tours', open: s.ref.slice(6) };
  const m = s.ref && MAP_ITEMS.find(i => i.id === s.ref);
  return m ? { href: '#map/m/' + encodeURIComponent(m.id), m } : null;
};
export function plansHTML(data) {
  return `<div class="mlist guide">${(data?.plans || []).map(p => `<details class="mrow" data-id="${esc(p.id)}" style="--cc:${TONE(p.tone)}"><summary>
      <span class="dot">${GI[p.icon] || GI.route}</span>
      <span class="nm">${esc(tx(p.name))}${p.sub ? `<small>${esc(tx(p.sub))}</small>` : ''}</span><span class="rt"><span class="chev" aria-hidden="true"></span></span></summary>
      <div class="mbody">
        ${p.description ? `<p class="note">${esc(tx(p.description))}</p>` : ''}
        <ol class="pstops">${(p.stops || []).map(s => { const l = stopLink(s), name = s.name ? tx(s.name) : l?.m ? tx(l.m.name) : s.ref;
          return `<li>${l ? `<a href="${l.href}"${l.open ? ` data-open="${esc(l.open)}"` : ''}><b>${esc(name)}</b></a>` : `<b>${esc(name)}</b>`}${s.note ? `<span>${esc(tx(s.note))}</span>` : ''}</li>`; }).join('')}</ol>
        ${list(p.tips)}
      </div></details>`).join('')}</div>`;
}
