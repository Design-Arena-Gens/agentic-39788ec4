# Ad Creative Optimizer - API Documentation

## Base URL
```
POST https://your-n8n-instance.com/webhook/ad-optimizer
```

## Request Format

### Headers
```http
Content-Type: application/json
```

### Request Body

#### Facebook Ads Request
```json
{
  "platform": "facebook",
  "accountId": "act_123456789",
  "startDate": "2025-10-01",
  "endDate": "2025-11-14"
}
```

#### Google Ads Request
```json
{
  "platform": "google",
  "accountId": "1234567890",
  "startDate": "2025-10-01",
  "endDate": "2025-11-14"
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `platform` | string | Yes | Either "facebook" or "google" |
| `accountId` | string | Yes | Facebook: starts with "act_", Google: numeric ID |
| `startDate` | string | Yes | ISO date format: YYYY-MM-DD |
| `endDate` | string | Yes | ISO date format: YYYY-MM-DD |

---

## Response Format

### Success Response (200 OK)

```json
{
  "success": true,
  "timestamp": "2025-11-14T12:00:00.000Z",
  "analysis": {
    "topPerformers": [
      {
        "name": "Summer Sale Ad",
        "impressions": 50000,
        "clicks": 2500,
        "ctr": 5.0,
        "conversions": 150,
        "costPerConversion": 15.50,
        "spend": 2325.00,
        "performanceScore": 1984.50
      }
    ],
    "bottomPerformers": [
      {
        "name": "Generic Product Ad",
        "impressions": 10000,
        "clicks": 100,
        "ctr": 1.0,
        "conversions": 2,
        "costPerConversion": 85.50,
        "spend": 171.00,
        "performanceScore": 34.50
      }
    ],
    "metrics": {
      "totalAds": 47,
      "avgCTR": 2.35,
      "avgConversions": 45.2,
      "totalSpend": 5420.00
    }
  },
  "insights": {
    "topPatterns": [
      "Use of urgency words like 'Limited Time' and 'Today Only'",
      "Clear value proposition in headline (specific discount percentages)",
      "Strong CTA with action verbs ('Shop Now', 'Get Started')",
      "Social proof elements ('50,000+ customers')",
      "Benefit-focused messaging rather than feature-focused"
    ],
    "bottomWeaknesses": [
      "Vague headlines without clear benefit or hook",
      "Weak or missing CTAs",
      "Too much text making the ad not scannable",
      "No urgency or scarcity elements",
      "Generic messaging that doesn't differentiate"
    ]
  },
  "optimizedCreatives": [
    {
      "headline": "Save 40% Today Only - Limited Stock",
      "primaryText": "Transform your home with premium furniture at unbeatable prices. Free shipping on orders over $99. Shop now before it's gone!",
      "cta": "Shop Now",
      "reasoning": "Combines urgency ('Today Only'), clear discount (40%), scarcity ('Limited Stock'), and removes friction (free shipping threshold) - all patterns from top performers."
    },
    {
      "headline": "Premium Quality, Affordable Prices",
      "primaryText": "Discover why 50,000+ customers trust us. Hand-picked furniture, delivered to your door in 3 days. Start saving today!",
      "cta": "Browse Collection",
      "reasoning": "Uses social proof (50,000+ customers), addresses quality concerns, sets delivery expectations, and includes urgency with time-bound benefits."
    },
    {
      "headline": "Your Dream Home Starts Here",
      "primaryText": "Exclusive designs you won't find anywhere else. Free design consultation + 30-day money-back guarantee. Limited spots available!",
      "cta": "Get Started",
      "reasoning": "Creates aspiration, emphasizes exclusivity, reduces purchase risk with guarantee, and adds urgency with limited availability."
    }
  ],
  "recommendation": "Review the 3 optimized ad variations and test them in your ad platform. Monitor performance for at least 3-5 days before scaling. Consider running A/B tests against your current best performer."
}
```

### Error Response (400/500)

```json
{
  "success": false,
  "error": "Invalid access token",
  "timestamp": "2025-11-14T12:00:00.000Z"
}
```

---

## Response Fields

### Analysis Object

| Field | Type | Description |
|-------|------|-------------|
| `topPerformers` | Array<Ad> | Top 5 performing ads |
| `bottomPerformers` | Array<Ad> | Bottom 5 performing ads |
| `metrics` | Object | Overall performance metrics |

### Ad Object

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Ad name/title |
| `impressions` | number | Total impressions |
| `clicks` | number | Total clicks |
| `ctr` | number | Click-through rate (%) |
| `conversions` | number | Total conversions |
| `costPerConversion` | number | Cost per conversion ($) |
| `spend` | number | Total spend ($) |
| `performanceScore` | number | Calculated score (CTR×100 + Conv×10 - CPC) |

### Metrics Object

| Field | Type | Description |
|-------|------|-------------|
| `totalAds` | number | Total ads analyzed |
| `avgCTR` | number | Average CTR across all ads (%) |
| `avgConversions` | number | Average conversions per ad |
| `totalSpend` | number | Total spend across all ads ($) |

### Insights Object

| Field | Type | Description |
|-------|------|-------------|
| `topPatterns` | string[] | 3-5 key success patterns |
| `bottomWeaknesses` | string[] | 3-5 key weaknesses |

### Optimized Creative Object

| Field | Type | Description |
|-------|------|-------------|
| `headline` | string | Ad headline (max 40 chars) |
| `primaryText` | string | Main ad copy (max 125 chars) |
| `cta` | string | Call-to-action button text |
| `reasoning` | string | Why this creative will perform better |

---

## cURL Examples

### Facebook Ads
```bash
curl -X POST https://your-n8n.com/webhook/ad-optimizer \
  -H "Content-Type: application/json" \
  -d '{
    "platform": "facebook",
    "accountId": "act_123456789",
    "startDate": "2025-10-01",
    "endDate": "2025-11-14"
  }'
```

### Google Ads
```bash
curl -X POST https://your-n8n.com/webhook/ad-optimizer \
  -H "Content-Type: application/json" \
  -d '{
    "platform": "google",
    "accountId": "1234567890",
    "startDate": "2025-10-01",
    "endDate": "2025-11-14"
  }'
```

---

## JavaScript/TypeScript Example

```typescript
import axios from 'axios';

interface OptimizeRequest {
  platform: 'facebook' | 'google';
  accountId: string;
  startDate: string;
  endDate: string;
}

async function optimizeAds(request: OptimizeRequest) {
  try {
    const response = await axios.post(
      'https://your-n8n.com/webhook/ad-optimizer',
      request
    );

    console.log('Optimization Results:', response.data);
    return response.data;
  } catch (error) {
    console.error('Optimization failed:', error);
    throw error;
  }
}

// Usage
optimizeAds({
  platform: 'facebook',
  accountId: 'act_123456789',
  startDate: '2025-10-01',
  endDate: '2025-11-14'
});
```

---

## Python Example

```python
import requests
from datetime import datetime, timedelta

def optimize_ads(platform, account_id, days_back=30):
    end_date = datetime.now().strftime('%Y-%m-%d')
    start_date = (datetime.now() - timedelta(days=days_back)).strftime('%Y-%m-%d')

    url = 'https://your-n8n.com/webhook/ad-optimizer'
    payload = {
        'platform': platform,
        'accountId': account_id,
        'startDate': start_date,
        'endDate': end_date
    }

    response = requests.post(url, json=payload)

    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Error: {response.text}")

# Usage
result = optimize_ads('facebook', 'act_123456789', days_back=30)
print(f"Generated {len(result['optimizedCreatives'])} new creatives")
```

---

## Rate Limits

- **n8n Webhook**: No hard limit (depends on your n8n instance)
- **Gemini API**: 60 requests/minute (free tier)
- **Facebook API**: 200 calls/hour per user (standard)
- **Google Ads API**: 15,000 operations/day (developer token)

**Recommendation**: Cache results for at least 1 hour to avoid unnecessary API calls.

---

## Error Codes

| Status Code | Error | Description |
|-------------|-------|-------------|
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Invalid API credentials |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Account ID not found |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server-side error |

---

## Best Practices

### 1. Date Ranges
- **Minimum**: 7 days for meaningful data
- **Recommended**: 30 days for stable patterns
- **Maximum**: 90 days (more data = better insights)

### 2. Frequency
- **Daily campaigns**: Check weekly
- **Long-term campaigns**: Check bi-weekly
- **Seasonal campaigns**: Check every 3-5 days

### 3. Implementation
- Test new creatives with 10-20% of budget
- Monitor for 3-5 days before scaling
- Keep winning creatives running
- Rotate in fresh variations monthly

### 4. Error Handling
- Implement exponential backoff for retries
- Cache successful responses
- Log all errors for debugging
- Set reasonable timeouts (30-60 seconds)

---

## Webhook Security

### Add Authentication (Recommended)

1. **In n8n**: Add HTTP Header check
```javascript
// In the first node after webhook
if ($json.headers.authorization !== 'Bearer YOUR_SECRET_TOKEN') {
  throw new Error('Unauthorized');
}
```

2. **In your requests**: Add auth header
```bash
curl -H "Authorization: Bearer YOUR_SECRET_TOKEN" \
  -X POST https://your-n8n.com/webhook/ad-optimizer \
  -d '{"platform": "facebook", ...}'
```

### IP Whitelisting
Configure your n8n instance to only accept requests from specific IPs.

---

## Advanced Usage

### Batch Processing
```javascript
async function optimizeMultipleAccounts(accounts) {
  const results = await Promise.all(
    accounts.map(account =>
      optimizeAds({
        platform: account.platform,
        accountId: account.id,
        startDate: '2025-10-01',
        endDate: '2025-11-14'
      })
    )
  );
  return results;
}
```

### Scheduled Automation
```javascript
// Using node-cron
const cron = require('node-cron');

// Run every Monday at 9 AM
cron.schedule('0 9 * * 1', async () => {
  const result = await optimizeAds({
    platform: 'facebook',
    accountId: 'act_123456789',
    startDate: getLastWeekStart(),
    endDate: getYesterday()
  });

  // Send email with results
  sendEmailReport(result);
});
```

---

## Support

For API issues:
1. Check n8n workflow execution logs
2. Verify API credentials are valid
3. Test with cURL first
4. Review SETUP-GUIDE.md troubleshooting section

---

**Last Updated**: 2025-11-14
