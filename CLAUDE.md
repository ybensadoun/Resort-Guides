# Resort Guides: the guest guide for resorts (RESORTS)

Read first: `../CLAUDE.md` (shared rules: publishing, privacy, languages, curation, UX), then `../PROJECTS.md` and `../CHANGES.md`, then `docs/plan.md` (what a resort guide is and every decision so far).
This repo is PUBLIC (ybensadoun/resort-guides). No keys, no real resort's content, no business plans in it. Who the resorts are and the demand: `../BACKLOG.md`.

## What it is
A guest guide for a resort: one site with many villas or rooms and different guests at once, starting in the Philippines. Apart from Guest Guide Maker for now; built so it merges into it later. Like Ca La Kimberly: one perfect guide by hand first, the maker after.

## The model (Yohann, 9 Nov 2026)
A guide = type (home or resort) x country (Spain, Philippines, more later), each a data profile that switches sections, research and defaults on or off. "Around the house" is common to both types and changes by country; "at the house" changes by type. Details: `docs/plan.md`.

## Rules for this project
- Never change `../Guest Guides/engine/`, `onboarding-site/` or `worker/` for this project without Yohann's OK: a change there reaches every live guide. This repo works on its own copy of the engine (`engine/UPSTREAM.md` gives the commit it came from and lists every change made to copied files).
- New resort and country code goes in new files; changes to copied engine files stay small and are listed in `engine/UPSTREAM.md`, so the merge back is a checklist.
- Real resorts' content stays out of git: only `sites/demo-*` (made up) is committed. Wi-Fi in `sites/<site>/private/` (ignored), keys in `.env` (ignored).
- Resort exceptions to the shared rules (Yohann, 9 Nov 2026): the guide shows the official front desk channels the resort publishes (never a staff member's own number) and the resort's real pin. Homes keep their rules.
- Languages of the Philippine profile: English and Korean. Check at 360 px in Korean and English. A Korean reader checks before a real guest sees it.
- Same writing rules as every project: no em-dashes, "expected" for anything not confirmed, existence rule for every place outside the resort (`../Guest Guides/docs/CURATION.md`), UX rules (`../Guest Guides/docs/UX-GUIDELINES.md`).
- Commit when built and checked; Yohann pushes (GitHub Desktop). Nothing is live yet: how a guide is published is decided in step 4 of the plan.

## Commands (from this folder, Node 20+; same as Guest Guides)
| Command | What |
|---|---|
| `npm ci` | install (once) |
| `npm run build -- <site>` | content check + build into `sites/<site>/dist` |
| `npm run check -- <site>` | content check only (strings in every language, profiles, em-dashes, typography) |
| `npm run dev -- <site>` | local server |
| `npm run preview-file -- <site>` | one self-contained HTML in `sites/<site>/preview/` to open or send |
| `node engine/scripts/ux-check.mjs <site>` | must print "UX check OK": every page, and every unit of a resort, at 360/390/430 px in every language. Needs `npm i --no-save playwright@1.64.1` (the version whose browser is installed on Yohann's Mac) |

## Where things are
- `engine/`: the copied engine. `engine/UPSTREAM.md`: where it comes from and every change for the merge. Resort and country code: `engine/src/resort/`, `engine/src/profiles/`, `engine/src/styles/resort.css`.
- The first resort's folder in `sites/` (Mac only, git-ignored; who it is: `../BACKLOG.md`): the first guide. `docs/sources.json` (every place, its source and Google status), `docs/questions-for-the-resort.md`.
- A unit's own link: `?unit=<id>` (ids in `content/units.json`), for a QR code in each villa.
