exports.handler = async (event) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
    const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Orders';

    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      throw new Error('Airtable configuration missing');
    }

    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}?sort%5B0%5D%5Bfield%5D=Order+Date&sort%5B0%5D%5Bdirection%5D=desc`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      }
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Airtable API error: ${error}`);
    }

    const data = await response.json();

    // Transform Airtable records to simpler format
    const orders = data.records.map(record => ({
      id: record.id,
      name: record.fields.Name || '',
      email: record.fields.Email || '',
      sex: record.fields.Sex || '',
      size: record.fields.Size || '',
      amount: record.fields.Amount || 0,
      status: record.fields['Payment Status'] || 'pending',
      date: record.fields['Order Date'] || record.createdTime,
      paymentId: record.fields['Stripe Payment ID'] || ''
    }));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ orders })
    };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to fetch orders',
        details: error.message
      })
    };
  }
};
