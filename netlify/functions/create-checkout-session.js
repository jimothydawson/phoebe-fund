const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { name, email, items } = JSON.parse(event.body);

    // Validate required fields
    if (!name || !email || !items || !Array.isArray(items) || items.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Validate each item has style and size
    for (const item of items) {
      if (!item.style || !item.size) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Each item must have style and size' })
        };
      }
    }

    // Pricing for each style in cents (AUD)
    const stylePrices = {
      "Mens": 5000,        // $50
      "Womens": 9500,      // $95
      "Boys": 4500,        // $45
      "Girls": 6500,       // $65
      "Bucket Hat": 4500    // $45
    };

    const currency = process.env.CURRENCY || 'aud';

    // Create line items for each item with individual pricing
    const lineItems = items.map((item, index) => {
      const price = stylePrices[item.style];
      if (!price) {
        throw new Error(`Invalid style: ${item.style}`);
      }

      const strapInfo = item.strapType ? ` (${item.strapType})` : '';
      const description = item.strapType
        ? `${item.strapType} - Size: ${item.size}`
        : `Size: ${item.size}`;

      return {
        price_data: {
          currency: currency,
          product_data: {
            name: `WWPD ${item.style}${strapInfo}`,
            description: description,
            images: [], // Optional: Add product image URL if available
          },
          unit_amount: price,
        },
        quantity: 1,
      };
    });

    // Create metadata with all items information
    const metadata = {
      customer_name: name,
      item_count: items.length.toString(),
    };

    // Add individual item details to metadata (Stripe has a 500 char limit per value)
    items.forEach((item, index) => {
      const strapInfo = item.strapType ? ` (${item.strapType})` : '';
      metadata[`item_${index + 1}`] = `${item.style}${strapInfo} - ${item.size}`;
    });

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: email,
      metadata: metadata,
      success_url: `${event.headers.origin || 'https://phoebedawsonfoundation.org'}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${event.headers.origin || 'https://phoebedawsonfoundation.org'}/cancel.html`,
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ url: session.url })
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to create checkout session',
        details: error.message
      })
    };
  }
};
