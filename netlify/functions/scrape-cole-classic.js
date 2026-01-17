// Scrapes Cole Classic fundraising page for donation totals

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
  };

  try {
    // Fetch the Cole Classic fundraising page
    const response = await fetch('https://coleclassic.com.au/fundraising/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; WWPD-Bot/1.0)'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const html = await response.text();

    // Try to find donation amounts in the HTML
    // Look for common patterns: dollar amounts, "raised" text, leaderboard data
    
    // Pattern 1: Look for JSON data embedded in the page
    const jsonMatch = html.match(/fundraising[Dd]ata\s*[:=]\s*(\[[\s\S]*?\])/);
    
    // Pattern 2: Look for dollar amounts near "raised" or "total"
    const dollarAmounts = html.match(/\$[\d,]+(?:\.\d{2})?/g) || [];
    
    // Pattern 3: Look for Grassrootz embed or iframe
    const grassrootzMatch = html.match(/grassrootz\.com[^"']*/g);
    
    // Pattern 4: Look for data attributes or script tags with amounts
    const dataMatch = html.match(/data-(?:amount|raised|total)="([\d,.]+)"/gi);

    // Pattern 5: Look for "Team WWPD" or "Phoebe" specifically
    const wwpdMatch = html.match(/(?:team\s*wwpd|phoebe)[^<]*?\$[\d,]+/gi);

    // Return debug info for now so we can see what's available
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        debug: {
          pageLength: html.length,
          dollarAmountsFound: dollarAmounts.slice(0, 10),
          grassrootzUrls: grassrootzMatch,
          dataAttributes: dataMatch,
          wwpdMentions: wwpdMatch,
          // Include a snippet around "leaderboard" if found
          hasLeaderboard: html.toLowerCase().includes('leaderboard'),
          leaderboardSnippet: html.toLowerCase().includes('leaderboard') 
            ? html.substring(html.toLowerCase().indexOf('leaderboard'), html.toLowerCase().indexOf('leaderboard') + 500)
            : null
        }
      }, null, 2)
    };

  } catch (error) {
    console.error('Scrape error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to scrape Cole Classic page',
        details: error.message 
      })
    };
  }
};
