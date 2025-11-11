# Airtable Setup Instructions

## 1. Create a New Base

1. Go to [Airtable](https://airtable.com)
2. Click "Create a base" → "Start from scratch"
3. Name it: **WWPD Budgie Smuggler Orders**

## 2. Create the Orders Table

Rename the default table to **Orders** and set up these fields:

| Field Name | Field Type | Description |
|------------|------------|-------------|
| Name | Single line text | Customer name |
| Sex | Single select | Options: Men's, Women's |
| Size | Single select | Options: S, M, L |
| Stripe Payment ID | Single line text | Stripe payment_intent ID |
| Amount | Currency | Price paid (AUD) |
| Email | Email | Customer email (from Stripe) |
| Order Date | Created time | Auto-generated |
| Payment Status | Single select | Options: pending, paid, failed |

### Field Setup Details:

**Sex Field (Single Select):**
- Men's
- Women's

**Size Field (Single Select):**
- S
- M
- L

**Payment Status Field (Single Select):**
- pending
- paid
- failed

## 3. Get Your API Credentials

### Airtable API Key (Personal Access Token):
1. Go to https://airtable.com/create/tokens
2. Click "Create new token"
3. Name it: "WWPD Budgie Orders Integration"
4. Add these scopes:
   - `data.records:read`
   - `data.records:write`
5. Add access to your "WWPD Budgie Smuggler Orders" base
6. Click "Create token"
7. Copy the token → Put in `.env` as `AIRTABLE_API_KEY`

### Base ID:
1. Go to https://airtable.com/api
2. Select your "WWPD Budgie Smuggler Orders" base
3. The Base ID is shown in the URL and docs (starts with `app...`)
4. Copy it → Put in `.env` as `AIRTABLE_BASE_ID`

### Table Name or ID:
You can use either the table name or table ID:
- **Table Name:** `Orders`
- **Table ID:** `tblLVlp1y0v1AB3W1` (more stable - recommended)

**Why use Table ID?** If you rename your table in Airtable, the ID stays the same but the name changes. Using the ID prevents your API calls from breaking.

To find your table ID:
1. Go to https://airtable.com/api
2. Select your "WWPD Budgie Smuggler Orders" base
3. Look for "The id for Orders is tbl..." in the documentation

**Recommended:** Use the table ID in `.env`:
```
AIRTABLE_TABLE_NAME=tblLVlp1y0v1AB3W1
```

## 4. Example .env Configuration

```
AIRTABLE_API_KEY=patABCDEF1234567890.a1b2c3d4e5f6g7h8i9j0
AIRTABLE_BASE_ID=appXYZ123456789
AIRTABLE_TABLE_NAME=tblLVlp1y0v1AB3W1
```

**Note:** You can use `AIRTABLE_TABLE_NAME=Orders` instead, but the table ID is more reliable.

## 5. Test Your Setup

After deploying, you can test by:
1. Making a test order
2. Checking if it appears in your Airtable base
3. Viewing it on the admin page

## Viewing Orders

- **In Airtable:** Go to your base and view the Orders table
- **Admin Page:** Visit `/admin.html` on your deployed site
- **Export:** Use Airtable's built-in CSV export feature
