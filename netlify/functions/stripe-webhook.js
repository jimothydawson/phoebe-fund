const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Function to save order to Airtable
async function saveToAirtable(orderData) {
  const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
  const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Orders';

  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        'Name': orderData.name,
        'Email': orderData.email,
        'Sex': orderData.sex,
        'Size': orderData.size,
        'Stripe Payment ID': orderData.paymentIntentId,
        'Amount': orderData.amount,
        'Payment Status': orderData.status,
      }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Airtable API error: ${error}`);
  }

  return await response.json();
}

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Get signature from headers (try both cases)
  const sig = event.headers['stripe-signature'] || event.headers['Stripe-Signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let stripeEvent;

  try {
    // Get raw body - Netlify provides it as a string or base64
    const body = event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf8') : event.body;

    // Verify webhook signature
    stripeEvent = stripe.webhooks.constructEvent(
      body,
      sig,
      webhookSecret
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: `Webhook Error: ${err.message}` })
    };
  }

  // Handle the event
  try {
    switch (stripeEvent.type) {
      case 'checkout.session.completed':
        const session = stripeEvent.data.object;

        // Extract order details from metadata
        const orderData = {
          name: session.metadata.customer_name,
          email: session.customer_email || session.customer_details?.email,
          sex: session.metadata.sex,
          size: session.metadata.size,
          paymentIntentId: session.payment_intent,
          amount: session.amount_total / 100, // Convert from cents
          status: 'paid'
        };

        // Save to Airtable
        await saveToAirtable(orderData);
        console.log('Order saved to Airtable:', orderData);
        break;

      case 'payment_intent.payment_failed':
        const failedIntent = stripeEvent.data.object;
        console.error('Payment failed:', failedIntent.id);
        // Optionally save failed payment to Airtable
        break;

      default:
        console.log(`Unhandled event type: ${stripeEvent.type}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true })
    };
  } catch (error) {
    console.error('Error processing webhook:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Webhook processing failed',
        details: error.message
      })
    };
  }
};
