# Maintainer Handoff

This document is the quickest way for a new maintainer to get oriented in this repo without having to reconstruct the project's history from scratch.

## Project Story

Owner context, combined with what is visible in the repo today:

- The project started as a quick, time-limited site to take orders for Phoebe-branded swimwear ahead of a charity swim.
- That first version appears to have been built as plain HTML with Netlify functions, Stripe Checkout, and Airtable.
- The site was later reshaped into an Astro site for the broader Phoebe Dawson Foundation.
- A separate Vercel/Supabase admin app now has access to this repo so foundation members can make content updates.
- That admin app is entirely separate and is not included here.

## What This Repo Is Today

At the moment, this repo is best understood as:

- A public-facing Astro website for the foundation
- Mostly static content with images and page copy kept directly in source files
- Still carrying legacy order-system code from the earlier WWPD swimwear phase

Important boundary:

- There is no Vercel app code in this repo.
- There is no Supabase client or schema code in this repo.
- The repo is still configured for Netlify builds/functions, even though some of that functionality is now legacy.

## First Files To Read

If you are new to the codebase, read these in this order:

1. `README.md`
2. `src/layouts/BaseLayout.astro`
3. `src/styles/global.css`
4. `src/components/Sidebar.astro`
5. `src/components/Footer.astro`
6. `src/pages/index.astro`
7. The remaining files in `src/pages/`

That path gives you the shell, styles, shared nav/footer, homepage composition, and then the rest of the content pages.

## Repo Map

### Current site

- `src/pages/index.astro`
  Homepage with hero, mission summary, stats, and event promotion.
- `src/pages/about.astro`
  Longer biographical story about Phoebe.
- `src/pages/mission.astro`
  Mission and values page.
- `src/pages/impact.astro`
  Foundation contributions and memorial projects.
- `src/pages/events.astro`
  Events page with 2026 event copy and past-event recap.
- `src/layouts/BaseLayout.astro`
  Shared page chrome, layout wrapper, scripts, and footer inclusion.
- `src/components/`
  Sidebar, mobile nav, footer, and floating donate CTA.
- `src/styles/global.css`
  Global styling for layout, sections, shared components, and responsive behavior.
- `public/assets/`
  Logos, photos, and supporting imagery.

### Legacy artifacts still in the repo

- `admin.html`
  Legacy order admin page for viewing/exporting WWPD swimwear orders.
- `success.html`
  Legacy Stripe checkout success page.
- `cancel.html`
  Legacy Stripe checkout cancel page.
- `netlify/functions/create-checkout-session.js`
  Legacy Stripe Checkout session creation for swimwear orders.
- `netlify/functions/stripe-webhook.js`
  Legacy webhook that writes paid orders into Airtable.
- `netlify/functions/get-orders.js`
  Legacy Airtable order fetch for the admin page.
- `netlify/functions/subscribe.js`
  Newsletter signup handler that still exists, although the visible forms are commented out in the UI.
- `netlify/functions/scrape-cole-classic.js`
  Standalone helper function related to event data scraping.

## How Content Is Managed

The simplest mental model is:

- Most visible copy is hardcoded directly into `.astro` page files.
- Shared repeated links and labels are in components.
- Images live in `public/assets/`.
- Some styles are global, and some pages include local `<style>` blocks.

That means simple content edits are usually straightforward:

- Page copy: edit the relevant file in `src/pages/`
- Donate or social links: check `src/components/`
- Shared visual/layout adjustments: start in `src/styles/global.css`
- Page-specific layout tweaks: check the page's inline `<style>` block

## Local Development

Standard site development:

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Legacy serverless development:

```bash
netlify dev
```

Use `netlify dev` only if you are actively working on Netlify functions or old Stripe/Airtable behavior. For normal page/content work, `npm run dev` is enough.

## Environment Variables

The current public Astro pages do not require runtime environment variables for basic local development.

Legacy Netlify functions do use these variables:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `AIRTABLE_API_KEY`
- `AIRTABLE_BASE_ID`
- `AIRTABLE_TABLE_NAME`
- `AIRTABLE_SUBSCRIBERS_TABLE`
- `CURRENCY`

Those are only necessary if someone is reviving or testing the older Stripe/Airtable flows.

## Important External Dependencies

### Separate admin app

- The Vercel/Supabase admin app is external to this repo.
- It has access to this repo, but none of its source code lives here.
- If content appears to be changed by a system outside this repo, that is expected.

### Donation flow

- The live donation CTA points to the Australian Communities Foundation page.
- That URL is currently hardcoded in multiple places rather than centralized.

### Netlify

- The repo still includes `netlify.toml` and uses the Netlify Astro adapter.
- That suggests the site has been deployed via Netlify at some point, and may still be.
- Deployment ownership and the current production path should be confirmed with the owner if changes need to go live.

## Legacy Documentation

These root docs are about the earlier WWPD order system, not the current day-to-day site:

- `SETUP_GUIDE.md`
- `QUICK_REFERENCE.md`
- `DEPLOYMENT_CHECKLIST.md`
- `AIRTABLE_SETUP.md`

They are still useful as historical references if the order system is ever restored, but they should not be treated as the primary documentation for the current website.

## Known Maintenance Hotspots

These are the first places I would expect future cleanup or refactoring:

- Repeated donation URL across several files
- Newsletter signup script still initialized even though the forms are commented out
- Legacy order-system pages and docs sitting next to the current Astro site
- Large amounts of page copy embedded directly in page components

None of those are emergencies, but they are useful context before making bigger changes.

## Good First Improvements

If a new maintainer wants a safe starting point, these are sensible first tasks:

1. Centralize the donation URL in one shared config/module.
2. Decide whether the newsletter flow is coming back; if not, remove dead form code and the unused function.
3. Move legacy order-system docs and files into a `legacy/` or `archive/` area once everyone is comfortable they are no longer needed.
4. Document how the separate admin app writes into this repo so future maintainers know what to expect.

## Open Questions Worth Confirming With The Owner

These are the main things the codebase does not answer by itself:

1. Which environment is the current production site deployed from?
2. Which files the external Vercel/Supabase app edits automatically or programmatically?
3. Whether the legacy WWPD order flow is retired permanently or should stay recoverable.
4. Whether newsletter signup is expected to come back.

## Verification Done For This Handoff

I verified that the Astro build currently completes successfully with:

```bash
npm run build
```

That confirms the current site builds cleanly in its present state.
