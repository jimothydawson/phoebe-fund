# Deployment Checklist

Use this checklist to ensure everything is set up correctly before going live.

## ☐ Pre-Deployment Setup

### Stripe Account
- [ ] Created Stripe account
- [ ] Business profile completed
- [ ] Test mode enabled (for initial testing)
- [ ] Copied test publishable key (`pk_test_...`)
- [ ] Copied test secret key (`sk_test_...`)

### Airtable Setup
- [ ] Created Airtable account
- [ ] Created new base: "WWPD Budgie Smuggler Orders"
- [ ] Created "Orders" table with all required fields:
  - [ ] Name (Single line text)
  - [ ] Email (Email)
  - [ ] Sex (Single select: Men's, Women's)
  - [ ] Size (Single select: S, M, L)
  - [ ] Stripe Payment ID (Single line text)
  - [ ] Amount (Currency - AUD)
  - [ ] Payment Status (Single select: pending, paid, failed)
  - [ ] Order Date (Created time)
- [ ] Created Personal Access Token with correct scopes
- [ ] Copied API key (`patABC...`)
- [ ] Copied Base ID (`appXYZ...`)

### Local Environment
- [ ] Installed Node.js
- [ ] Ran `npm install`
- [ ] Created `.env` file
- [ ] Added all environment variables to `.env`:
  - [ ] STRIPE_PUBLISHABLE_KEY
  - [ ] STRIPE_SECRET_KEY
  - [ ] AIRTABLE_API_KEY
  - [ ] AIRTABLE_BASE_ID
  - [ ] AIRTABLE_TABLE_NAME
  - [ ] BUDGIE_PRICE
  - [ ] CURRENCY

### Local Testing
- [ ] Installed Netlify CLI: `npm install -g netlify-cli`
- [ ] Ran `netlify dev` successfully
- [ ] Visited http://localhost:8888
- [ ] Filled out order form
- [ ] Used test card: 4242 4242 4242 4242
- [ ] Payment completed successfully
- [ ] Redirected to success page
- [ ] (Optional) Order appeared in Airtable

## ☐ Netlify Deployment

### Repository Setup
- [ ] Code pushed to GitHub
- [ ] Repository is accessible

### Netlify Site Creation
- [ ] Logged into Netlify
- [ ] Connected GitHub repository
- [ ] Site deployed successfully
- [ ] Noted site URL: `https://______.netlify.app`

### Environment Variables in Netlify
- [ ] Added `STRIPE_PUBLISHABLE_KEY`
- [ ] Added `STRIPE_SECRET_KEY`
- [ ] Added `AIRTABLE_API_KEY`
- [ ] Added `AIRTABLE_BASE_ID`
- [ ] Added `AIRTABLE_TABLE_NAME`
- [ ] Added `BUDGIE_PRICE` (5000 for $50 AUD)
- [ ] Added `CURRENCY` (aud)
- [ ] Triggered redeploy after adding env vars

### Stripe Webhook Setup
- [ ] Went to https://dashboard.stripe.com/webhooks
- [ ] Clicked "Add endpoint"
- [ ] Entered webhook URL: `https://your-site.netlify.app/.netlify/functions/stripe-webhook`
- [ ] Selected events:
  - [ ] `checkout.session.completed`
  - [ ] `payment_intent.payment_failed`
- [ ] Created endpoint
- [ ] Copied webhook signing secret (`whsec_...`)
- [ ] Added `STRIPE_WEBHOOK_SECRET` to Netlify env vars
- [ ] Redeployed site

## ☐ End-to-End Testing

### Test Order Flow
- [ ] Visited live site
- [ ] Navigated to order form
- [ ] Filled out all fields
- [ ] Used test card: 4242 4242 4242 4242
- [ ] Clicked "Proceed to Payment"
- [ ] Completed Stripe Checkout
- [ ] Redirected to success page
- [ ] Confirmed order appears in Airtable

### Test Admin Panel
- [ ] Visited `/admin.html`
- [ ] Orders displayed correctly
- [ ] Stats showing correct numbers
- [ ] Export CSV works
- [ ] CSV contains correct data

### Test Webhooks
- [ ] Made test order
- [ ] Went to Stripe Dashboard → Webhooks
- [ ] Clicked on webhook endpoint
- [ ] Verified `checkout.session.completed` event succeeded
- [ ] Checked response is 200 OK

## ☐ Final Checks

### Content Review
- [ ] Site title correct
- [ ] Navigation links work
- [ ] Order form has correct:
  - [ ] Price ($50 AUD)
  - [ ] Size options (S, M, L)
  - [ ] Style options (Men's, Women's)
- [ ] Success page messaging appropriate
- [ ] Cancel page messaging appropriate

### Functionality
- [ ] All navigation links work
- [ ] Smooth scrolling to sections works
- [ ] Form validation works
- [ ] Mobile responsive design looks good
- [ ] Desktop layout looks good

### Security
- [ ] `.env` file not in Git
- [ ] API keys not exposed in code
- [ ] Webhook signature verification enabled
- [ ] HTTPS enabled (automatic on Netlify)

## ☐ Going Live (When Ready)

### Stripe Live Mode
- [ ] Completed Stripe account verification
- [ ] Switched to Live Mode in Stripe
- [ ] Got live API keys
- [ ] Updated `STRIPE_PUBLISHABLE_KEY` in Netlify (pk_live_...)
- [ ] Updated `STRIPE_SECRET_KEY` in Netlify (sk_live_...)
- [ ] Created new webhook for live mode
- [ ] Updated `STRIPE_WEBHOOK_SECRET` in Netlify
- [ ] Redeployed site
- [ ] Made small real test purchase
- [ ] Verified order in Airtable
- [ ] Verified actual charge in Stripe

### Launch
- [ ] Announced order system to friends/family
- [ ] Shared direct link to order form
- [ ] Monitoring orders in Airtable
- [ ] Ready to export CSV for bulk order

## ☐ Optional Enhancements

### Additional Features (if needed)
- [ ] Add password protection to admin page
- [ ] Set up email notifications for new orders
- [ ] Add more sizes (XS, XL, XXL)
- [ ] Add quantity selection
- [ ] Add order confirmation emails
- [ ] Custom domain name

### Monitoring
- [ ] Set up Netlify notifications for failed deployments
- [ ] Monitor Stripe dashboard for payments
- [ ] Regular checks of Airtable for new orders

---

## 🎉 You're Done!

Once all items are checked, your WWPD budgie smuggler order system is fully operational!

**What Would Phoebe Do?** - She'd celebrate with a swim! 🏊‍♀️

---

**Questions?** See [SETUP_GUIDE.md](./SETUP_GUIDE.md) or [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
