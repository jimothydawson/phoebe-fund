# WWPD Budgie Smuggler Order System - Setup Guide

This guide will walk you through setting up the complete Stripe + Airtable integration for your WWPD budgie smuggler orders.

## 📋 Prerequisites

- Netlify account (you already have this)
- Stripe account
- Airtable account
- Git installed locally

## 🚀 Step-by-Step Setup

### 1. Install Dependencies

First, install the required npm packages:

```bash
npm install
```

### 2. Set Up Stripe

#### Create/Login to Stripe Account
1. Go to https://stripe.com and create an account (or login)
2. Complete your business profile
3. You can use **Test Mode** initially (toggle in the top right)

#### Get Your Stripe API Keys
1. Go to https://dashboard.stripe.com/apikeys
2. Copy your **Publishable key** (starts with `pk_test_...`)
3. Copy your **Secret key** (starts with `sk_test_...`)
4. Paste these into your `.env` file:

```env
STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
```

### 3. Set Up Airtable

Follow the detailed instructions in [AIRTABLE_SETUP.md](./AIRTABLE_SETUP.md).

Quick summary:
1. Create a new base called "WWPD Budgie Smuggler Orders"
2. Create a table called "Orders" with the specified fields
3. Get your API key from https://airtable.com/create/tokens
4. Find your Base ID from https://airtable.com/api
5. Add to `.env`:

```env
AIRTABLE_API_KEY=your_api_key_here
AIRTABLE_BASE_ID=your_base_id_here
AIRTABLE_TABLE_NAME=Orders
```

### 4. Configure Environment Variables

Your `.env` file should now look like this:

```env
# Stripe API Keys
STRIPE_PUBLISHABLE_KEY=pk_test_51Abc...
STRIPE_SECRET_KEY=sk_test_51Abc...
STRIPE_WEBHOOK_SECRET=whsec_... (we'll add this later)

# Airtable Configuration
AIRTABLE_API_KEY=patABC123...
AIRTABLE_BASE_ID=appXYZ123...
AIRTABLE_TABLE_NAME=Orders

# Product Configuration
BUDGIE_PRICE=5000
CURRENCY=aud
```

**Note:** The price is in cents (5000 = $50.00 AUD)

### 5. Test Locally with Netlify CLI

Install Netlify CLI globally:

```bash
npm install -g netlify-cli
```

Start the local development server:

```bash
netlify dev
```

This will:
- Start a local server (usually at http://localhost:8888)
- Enable Netlify Functions locally
- Use your `.env` file automatically

Visit http://localhost:8888 and test the order form!

### 6. Deploy to Netlify

#### Connect Your Repository
1. Push your code to GitHub (if not already done)
2. Go to https://app.netlify.com
3. Click "Add new site" → "Import an existing project"
4. Connect to your GitHub repository
5. Netlify will auto-detect the settings from `netlify.toml`

#### Set Environment Variables in Netlify
You need to add your environment variables to Netlify:

1. Go to your site in Netlify
2. Click "Site configuration" → "Environment variables"
3. Add each variable from your `.env` file:
   - `STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `AIRTABLE_API_KEY`
   - `AIRTABLE_BASE_ID`
   - `AIRTABLE_TABLE_NAME`
   - `BUDGIE_PRICE`
   - `CURRENCY`

**Important:** Do NOT add `STRIPE_WEBHOOK_SECRET` yet - we'll get that in the next step.

4. Click "Deploy" or trigger a new deployment

### 7. Set Up Stripe Webhook

Once your site is deployed, you need to configure Stripe to send webhook events:

1. Go to https://dashboard.stripe.com/webhooks
2. Click "+ Add endpoint"
3. Enter your webhook URL:
   ```
   https://YOUR-SITE-NAME.netlify.app/.netlify/functions/stripe-webhook
   ```
4. Select events to listen to:
   - `checkout.session.completed` ✓
   - `payment_intent.payment_failed` ✓
5. Click "Add endpoint"
6. Click on your new webhook endpoint
7. Click "Reveal" next to "Signing secret"
8. Copy the webhook secret (starts with `whsec_...`)
9. Add it to your Netlify environment variables:
   - Go to Netlify → Site configuration → Environment variables
   - Add `STRIPE_WEBHOOK_SECRET` with the value you copied
10. Redeploy your site (Netlify → Deploys → Trigger deploy → Clear cache and deploy site)

### 8. Test the Complete Flow

Now test the entire system:

1. Visit your live site
2. Navigate to the "WWPD Budgies" section
3. Fill out the order form
4. Use Stripe test card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits
5. Complete the payment
6. You should be redirected to the success page
7. Check your Airtable base - the order should appear!
8. Visit `https://YOUR-SITE-NAME.netlify.app/admin.html` to see the order list

## 🧪 Stripe Test Cards

Use these test cards in test mode:

- **Success:** `4242 4242 4242 4242`
- **Decline:** `4000 0000 0000 0002`
- **Requires Auth:** `4000 0025 0000 3155`

## 📊 Managing Orders

### View Orders
- **Airtable:** Go to your Airtable base to see all orders in a spreadsheet format
- **Admin Page:** Visit `https://your-site.netlify.app/admin.html`

### Export Orders
1. Go to the admin page
2. Click "Export CSV"
3. Use this CSV to submit your bulk order to the budgie smuggler company

### Airtable Features
- Filter orders by style, size, or status
- Group orders by size for easy counting
- Use Airtable's built-in views to organize data
- Export directly from Airtable as CSV, PDF, or Excel

## 🔒 Security Notes

- ✅ `.env` file is in `.gitignore` (never committed to Git)
- ✅ Stripe webhook signature verification is enabled
- ✅ API keys are stored in Netlify environment variables
- ✅ Payment processing happens on Stripe's secure servers
- ⚠️ **Admin page is not password protected** - keep the URL private or add protection if needed

## 🎨 Customization

### Change the Price
Edit the `.env` file (local) and Netlify environment variables (production):
```env
BUDGIE_PRICE=7500  # This is $75.00 AUD
```

### Add More Sizes
Edit `index.html`, find the size dropdown and add options:
```html
<option value="XS">Extra Small</option>
<option value="XL">Extra Large</option>
```

### Change Currency
Edit `.env`:
```env
CURRENCY=usd  # for US dollars
```

## 🆘 Troubleshooting

### Orders not appearing in Airtable
- Check Stripe webhook is configured correctly
- Check webhook secret is correct in Netlify
- View webhook logs in Stripe Dashboard → Developers → Webhooks → [Your endpoint]
- Check Netlify function logs: Netlify → Functions → stripe-webhook

### Payment fails
- Verify Stripe keys are correct (test keys for test mode, live keys for live mode)
- Check you're using test cards in test mode
- View error in browser console (F12)

### "Failed to create checkout session" error
- Check Netlify function logs
- Verify all environment variables are set correctly
- Make sure Stripe secret key is not the publishable key

## 🔄 Going Live

When you're ready to accept real payments:

1. Complete Stripe account verification
2. Switch Stripe to **Live Mode** (toggle in top right)
3. Get new API keys from https://dashboard.stripe.com/apikeys
4. Update Netlify environment variables with **live** keys:
   - `STRIPE_PUBLISHABLE_KEY` → `pk_live_...`
   - `STRIPE_SECRET_KEY` → `sk_live_...`
5. Create a new webhook for live mode
6. Update `STRIPE_WEBHOOK_SECRET` in Netlify
7. Redeploy your site
8. Test with a real card (small amount)

## 📞 Support

If you run into issues:
- Check Netlify function logs
- Check Stripe webhook event logs
- Verify all environment variables are set
- Ensure Airtable permissions are correct

---

Built with ❤️ for the Phoebe Dawson Foundation
**What Would Phoebe Do?**
