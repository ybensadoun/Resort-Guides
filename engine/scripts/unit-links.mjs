// A resort's own link and QR code for each unit (villa or room), so a guest opens straight on their own (Yohann, 9 Nov 2026:
// a QR code in each villa and the link in the booking message). The guide reads ?unit=<id> (src/resort/units.js).
//   npm run unit-links -- <site> [address]
// address: where the guide is published; site.json "url" once it is decided. Without one, a provisional address is used and
// the sheet says DRAFT: do not print it. Writes into sites/<site>/preview/ (git-ignored):
//   unit-qr-sheet.html   A4 sheet to print and cut, one card per unit: its name, its QR code, a line in each language
//   unit-links.txt       one link per unit and a booking-message line in each language, to paste
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import QR from 'qrcode';
import { siteDir, readSite } from '../site.config.js';

const [SITE, ADDR] = process.argv.slice(2);
if (!SITE) { console.error('Usage: npm run unit-links -- <site> [address]'); process.exit(1); }
const SD = siteDir(SITE), site = readSite(SITE);
const unitsFile = resolve(SD, 'content/units.json');
if (!existsSync(unitsFile)) { console.error(`${SITE} has no content/units.json: only resorts have units.`); process.exit(1); }
const { units = [], groups = [] } = JSON.parse(readFileSync(unitsFile, 'utf8'));
const base = (ADDR || site.url || `https://${site.slug}.netlify.app/`).replace(/\/?$/, '/');
const draft = !ADDR && !site.url;
const langs = site.languages;

// The sheet's few words, per language (the guide's own languages; English when one is missing).
const W = {
  en: { scan: 'Scan with your phone\'s camera for your guide', msg: 'Your guide for {unit}: the resort, check-out time and things to do nearby. {link}' },
  ko: { scan: '휴대폰 카메라로 스캔하면 가이드가 열려요', msg: '{unit} 가이드예요. 리조트 안내, 체크아웃 시간, 주변 즐길 거리를 볼 수 있어요. {link}' }
};
const w = l => W[l] || W.en;
const nm = (u, l) => (u.name || {})[l] || (u.name || {}).en || u.id;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const link = (u, l) => `${base}?unit=${encodeURIComponent(u.id)}${l && l !== langs[0] ? `&lang=${l}` : ''}`;

const ordered = [...groups.flatMap(g => units.filter(u => u.group === g.id)), ...units.filter(u => !groups.some(g => g.id === u.group))];
const cards = [];
for (const u of ordered) {
  const svg = await QR.toString(link(u), { type: 'svg', margin: 0, errorCorrectionLevel: 'M', color: { dark: '#122B4C', light: '#FFFFFF' } });
  cards.push(`<div class="card"><small>${esc(site.name)}</small><b>${esc(nm(u, langs[0]))}</b>${langs.slice(1).map(l => `<span lang="${l}">${esc(nm(u, l))}</span>`).join('')}
    <div class="qr">${svg}</div>${langs.map(l => `<p lang="${l}">${esc(w(l).scan)}</p>`).join('')}<code>${esc(link(u).replace(/^https?:\/\//, ''))}</code></div>`);
}
const html = `<!doctype html><html lang="${langs[0]}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(site.name)}: QR codes</title>
<style>
@page{size:A4;margin:10mm}
*{box-sizing:border-box}body{margin:0;font-family:system-ui,-apple-system,"Segoe UI","Apple SD Gothic Neo","Noto Sans KR",sans-serif;color:#122B4C;background:#fff}
.draft{margin:0 0 6mm;padding:3mm 4mm;border:1mm solid #BF5536;color:#BF5536;font-weight:700}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:0}
.card{height:68.5mm;padding:5mm;border:.3mm dashed #9AA6B8;display:flex;flex-direction:column;align-items:center;text-align:center;gap:.8mm;break-inside:avoid;overflow:hidden}
.card small{font-size:8pt;letter-spacing:.06em;text-transform:uppercase;color:#4C5A6E}
.card b{font-size:14pt;line-height:1.1}.card span{font-size:10pt}
.qr{width:32mm;height:32mm;margin:1.5mm 0}.qr svg{width:100%;height:100%}
.card p{margin:0;font-size:8.5pt;line-height:1.25;word-break:keep-all}
.card code{font-size:6.5pt;color:#4C5A6E;word-break:break-all;margin-top:auto}
@media screen{body{padding:12px;max-width:210mm;margin:0 auto}}
</style></head><body>
${draft ? `<p class="draft">DRAFT: the guide's address is not decided yet (${esc(base)} is provisional). Do not print these codes.</p>` : ''}
<div class="grid">${cards.join('\n')}</div></body></html>
`;
const txt = [`${site.name}: one link per unit${draft ? ' (DRAFT: provisional address, do not send)' : ''}`, '',
  ...ordered.flatMap(u => [nm(u, langs[0]), ...langs.map(l => `  ${l}: ${w(l).msg.replace('{unit}', nm(u, l)).replace('{link}', link(u, l))}`), ''])].join('\n');
const out = resolve(SD, 'preview');
mkdirSync(out, { recursive: true });
writeFileSync(resolve(out, 'unit-qr-sheet.html'), html);
writeFileSync(resolve(out, 'unit-links.txt'), txt);
console.log(`${ordered.length} units, address ${base}${draft ? ' (provisional: DRAFT)' : ''}\nWritten: sites/${SITE}/preview/unit-qr-sheet.html and unit-links.txt`);
