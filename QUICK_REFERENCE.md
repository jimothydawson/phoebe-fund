# Quick Reference Guide

## 🚀 Common Commands

### Local Development
```bash
# Install dependencies
npm install

# Run local dev server
netlify dev

# Access site locally
http://localhost:8888
```

### Deployment
```bash
# Push to GitHub (triggers Netlify deployment)
git add .
git commit -m "Your message"
git push
```

## 🔗 Important URLs

### Your Site
- **Live Site:** https://your-site-name.netlify.app
- **Admin Panel:** https://your-site-name.netlify.app/admin.html
- **Order Form:** https://your-site-name.netlify.app/#order

### External Services
- **Netlify Dashboard:** https://app.netlify.com
- **Stripe Dashboard:** https://dashboard.stripe.com
- **Airtable Base:** https://airtable.com/[your-base-id]
- **Stripe Webhooks:** https://dashboard.stripe.com/webhooks

## ⚙️ Configuration

### Update Price
**In Netlify:**
1. Go to Site Configuration → Environment Variables
2. Edit `BUDGIE_PRICE`
3. Value is in cents: 5000 = $50, 7500 = $75
4. Click "Save"
5. Redeploy site

**Locally:**
Edit `.env`:
```env
BUDGIE_PRICE=7500
```

### Add/Remove Sizes
Edit [index.html](index.html:637):
```html
<select id="size" name="size" class="form-input" required>
    <option value="">Select size</option>
    <option value="XS">Extra Small</option>  <!-- NEW -->
    <option value="S">Small</option>
    <option value="M">Medium</option>
    <option value="L">Large</option>
    <option value="XL">Extra Large</option>  <!-- NEW -->
</select>
```

### Change Currency
Edit environment variables:
```env
CURRENCY=usd  # USD
CURRENCY=aud  # AUD
CURRENCY=gbp  # GBP
```

## 📊 Managing Orders

### View Orders
**Option 1:** Admin page
- Visit `https://your-site.netlify.app/admin.html`

**Option 2:** Airtable
- Go to your Airtable base
- View "Orders" table

### Export Orders
**From Admin Page:**
1. Visit admin.html
2. Click "Export CSV"

**From Airtable:**
1. Open your base
2. Click "..." menu
3. Download CSV

### Order Summary
- **Total orders:** See admin dashboard stats
- **By style:** Filter in Airtable or view stats on admin page
- **By size:** Group by size in Airtable

## 🧪 Testing

### Test Cards (Test Mode Only)
- **Success:** 4242 4242 4242 4242
- **Decline:** 4000 0000 0000 0002
- **Requires Auth:** 4000 0025 0000 3155

Any future expiry date, any CVC, any ZIP.

### Test Locally
1. Run `netlify dev`
2. Visit http://localhost:8888
3. Fill out order form
4. Use test card above
5. Check Airtable for order (if webhook configured)

## 🔍 Troubleshooting

### Orders Not Appearing in Airtable
**Check:**
1. Stripe webhook is configured (Dashboard → Webhooks)
2. Webhook secret is correct in Netlify env vars
3. View webhook logs in Stripe Dashboard
4. Check Netlify function logs

**View Logs:**
- Netlify: Site → Functions → stripe-webhook
- Stripe: Dashboard → Webhooks → [endpoint] → Events

### Payment Fails
**Check:**
1. Stripe keys are correct
2. Using test card in test mode
3. Browser console for errors (F12)
4. Netlify function logs

### Can't Access Admin Page
**Solutions:**
- Clear browser cache
- Check URL is correct: `/admin.html`
- View console for errors
- Check Airtable credentials in Netlify env vars

## 🔄 Switching Test → Live Mode

When ready for real payments:

1. **Stripe:** Switch to Live Mode (toggle top-right)
2. **Get new keys:** Dashboard → API Keys
3. **Update Netlify env vars:**
   - `STRIPE_PUBLISHABLE_KEY` → `pk_live_...`
   - `STRIPE_SECRET_KEY` → `sk_live_...`
4. **Create new webhook:**
   - Dashboard → Webhooks → Add endpoint
   - URL: `https://your-site.netlify.app/.netlify/functions/stripe-webhook`
   - Events: `checkout.session.completed`, `payment_intent.payment_failed`
5. **Update webhook secret:** Copy new secret to Netlify
6. **Redeploy:** Trigger new deployment in Netlify
7. **Test:** Make small real purchase to verify

## 📞 Getting Help

### Check These First:
1. [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Complete setup instructions
2. [AIRTABLE_SETUP.md](./AIRTABLE_SETUP.md) - Airtable configuration
3. Netlify function logs
4. Stripe webhook event logs
5. Browser console (F12)

### Common Issues:
- **"Failed to create checkout"** → Check Stripe keys
- **Orders not in Airtable** → Check webhook + Airtable config
- **Payment declined** → Wrong test card or live mode active
- **Admin page blank** → Check Airtable API key/base ID

---

**Need more help?** See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions.
