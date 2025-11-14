'use client'

import { useState } from 'react'
import axios from 'axios'
import { Zap, TrendingUp, TrendingDown, Sparkles, CheckCircle, AlertCircle, Loader2, ExternalLink, Settings } from 'lucide-react'

interface OptimizedCreative {
  headline: string
  primaryText: string
  cta: string
  reasoning: string
}

interface AdPerformer {
  name: string
  impressions: number
  clicks: number
  ctr: number
  conversions: number
  costPerConversion: number
  performanceScore?: number
}

interface ApiResponse {
  success: boolean
  timestamp?: string
  analysis?: {
    topPerformers: AdPerformer[]
    bottomPerformers: AdPerformer[]
    metrics: {
      totalAds: number
      avgCTR: number
      avgConversions: number
      totalSpend: number
    }
  }
  insights?: {
    topPatterns: string[]
    bottomWeaknesses: string[]
  }
  optimizedCreatives?: OptimizedCreative[]
  recommendation?: string
  error?: string
}

export default function Home() {
  const [webhookUrl, setWebhookUrl] = useState('')
  const [platform, setPlatform] = useState<'facebook' | 'google'>('facebook')
  const [accountId, setAccountId] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ApiResponse | null>(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await axios.post<ApiResponse>(webhookUrl, {
        platform,
        accountId,
        startDate,
        endDate,
      })

      setResult(response.data)
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to optimize ads')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-6 shadow-lg">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Ad Creative Optimizer
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            AI-powered analysis of your Facebook & Google Ads performance with optimized creative recommendations
          </p>
        </div>

        {/* Configuration Form */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Configuration</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Webhook URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  n8n Webhook URL
                </label>
                <input
                  type="url"
                  required
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://your-n8n-instance.com/webhook/ad-optimizer"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Get this from your n8n workflow's Webhook Trigger node
                </p>
              </div>

              {/* Platform Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Ad Platform
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPlatform('facebook')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      platform === 'facebook'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                        : 'border-gray-300 dark:border-gray-600 hover:border-blue-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 dark:text-white">Facebook Ads</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Meta Business Platform</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlatform('google')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      platform === 'google'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                        : 'border-gray-300 dark:border-gray-600 hover:border-blue-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 dark:text-white">Google Ads</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Google Ads Platform</div>
                  </button>
                </div>
              </div>

              {/* Account ID */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Account ID
                </label>
                <input
                  type="text"
                  required
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                  placeholder={platform === 'facebook' ? 'act_123456789' : '1234567890'}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing & Optimizing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Optimize My Ads
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-4xl mx-auto mb-8 animate-slide-up">
            <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-6 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-red-800 dark:text-red-200 mb-1">Error</h3>
                <p className="text-red-700 dark:text-red-300">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {result && result.success && (
          <div className="max-w-6xl mx-auto space-y-8 animate-slide-up">
            {/* Metrics Overview */}
            {result.analysis && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                  Performance Overview
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-6 rounded-xl">
                    <div className="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-2">Total Ads</div>
                    <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                      {result.analysis.metrics.totalAds}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-6 rounded-xl">
                    <div className="text-sm text-green-600 dark:text-green-400 font-semibold mb-2">Avg CTR</div>
                    <div className="text-3xl font-bold text-green-900 dark:text-green-100">
                      {result.analysis.metrics.avgCTR.toFixed(2)}%
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 p-6 rounded-xl">
                    <div className="text-sm text-purple-600 dark:text-purple-400 font-semibold mb-2">Avg Conv</div>
                    <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                      {result.analysis.metrics.avgConversions.toFixed(0)}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 p-6 rounded-xl">
                    <div className="text-sm text-orange-600 dark:text-orange-400 font-semibold mb-2">Total Spend</div>
                    <div className="text-3xl font-bold text-orange-900 dark:text-orange-100">
                      ${result.analysis.metrics.totalSpend.toFixed(0)}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Insights */}
            {result.insights && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Top Performer Patterns
                  </h3>
                  <ul className="space-y-3">
                    {result.insights.topPatterns.map((pattern, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{pattern}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-3">
                    <TrendingDown className="w-5 h-5 text-red-600" />
                    Bottom Performer Weaknesses
                  </h3>
                  <ul className="space-y-3">
                    {result.insights.bottomWeaknesses.map((weakness, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Optimized Creatives */}
            {result.optimizedCreatives && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                  AI-Generated Optimized Creatives
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {result.optimizedCreatives.map((creative, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border-2 border-purple-200 dark:border-purple-700 hover:shadow-lg transition-shadow"
                    >
                      <div className="bg-purple-600 text-white text-sm font-bold py-1 px-3 rounded-full inline-block mb-4">
                        Variation {idx + 1}
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">
                            HEADLINE
                          </div>
                          <div className="text-lg font-bold text-gray-900 dark:text-white">
                            {creative.headline}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">
                            PRIMARY TEXT
                          </div>
                          <div className="text-sm text-gray-700 dark:text-gray-300">
                            {creative.primaryText}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">
                            CALL TO ACTION
                          </div>
                          <div className="inline-block bg-purple-600 text-white font-bold py-2 px-4 rounded-lg text-sm">
                            {creative.cta}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-purple-200 dark:border-purple-700">
                          <div className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-2">
                            WHY THIS WORKS
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 italic">
                            {creative.reasoning}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {result.recommendation && (
                  <div className="mt-8 bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-6 rounded-lg">
                    <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-2">Recommendation</h3>
                    <p className="text-blue-700 dark:text-blue-300">{result.recommendation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 pb-8">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>Powered by</span>
            <a
              href="https://n8n.io"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              n8n <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <a
              href="https://ai.google.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              Gemini AI <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              Next.js <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
