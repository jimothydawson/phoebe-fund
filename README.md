# Phoebe Dawson Foundation Website

Official website for the Phoebe Dawson Foundation - honoring the legacy of compassion, care, and community that Phoebe brought to everyone she met.

**What Would Phoebe Do?**

## 🌟 About

The Phoebe Dawson Foundation supports health, wellness, and community programs in memory of Phoebe Dawson. This website serves as:
- Information hub about the foundation's mission and programs
- Platform for upcoming events (Sun Run, Cole Classic, Annual Gala)
- E-commerce system for WWPD budgie smuggler fundraising merchandise

## 🏊 WWPD Budgie Smuggler Orders

This site includes a custom-built order system for WWPD (What Would Phoebe Do?) budgie smugglers:
- Stripe integration for secure payment processing
- Airtable database for order management
- Simple admin interface to view and export orders
- Friends & family can order their gear for Team Phoebe events

## 🛠 Tech Stack

- **Frontend:** HTML, CSS, JavaScript (vanilla)
- **Hosting:** Netlify
- **Payment Processing:** Stripe Checkout
- **Database:** Airtable
- **Backend:** Netlify Functions (serverless)

## 📁 Project Structure

```
├── index.html                          # Main website
├── success.html                        # Order confirmation page
├── cancel.html                         # Payment cancelled page
├── admin.html                          # Orders admin panel
├── netlify/
│   └── functions/
│       ├── create-checkout-session.js  # Creates Stripe checkout
│       ├── stripe-webhook.js           # Handles payment completion
│       └── get-orders.js               # Fetches orders from Airtable
├── netlify.toml                        # Netlify configuration
├── package.json                        # Dependencies
├── .env                                # Environment variables (local)
├── SETUP_GUIDE.md                      # Detailed setup instructions
└── AIRTABLE_SETUP.md                   # Airtable configuration guide
```

## 🚀 Setup & Deployment

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed setup instructions.

### Quick Start (Local Development)

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your `.env` file with Stripe and Airtable credentials
4. Run locally with Netlify CLI:
   ```bash
   netlify dev
   ```
5. Visit http://localhost:8888

### Deploy to Netlify

1. Push to GitHub
2. Connect repository to Netlify
3. Add environment variables in Netlify dashboard
4. Deploy!

See full deployment steps in [SETUP_GUIDE.md](./SETUP_GUIDE.md).

## 🔑 Environment Variables

Required environment variables:
- `STRIPE_PUBLISHABLE_KEY` - Stripe public API key
- `STRIPE_SECRET_KEY` - Stripe secret API key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook signing secret
- `AIRTABLE_API_KEY` - Airtable API key
- `AIRTABLE_BASE_ID` - Airtable base ID
- `AIRTABLE_TABLE_NAME` - Airtable table name (default: "Orders")
- `BUDGIE_PRICE` - Price in cents (default: 5000 = $50 AUD)
- `CURRENCY` - Currency code (default: "aud")

## 📊 Managing Orders

- **View orders:** Visit `/admin.html` or check your Airtable base
- **Export orders:** Use the "Export CSV" button on the admin page
- **Order details:** Name, email, style (Men's/Women's), size (S/M/L), payment status

## 🎯 Features

- ✅ Responsive design that works on all devices
- ✅ Secure payment processing via Stripe
- ✅ Automatic order saving to Airtable
- ✅ Email confirmation sent by Stripe
- ✅ Admin dashboard for order management
- ✅ CSV export for bulk order submission
- ✅ Test mode support for development

## 🧪 Testing

Use Stripe test cards in test mode:
- **Success:** 4242 4242 4242 4242
- **Decline:** 4000 0000 0000 0002

## 📄 License

Copyright © 2024 Phoebe Dawson Foundation. All rights reserved.

## 💛 Our Sunshine Girl

This website was built with love to continue Phoebe's legacy of compassion, service, and bringing people together. Every budgie smuggler sold helps support programs that reflect her radiant spirit.

**What Would Phoebe Do?** - She'd make sure we all had matching budgies for the swim!

---

For technical support or questions about the order system, please contact the development team or refer to [SETUP_GUIDE.md](./SETUP_GUIDE.md).
