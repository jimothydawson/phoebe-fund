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
    const { name, email, sex, size } = JSON.parse(event.body);

    // Validate required fields
    if (!name || !email || !sex || !size) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Get price and currency from environment variables
    const price = parseInt(process.env.BUDGIE_PRICE || '5000');
    const currency = process.env.CURRENCY || 'aud';

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: `WWPD Budgie Smuggler - ${sex}`,
              description: `Size: ${size}`,
              images: [], // Optional: Add product image URL if available
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: email,
      metadata: {
        customer_name: name,
        sex: sex,
        size: size,
      },
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
