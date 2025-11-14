# 🚀 Ad Creative Optimizer - AI-Powered Agent

A complete agentic AI solution that analyzes Facebook Ads and Google Ads performance data, identifies patterns in top and bottom performers, and generates optimized ad creative variations using AI.

## ✨ Features

- 📊 **Performance Analysis**: Automatically fetches and analyzes ad performance from Facebook/Google
- 🤖 **AI-Powered Insights**: Uses Gemini AI to identify winning patterns and weaknesses
- 💡 **Creative Generation**: Generates 3 optimized ad variations with headlines, copy, and CTAs
- 🔗 **Webhook Integration**: Works seamlessly with n8n workflow automation
- 🎨 **Beautiful Web Interface**: Modern, responsive UI built with Next.js and Tailwind CSS
- 📈 **Real-time Results**: Get instant optimization recommendations

## 🏗️ Architecture

```
┌─────────────┐      ┌──────────┐      ┌─────────────────┐      ┌────────────┐
│   Web App   │─────▶│   n8n    │─────▶│  Facebook/Google │─────▶│  Gemini AI │
│  (Next.js)  │      │ Webhook  │      │   Ads API        │      │  Analysis  │
└─────────────┘      └──────────┘      └─────────────────┘      └────────────┘
```

## 📦 What's Included

```
├── n8n-workflow.json          # Complete n8n workflow (import-ready)
├── SETUP-GUIDE.md             # Comprehensive setup instructions
├── app/
│   ├── page.tsx               # Main web interface
│   ├── layout.tsx             # App layout
│   └── globals.css            # Styles
├── package.json               # Dependencies
└── README.md                  # This file
```

## 🚀 Quick Start

### 1. Import n8n Workflow

```bash
# In n8n:
# 1. Click "Add Workflow" → "Import from File"
# 2. Upload n8n-workflow.json
# 3. Configure credentials (see SETUP-GUIDE.md)
# 4. Activate workflow
```

### 2. Deploy Web Interface

```bash
# Install dependencies
npm install

# Build project
npm run build

# Deploy to Vercel
vercel deploy --prod --yes
```

### 3. Configure & Use

1. Get your webhook URL from n8n
2. Open the deployed website
3. Enter webhook URL and ad platform details
4. Click "Optimize My Ads"
5. Get AI-powered recommendations in seconds!

## 🔑 Required API Keys

### Gemini API (FREE)
- Get it: https://aistudio.google.com/app/apikey
- Limit: 60 requests/minute (generous free tier)

### Facebook Ads
- Access Token: https://developers.facebook.com/tools/explorer/
- Permissions: `ads_read`, `ads_management`

### Google Ads (Optional)
- OAuth2: https://console.cloud.google.com/
- Enable Google Ads API

## 📚 Documentation

See **SETUP-GUIDE.md** for:
- ✅ Detailed setup instructions
- ✅ API configuration guides
- ✅ Troubleshooting tips
- ✅ Alternative AI providers (Groq, OpenAI, Cohere)
- ✅ Customization options
- ✅ Resource links

## 🛠️ How It Works

1. **Data Collection**: Fetches ad performance data (impressions, CTR, conversions, spend)
2. **Performance Scoring**: Calculates scores based on: `(CTR × 100) + (Conversions × 10) - Cost/Conversion`
3. **Pattern Analysis**: Identifies top 5 and bottom 5 performers
4. **AI Analysis**: Gemini AI analyzes patterns and generates insights
5. **Creative Generation**: Produces 3 optimized ad variations with reasoning
6. **Recommendations**: Provides actionable next steps

## 🎯 Use Cases

- 📊 Weekly performance reviews
- 🚀 Campaign launches
- 🔄 A/B testing new creatives
- 💡 Creative refresh when performance declines
- 📈 Client reporting with AI insights

## 🌟 Tech Stack

- **Automation**: n8n (workflow automation)
- **AI**: Gemini 1.5 Pro (free tier)
- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **APIs**: Facebook Marketing API, Google Ads API
- **Deployment**: Vercel

## 📊 Example Output

```json
{
  "success": true,
  "insights": {
    "topPatterns": [
      "Use of urgency words like 'Limited Time'",
      "Clear value proposition in headline",
      "Strong CTA with action verbs"
    ]
  },
  "optimizedCreatives": [
    {
      "headline": "Save 40% Today Only - Limited Stock",
      "primaryText": "Transform your home with premium furniture...",
      "cta": "Shop Now",
      "reasoning": "Combines urgency, discount, and value prop"
    }
  ]
}
```

## 🔧 Customization

### Change AI Provider
Edit the "Gemini AI Analysis" node in n8n to use:
- Groq (FREE & fast)
- OpenAI GPT-4
- Anthropic Claude
- Cohere
- Mistral AI

### Adjust Performance Weights
Modify the scoring formula in "Analyze Performance" node

### Add More Creatives
Change the AI prompt to generate 5, 10, or more variations

## 🐛 Troubleshooting

**Webhook not working?**
- Ensure workflow is activated (toggle ON)
- Check webhook URL is correct
- Test with cURL first

**No data returned?**
- Verify account ID is correct
- Check date range has data
- Ensure API credentials are valid

**API errors?**
- Check API key is valid
- Verify rate limits not exceeded
- Review error logs in n8n

## 📖 Resources

- [n8n Documentation](https://docs.n8n.io/)
- [Gemini API Docs](https://ai.google.dev/docs)
- [Facebook Marketing API](https://developers.facebook.com/docs/marketing-apis)
- [Google Ads API](https://developers.google.com/google-ads/api)
- [Next.js Docs](https://nextjs.org/docs)

## 🤝 Support

- 📘 See SETUP-GUIDE.md for detailed help
- 💬 n8n Community: https://community.n8n.io/
- 🐛 Report issues on GitHub

## 📄 License

MIT License - Free to use and modify

---

**Built with ❤️ using n8n, Gemini AI, and Next.js**

🚀 Ready to optimize your ads? Start with `npm install`!
