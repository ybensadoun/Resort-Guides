# Where this engine comes from

A copy of `Guest Guides/engine` (ybensadoun/guest-guides), so resort guides never touch the live guides.

- Copied on 9 Nov 2026 from guest-guides `801ac30b49dbf17da37ff2891e66a157a8d47a8d` ("The maker's language in its address: ?lang=ca to share one version", 7 Nov 2026), with its `package.json` and `package-lock.json`.
- To see everything this project changed in copied files: check out that commit in Guest Guides, then `diff -ru "../Guest Guides/engine" engine`.
- Checked on 9 Nov 2026: Ca La Kimberly's site, built with this engine, passes the content check and the UX check (44 markets, 6 languages).

## Merge back: every change to a copied file, and why
Keep this list current. New files move over as they are.

### New files
- `src/profiles.js`, `src/profiles/types/{home,resort}.json`, `src/profiles/countries/{es,ph}.json`: a guide = type x country (site.json `type`, `country`). Each profile has its own strings (engine < type < country < the guide's own) and the sections it allows (the content check enforces them).
- `src/resort/`: `units.js` (the guest's villa or room: `content/units.json`, `?unit=<id>`, kept on the phone; runs before i18n.js), `picker.js` (the unit picker, the unit drawn as a house page, the Today notice from `content/notice.json`), `looks.js` (the Good to know tile), `icons.js` (row icons: money, plug, bus, plane, boat, weather, shield, bell, family), `index.js`.
- `src/styles/resort.css`: picker, unit bar, Today notice, Korean line breaks (`keep-all`) and Korean fonts (the phone's Korean sans for Hangul only, one face per bundled weight).
- `src/resort/trips.js` (kinds `tours` and `plans`), `src/resort/sun.js` (today's sunset, worked out on the phone, as a key fact on Home when site.json has `sunset`).
- `scripts/unit-links.mjs` (`npm run unit-links`): a resort's QR sheet and booking links, one per unit.
- `src/i18n/ko.json`: every engine string in Korean (해요체, the friendly polite form). To be checked by a Korean reader.

### Changed copied files
- `site.config.js`: `ENGINE_LANGS` has `ko`.
- `src/i18n.js`: `LANG_NAMES` and `LOCALES` have `ko`.
- `src/site-data.js`: `SITE_I18N` goes through `withProfiles` (type and country strings under the guide's own).
- `src/main.js`: imports `styles/resort.css` after `map.css`, and `resort/index.js` before `i18n.js`.
- `src/views/section.js`: imports from `resort/`; a resort's house page is the guest's unit (`unitPage`), or the picker when none is chosen, with the unit bar on top; the photo gallery only when there are photos; info pages show the photo link to the house only on the house guide (`message`) and only with a photo (Ca La Kimberly unchanged: its only info page is `message`, with a photo); `GUIDE_ICON` takes `MORE_GUIDE_ICONS`; kinds `tours` and `plans` (resort/trips.js); highlights can use the `key` icon.
- `src/views/home.js`: the Today notice under the house card; the sunset key fact; quick tile icons `desk` and `market`.
- `src/events.js`: `dateRange` uses the locale's own range for month-first languages (Korean: 12월 16일~24일). Other languages unchanged.
- `src/groups.json`: group `water` (Boats & water, tone pink).
- `src/i18n/{en,es,fr,ca,de,nl}.json`: 32 new keys (`unitPickLead`, `unitYours`, `unitChange`, `u_*`, `noticeH`, `g_water`, `goodToKnow*`, `c_desk`, `qSunset`, `tours*`, `plans*`, `foodLocal*`, `tour*`).
- `src/profiles/countries/*.json`: `timezone` (the sunset time is shown in it).
- `scripts/check-content.js`: reads the profiles (they must exist, their strings count, each live section must be one they allow); lints `ko` texts.
- `scripts/ux-check.mjs`: visits every section of the guide, and for a resort Home and the page of every unit.

### Not changed, to look at with the merge
- Times are shown as 24 h (15:00). The Philippines writes 3:00 PM: a country setting later.
- The map has no pin for the house (homes hide it on purpose). A resort could show its real one.
- `viewer.js` (the shared viewer) and the database path are untouched: a resort guide is a built site for now.
