// What resorts show that homes do not: the unit picker, the guest's unit as a house page, and the Today notice.
import { t, tx, lang } from '../i18n.js';
import { esc } from '../ui.js';
import { FILES } from '../site-data.js';
import { UNITS, UNIT, UNIT_GROUPS, chooseUnit } from './units.js';

const L = s => ({ [lang]: s, en: s });
const groupName = u => tx((UNIT_GROUPS.find(g => g.id === u.group) || {}).name);
const facts = u => [
  u.bedrooms ? t(u.bedrooms === 1 ? 'u_bedroom1' : 'u_bedrooms', { n: u.bedrooms }) : '',
  u.sleeps ? t('u_sleeps', { n: u.sleeps }) : ''
].filter(Boolean);

// "Where are you staying?": every unit by group, one tap each.
export function unitPicker() {
  const groups = UNIT_GROUPS.length ? UNIT_GROUPS : [{ id: undefined }];
  return `<p class="lead">${esc(t('unitPickLead'))}</p>${groups.map(g => {
    const list = UNITS.filter(u => u.group === g.id);
    return list.length ? `<section class="upick">${g.name ? `<h3 class="section-h">${esc(tx(g.name))}</h3>` : ''}
      <div class="ulist">${list.map(u => `<button type="button" class="urow" data-unit="${esc(u.id)}"><b>${esc(tx(u.name))}</b><small>${esc(facts(u).join(' · '))}</small><span class="chev go-r" aria-hidden="true"></span></button>`).join('')}</div></section>` : '';
  }).join('')}`;
}

// The guest's unit in the shape of a house page (content/house-page.json), so the engine's house page draws it.
export function unitPage(u = UNIT) {
  const pool = u.pool === 'private' ? t('u_privatePool') : u.pool === 'shared' ? t('u_sharedPool') : '';
  const food = u.breakfast ? t('u_breakfast') : u.kitchen ? t('u_kitchen') : u.kitchen === false ? t('u_noKitchen') : '';
  return {
    photos: u.photos || [],
    summary: L([groupName(u), ...facts(u)].filter(Boolean).join(' · ')),
    description: u.about,
    highlights: [
      pool && { icon: 'pool', t: L(pool), s: u.poolNote },
      food && { icon: 'flame', t: L(food), s: u.foodNote },
      (u.checkin || u.checkout) && { icon: 'key', t: L(t('u_checkin', { time: u.checkin || '?' })), s: L(t('u_checkout', { time: u.checkout || '?' })) }
    ].filter(Boolean),
    beds: u.beds,
    amenities: u.amenities?.length ? [{ t: L(t('amenH')), items: u.amenities }] : null,
    amenFirst: 8
  };
}

// Over the unit's page: which unit this is, and a way to change it (another villa, or a phone handed on).
export const unitBar = () => UNIT ? `<div class="ubar"><span><small>${esc(t('unitYours'))}</small><b>${esc(tx(UNIT.name))}</b></span><button type="button" class="btn" data-unit-change>${esc(t('unitChange'))}</button></div>` : '';

document.addEventListener('click', e => {
  const b = e.target.closest('[data-unit],[data-unit-change]');
  if (b) chooseUnit(b.dataset.unit || null);
});

// Today: what the resort wants every guest to know now (weather, a closed pool, a cancelled boat), on top of Home.
// content/notice.json items: {id, from, until (YYYY-MM-DD, both days included), tone, title{}, body{}}.
export function noticeHTML(now = new Date()) {
  const d = now.toLocaleDateString('sv');
  const on = ((FILES.notice || {}).items || []).filter(n => (!n.from || n.from <= d) && (!n.until || d <= n.until));
  return on.map(n => `<section class="notice" data-tone="${esc(n.tone || 'blue')}"><small>${esc(t('noticeH'))}</small><b>${esc(tx(n.title))}</b>${n.body ? `<p>${esc(tx(n.body))}</p>` : ''}</section>`).join('');
}
