# Phoebe Dawson Foundation Website

This repository contains the public-facing Phoebe Dawson Foundation website.

The current site is an Astro project with mostly static content. It also still contains some older Netlify, Stripe, and Airtable code from the original WWPD swimwear ordering flow. There is also a separate Vercel/Supabase admin app that can update content in this repo, but that app is not part of this codebase.

## Start Here

- Read [HANDOFF.md](./HANDOFF.md) for the maintainer walkthrough.
- Use this README for the quick project snapshot.
- Treat [SETUP_GUIDE.md](./SETUP_GUIDE.md), [QUICK_REFERENCE.md](./QUICK_REFERENCE.md), [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md), and [AIRTABLE_SETUP.md](./AIRTABLE_SETUP.md) as legacy order-system documentation unless you are intentionally reviving that flow.

## Current Stack

- Astro 4
- Shared layout/components in `src/`
- Static assets in `public/assets/`
- Netlify adapter/config still present in the repo

## Quick Start

Install dependencies:

```bash
npm install
```

Run the Astro dev server:

```bash
npm run dev
```

Build the site:

```bash
npm run build
```

If you ever need to work on the legacy Netlify functions locally, use `netlify dev` instead of `npm run dev`.

## Project Shape

```text
src/
  components/    Shared navigation, footer, CTA components
  layouts/       Shared page shell
  pages/         Public site pages
  styles/        Global styling
public/assets/   Images and logos
netlify/
  functions/     Legacy Stripe/Airtable/serverless handlers
admin.html       Legacy order admin page
success.html     Legacy Stripe success page
cancel.html      Legacy Stripe cancel page
```

## Current Content Model

- Most page content is hardcoded directly inside the `.astro` page files.
- Shared navigation, social links, and donate links live in `src/components/`.
- Styling is mostly centralized in `src/styles/global.css`, with some page-level styles inline in each `.astro` file.
- The newsletter signup backend exists, but the signup forms are currently commented out in the UI.

## External Systems

- Separate Vercel/Supabase admin app: not in this repo, but it has access to this repo.
- Australian Communities Foundation donation page: linked directly in multiple components/pages.
- Legacy Airtable/Stripe integrations: only relevant if the old WWPD order flow is brought back.

## Verification

The Astro production build currently succeeds with:

```bash
npm run build
```
