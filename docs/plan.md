# Resort guides: plan (agreed with Yohann, 9 Nov 2026)

A guest guide for a resort: one site with many villas or rooms, and different guests at once. It starts in the Philippines. It stays apart from Guest Guide Maker until it works, then merges into it. Like Ca La Kimberly, we first build one perfect guide by hand, then work out the maker.

Who the first resort is, and the demand behind it, is in `../BACKLOG.md` (the private notes folder), never in this public repo.

## Decisions (Yohann, 9 Nov 2026)
1. **First resort:** a villa resort with two sites on mainland Luzon in the Philippines. Its guests rent whole villas (private pools, full kitchens), arrive by car or bus from Manila (5 to 6 hours), and share pools, a restaurant and bar, and a front desk.
2. **The model:** a guide = **type** (home or resort) x **country** (Spain, Philippines, more later). Each is a data profile that switches sections, research and defaults on or off. Everything "around the house" is common to homes and resorts and changes by country. What is "at the house" (amenities, Wi-Fi, check-in, rules) changes by type: a resort is "one site with many villas or rooms for different guests" (Yohann).
3. **Code:** this repo, `Resort Guides`, next to `Guest Guides`, public on GitHub (ybensadoun/resort-guides). It starts from a copy of the Guest Guides engine pinned to a commit. Nothing in Guest Guides' `engine/`, `onboarding-site/` or `worker/` changes for this without Yohann's OK.
4. **Public repo, private content:** a real resort's content never goes into git. `sites/` holds only made-up demo resorts (`sites/demo-*`); real resorts' folders are ignored, like host answers in Guest Guides.
5. **Contact:** a resort guide shows the official front desk channels the resort itself publishes (hotlines with their hours, front office email, the resort's own WhatsApp or Viber), as one-tap buttons. Never a staff member's personal number. Homes keep "never tell guests to contact the host".
6. **Location:** a resort shows its real pin and directions (it is a business, on its own site and on Google Maps). Homes keep the pin offset of about 350 m.
7. **Languages:** the Philippine profile starts with English and Korean.
8. **Upkeep for now:** we build the guide (Yohann and a Claude session) from the resort's site and what it sends. The resort sends changes and a session applies them the same day. The resort's own editing comes with the maker.
9. **Approach:** like Ca La Kimberly, first one perfect guide by hand, then the maker (Yohann). The first one is the resort's site with the most online.
10. **How guests reach their unit:** a QR code in each villa and the link in the booking message, both opening the guide on that unit (`?unit=<id>`). `npm run unit-links -- <site> [address]` makes the printable QR sheet and the links with a booking-message line in each language. A unit's id is printed in its QR code: never rename one. Not printed until the guide's address is decided (the sheet says DRAFT until then).
11. **Around the resort, not Ca La Kimberly's places (Yohann, 9 Nov 2026):** tours you book (duration, price, departure, weather), half and full-day plans (stops in order), today's sunset on Home, local food instead of markets (the town market, what to try, what to bring home). Places you visit on your own stay as they are.
12. **Live fast on assumptions (Yohann, 9 Nov 2026):** the guide goes live with reasonable assumptions, marked expected; each is listed in the site's `docs/fix-later.md` and fixed from the owner's answers.

## What a resort guide holds that a home guide does not
These items are from the first resort's own pages and from research on Philippine resorts (9 Nov 2026). Anything not yet confirmed for the first resort is marked expected.

**At the resort (type: resort)**
- **Your villa or room.** The guest's own unit: photos, beds, amenities, Wi-Fi, check-in and check-out (at the first resort they differ by villa type), how things work in it. The unit comes from the link or the QR code in the villa (`?unit=<id>`), or a picker on first open, remembered on the phone.
- **The resort.** What everyone shares, with hours and rules: pools (no lifeguards, free life vests at the pool bar, leave the pool at thunder), the restaurant and bar, the beach club, the marina, parking (expected), accessibility (built on cliffs: many paths are not wheelchair friendly).
- **Eat and drink on site.** Each venue with its hours, delivery to the villa (expected), the menu (photos or a link). Resorts rarely put these hours online, so this is where the guide helps most.
- **What the resort books for you.** Guides, boats, van rental, massage (outside masseurs, book 3 days ahead), with how to book and the price when the resort gives one.
- **Front desk.** The official channels and their hours, and what to ask them for.
- **Resort rules.** Pets (a fee per night, not in the pools), children, no day visitors, own food and drinks (no corkage at the first resort), CCTV, quiet hours (expected).
- **Today.** A short notice the resort changes: weather, a cancelled boat, a closed pool, an event. The first thing on Home when there is one.
- **Paying.** Deposit, extras in cash at check-in, cards (the first resort: through PayPal), service charge (expected).

**At the house (type: home), not in a resort guide:** the host who is never contacted, self check-in, one house page, the house guide (appliances, heating), rubbish by day of the week, one Wi-Fi.

## Around the house: common to both types, by country
**Spain** stays exactly as Ca La Kimberly has it: weekly markets, rubbish rules, events, Getting around, 112, six languages.

**Philippines** (first version, all expected until checked for the first resort):
- **Things to do:** grouped as beaches, water and boats (island hopping, river cruises, snorkelling, diving), nature (falls, caves, viewpoints), culture (lighthouse, churches), each with "the front desk can book this" when the resort arranges it. Near the first resort: a white sand beach about 25 minutes away, falls, a lighthouse, caves, a mangrove river, a giant clam sanctuary on an island.
- **Food and supplies:** no market section with days. One short list: the town's public market (open daily), where to buy water, ice and drinks, for guests who cook in their villa.
- **Eat and drink outside the resort:** as in Spain, the host's (here: the resort's) own picks.
- **Events:** town fiestas and public holidays (Holy Week, All Saints, Christmas), not weekly ones.
- **Getting there and around:** from Manila by car (route, tolls, stops) and by bus (Victory Liner, Five Star); tricycles and their fares; vans to rent. For island resorts later: flights, boats, eTravel, local fees.
- **Weather and boats:** the rainy season (May to November at the first resort), PAGASA storm signals, and that the Coast Guard stops boats from Signal No. 1. What the resort does then.
- **Money:** pesos, cash for extras and tricycles, ATMs, GCash and Maya (expected).
- **Emergency:** 911, the nearest hospital and clinic, the Coast Guard (expected).
- **Practical:** power cuts and the generator, drinking water, plugs (expected types A, B and C at 220 V).

Every place outside the resort follows the existence rule (`Guest Guides/docs/CURATION.md`): a source under 2 years old or a live Google Maps listing, recorded in the site's `docs/sources.json`.

## Who sets it up and keeps it current
- **Now:** Yohann and a Claude session build the guide from the resort's site and what it sends, then list what is missing to ask the resort (venue hours, Wi-Fi per villa, the villa list, menus). The resort sends changes (WhatsApp or email, as it prefers) and a session applies them.
- **With the maker (later, expected):** the owner or general manager sets the guide up. Front office or guest relations keep the daily parts current: Today, venue hours, activities. Small resorts are expected to have the owner do both. Resorts already tell guests about changes on WhatsApp, Viber, Messenger and boards, so a change should take one minute from a phone.

## How the code is set up
- `engine/`: a copy of `Guest Guides/engine` at 801ac30 (9 Nov 2026), recorded in `engine/UPSTREAM.md`.
- New code is in new files: `engine/src/resort/` (units, picker, Today notice, tile and row icons), `engine/src/styles/resort.css`, `engine/src/profiles.js` with `engine/src/profiles/types/{home,resort}.json` and `countries/{es,ph}.json`, `engine/src/i18n/ko.json`.
- Every change to a copied file is listed in `engine/UPSTREAM.md` with its reason, and kept small (a few lines in main.js, section.js, home.js, events.js, the language list, the two checks).
- A guide's data has the same shape as a Guest Guides site (`site.json`, `content/*.json`, `i18n/`), plus `site.type`, `site.country` and `content/units.json`. That is also the shape of a `guides` row in the database, so the merge moves the data without converting it.
- Each section says where it applies (`types`, `countries`), so the profiles switch it on or off.

## Korean
- Screen text in Korean (`ko.json`, every key the English file has) and the guide's content translated.
- Fonts: the phone's own Korean fonts (Apple SD Gothic Neo on iPhone, Noto Sans KR on Android), nothing large to download, so the guide still works offline. `resort.css` gives each bundled Latin font the Korean sans for Hangul only; without it the browser drew Korean headings in a thin serif. Checked in Chromium on a Mac; to check on a real iPhone and Android phone.
- Wording: 해요체 (the friendly polite form), as German says du.
- Line breaks: Korean breaks between words (`word-break: keep-all`), never inside one, as the UX rules ask.
- Checks: the UX check at 360 px in Korean and English for Philippine guides (de and fr stay the check for Spain).
- Nobody on our side reads Korean (expected): a Korean reader checks the guide before a real guest sees it.

## Steps
1. Done 9 Nov 2026: this plan, the repo, the notes in `Ca La Kimberly`.
2. Done 9 Nov 2026: the engine copied and pinned; `site.type` and `site.country` with their profiles; the unit picker and the unit's page; the Today notice; Korean (screen text, fonts, line breaks, date ranges). Still to do: a made-up demo resort (`sites/demo-*`), so the public repo has a guide anyone can build.
3. Done 9 Nov 2026: the first resort (its first site), locally and git-ignored, from its public site and Google (22 units, 8 things to do, 3 events, front desk and emergencies, getting here, good to know). Content check and UX check OK in English and Korean, every unit's page included. What to ask the resort: `sites/<its folder>/docs/questions-for-the-resort.md` (on Yohann's Mac only).
4. Done 9 Nov 2026 (Yohann: live fast on assumptions): the first guide is live at its own Netlify address, uploaded from the Mac, public but out of search engines until the owner has checked it. QR sheet and booking links made with that address. Next: the owner's answers (the site's `docs/fix-later.md`), then search engines on.
5. Once the guide is right: plan the merge into Guest Guide Maker (profiles and sections into the engine, "What kind of place" and "Which country" in the builder and editor, the guide into the database).

## Open, to ask Yohann one at a time
- Whether the resort's Wi-Fi is one network for the site or one per villa (ask the resort).
- A phone that adds the guide to its home screen keeps its own storage on iPhone (expected): the villa is asked again there. The QR link could carry it into the home-screen app later.
