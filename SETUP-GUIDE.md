# Ad Creative Optimizer Agent - Complete Setup Guide

## 🎯 Overview

This agent analyzes your Facebook Ads and Google Ads performance data, identifies top and bottom performers, and uses AI (Gemini) to generate 3 optimized ad creative variations.

## 📋 Prerequisites

1. **n8n Instance** (Self-hosted or n8n Cloud)
   - Get started: https://n8n.io/
   - Cloud signup: https://app.n8n.cloud/register

2. **Gemini API Key** (FREE)
   - Get it here: https://aistudio.google.com/app/apikey
   - Free tier: 60 requests/minute, generous limits

3. **Ad Platform Access**
   - Facebook Ads: Access Token from Meta Business
   - Google Ads: OAuth2 credentials

---

## 🚀 Step-by-Step Setup

### Step 1: Install n8n

**Option A: Cloud (Easiest)**
```bash
# Sign up at https://app.n8n.cloud/register
# Free tier available
```

**Option B: Self-Hosted (Docker)**
```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

**Option C: npm**
```bash
npm install -g n8n
n8n start
```

Access n8n at: http://localhost:5678

---

### Step 2: Get API Keys & Credentials

#### 2.1 Gemini API Key (FREE - Required)

1. Go to: https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Copy your API key
4. Save it securely

**Gemini Alternatives:**
- **OpenAI GPT-4**: https://platform.openai.com/api-keys (Paid)
- **Anthropic Claude**: https://console.anthropic.com/ (Paid)
- **Cohere**: https://dashboard.cohere.com/api-keys (Free tier)
- **Mistral AI**: https://console.mistral.ai/ (Free tier)
- **Groq**: https://console.groq.com/ (FREE, very fast)

#### 2.2 Facebook Ads Access Token

1. Go to: https://developers.facebook.com/tools/explorer/
2. Select your App (or create one)
3. Click "Generate Access Token"
4. Grant permissions: `ads_read`, `ads_management`
5. Copy the Access Token
6. **Make it long-lived**: https://developers.facebook.com/docs/facebook-login/guides/access-tokens/get-long-lived

#### 2.3 Google Ads OAuth2 (Optional)

1. Go to: https://console.cloud.google.com/
2. Create a new project
3. Enable Google Ads API
4. Create OAuth2 credentials (Desktop app)
5. Download the JSON file

---

### Step 3: Import Workflow to n8n

1. Open n8n (http://localhost:5678 or your cloud URL)
2. Click **"Add Workflow"** → **"Import from File"**
3. Upload the `n8n-workflow.json` file
4. The workflow will appear with all nodes connected

---

### Step 4: Configure Credentials in n8n

#### 4.1 Gemini API Key

1. Click on the **"Gemini AI Analysis"** node
2. Under "Credentials", click **"Create New"**
3. Select **"HTTP Query Auth"**
4. Name: `Gemini API Key`
5. Add parameter:
   - **Name**: `key`
   - **Value**: `YOUR_GEMINI_API_KEY`
6. Click **"Save"**

#### 4.2 Facebook Access Token

1. Click on **"Fetch Facebook Ads Data"** node
2. Under "Credentials", click **"Create New"**
3. Select **"HTTP Header Auth"**
4. Name: `Facebook Access Token`
5. Add header:
   - **Name**: `Authorization`
   - **Value**: `Bearer YOUR_FACEBOOK_ACCESS_TOKEN`
6. Click **"Save"**

#### 4.3 Google Ads OAuth2 (Optional)

1. Click on **"Fetch Google Ads Data"** node
2. Under "Credentials", click **"Create New"**
3. Select **"OAuth2 API"**
4. Fill in your OAuth2 credentials
5. Click **"Connect"** and authorize

---

### Step 5: Activate the Workflow

1. Click the **toggle switch** at the top right to activate
2. Copy the **Webhook URL** from the "Webhook Trigger" node
3. It will look like: `https://your-n8n.com/webhook/ad-optimizer`

---

### Step 6: Test the Workflow

#### Using the Web Interface (Recommended)

1. Deploy the website (see Step 7)
2. Enter your webhook URL
3. Fill in the form and click "Optimize"

#### Using cURL (Manual Test)

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

---

### Step 7: Deploy the Web Interface

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Deploy to Vercel
vercel deploy --prod --yes
```

---

## 🔧 How the Agent Works

### Workflow Flow:

1. **Webhook Trigger** → Receives request with platform, account ID, and date range
2. **Platform Router** → Routes to Facebook or Google Ads API
3. **Fetch Ads Data** → Pulls performance metrics (impressions, clicks, CTR, conversions, spend)
4. **Analyze Performance** → Calculates performance scores, identifies top 5 and bottom 5 ads
5. **Prepare AI Prompt** → Creates a structured prompt with performance data
6. **Gemini AI Analysis** → Analyzes patterns and generates 3 optimized creatives
7. **Format Response** → Structures the output with insights and recommendations
8. **Webhook Response** → Returns JSON with optimized ad creatives

### Performance Score Formula:

```javascript
performanceScore = (CTR × 100) + (Conversions × 10) - CostPerConversion
```

---

## 📊 API Request Format

### Facebook Ads

```json
{
  "platform": "facebook",
  "accountId": "act_123456789",
  "startDate": "2025-10-01",
  "endDate": "2025-11-14"
}
```

### Google Ads

```json
{
  "platform": "google",
  "accountId": "1234567890",
  "startDate": "2025-10-01",
  "endDate": "2025-11-14"
}
```

---

## 📤 Response Format

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
        "costPerConversion": 15.50
      }
    ],
    "bottomPerformers": [...],
    "metrics": {
      "totalAds": 47,
      "avgCTR": 2.3,
      "avgConversions": 45,
      "totalSpend": 5420.00
    }
  },
  "insights": {
    "topPatterns": [
      "Use of urgency words like 'Limited Time'",
      "Clear value proposition in headline",
      "Strong CTA with action verbs"
    ],
    "bottomWeaknesses": [
      "Vague headlines without clear benefit",
      "Weak or missing CTAs",
      "Too much text, not scannable"
    ]
  },
  "optimizedCreatives": [
    {
      "headline": "Save 40% Today Only - Limited Stock",
      "primaryText": "Transform your home with premium furniture at unbeatable prices. Free shipping on orders over $99. Shop now!",
      "cta": "Shop Now",
      "reasoning": "Combines urgency, clear discount, and value proposition from top performers"
    },
    {
      "headline": "Premium Quality, Affordable Prices",
      "primaryText": "Discover why 50,000+ customers trust us. Hand-picked furniture, delivered to your door. Start saving today!",
      "cta": "Browse Collection",
      "reasoning": "Uses social proof and clear benefit statement"
    },
    {
      "headline": "Your Dream Home Starts Here",
      "primaryText": "Exclusive designs you won't find anywhere else. Free design consultation + 30-day guarantee. Limited spots!",
      "cta": "Get Started",
      "reasoning": "Creates aspiration and reduces risk with guarantee"
    }
  ],
  "recommendation": "Review the 3 optimized ad variations and test them in your ad platform. Monitor performance for at least 3-5 days before scaling."
}
```

---

## 🔄 Alternative AI Providers

### Using Groq (FREE & Fast)

Replace the "Gemini AI Analysis" node with:

**URL**: `https://api.groq.com/openai/v1/chat/completions`

**Headers**:
- `Authorization`: `Bearer YOUR_GROQ_API_KEY`
- `Content-Type`: `application/json`

**Body**:
```json
{
  "model": "mixtral-8x7b-32768",
  "messages": [
    {
      "role": "user",
      "content": "{{ $json.aiPrompt }}"
    }
  ],
  "temperature": 0.7,
  "max_tokens": 2048
}
```

Get Groq API Key: https://console.groq.com/

### Using OpenAI

**URL**: `https://api.openai.com/v1/chat/completions`

**Headers**:
- `Authorization`: `Bearer YOUR_OPENAI_API_KEY`
- `Content-Type`: `application/json`

**Body**:
```json
{
  "model": "gpt-4-turbo-preview",
  "messages": [
    {
      "role": "user",
      "content": "{{ $json.aiPrompt }}"
    }
  ],
  "temperature": 0.7
}
```

### Using Cohere (FREE Tier)

**URL**: `https://api.cohere.ai/v1/generate`

**Headers**:
- `Authorization`: `Bearer YOUR_COHERE_API_KEY`
- `Content-Type`: `application/json`

**Body**:
```json
{
  "model": "command",
  "prompt": "{{ $json.aiPrompt }}",
  "max_tokens": 2048,
  "temperature": 0.7
}
```

Get Cohere API Key: https://dashboard.cohere.com/api-keys

---

## 🛠️ Customization Options

### Adjust Performance Score Weights

Edit the "Analyze Performance" node code:

```javascript
normalizedAd.performanceScore = (
  (normalizedAd.ctr * 100) +        // CTR weight
  (normalizedAd.conversions * 10) - // Conversion weight
  (normalizedAd.costPerConversion)  // Cost weight
);
```

### Change Number of Creatives Generated

Edit the AI prompt in "Prepare AI Prompt" node:

Change `Generate 3 NEW optimized ad copy variations` to your desired number.

### Adjust Date Range

Modify the webhook request:

```json
{
  "startDate": "2025-01-01",
  "endDate": "2025-11-14"
}
```

---

## 🐛 Troubleshooting

### Error: "Invalid Access Token"

- **Facebook**: Regenerate access token and make it long-lived
- **Google**: Reauthorize OAuth2 connection

### Error: "API Key Invalid"

- Verify your Gemini API key is correct
- Check if you've exceeded rate limits (60 req/min)

### Error: "No Data Returned"

- Verify your account ID is correct
- Check date range has data
- Ensure ads ran during the specified period

### Workflow Not Triggering

- Ensure workflow is **activated** (toggle switch ON)
- Check webhook URL is correct
- Test with cURL first

---

## 📚 Resources

### n8n Documentation
- Official Docs: https://docs.n8n.io/
- Workflow Templates: https://n8n.io/workflows/
- Community Forum: https://community.n8n.io/

### API Documentation
- Gemini API: https://ai.google.dev/docs
- Facebook Marketing API: https://developers.facebook.com/docs/marketing-apis
- Google Ads API: https://developers.google.com/google-ads/api/docs/start

### Alternative AI Providers
- Groq: https://console.groq.com/docs
- OpenAI: https://platform.openai.com/docs
- Cohere: https://docs.cohere.com/
- Mistral: https://docs.mistral.ai/

### Tutorials
- n8n Beginner Tutorial: https://www.youtube.com/watch?v=RpjQTGKm-ok
- Facebook Ads API Setup: https://www.youtube.com/watch?v=5UEbXYDQtNk
- Gemini API Guide: https://www.youtube.com/watch?v=lq-G3QcPB_U

---

## 💡 Use Cases

1. **Weekly Performance Review**: Schedule the workflow to run every Monday
2. **Campaign Launch**: Test new creatives before scaling budget
3. **A/B Testing**: Generate variations to test against current ads
4. **Creative Refresh**: When performance declines, generate new angles
5. **Client Reporting**: Include AI insights in performance reports

---

## 🎉 Next Steps

1. ✅ Import workflow to n8n
2. ✅ Configure credentials (Gemini, Facebook/Google)
3. ✅ Test with sample data
4. ✅ Deploy web interface
5. ✅ Run your first optimization
6. 📈 Monitor results and iterate

---

## 🤝 Support

- GitHub Issues: [Create an issue]
- n8n Community: https://community.n8n.io/
- Email: support@yourcompany.com

---

**Built with ❤️ using n8n, Gemini AI, and Next.js**
