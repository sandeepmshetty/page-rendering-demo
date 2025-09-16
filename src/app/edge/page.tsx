import React from 'react'

export const runtime = 'edge'

export default async function EdgePage() {
  const requestTime = new Date().toISOString()
  const serverTime = new Date().toLocaleString('en-US', { 
    timeZone: 'UTC',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  })
  
  // Simulate some edge computation
  const edgeLocation = process.env.VERCEL_REGION || 'local-dev'
  const processingStart = Date.now()
  await new Promise(resolve => setTimeout(resolve, 10)) // Simulate work
  const processingTime = Date.now() - processingStart

  return (
    <div className="max-w-4xl mx-auto">
      <div className="demo-header bg-indigo-50 border-indigo-400">
        <h1 className="text-3xl font-bold text-indigo-800">Edge Runtime (SSR at the Edge)</h1>
        <p className="text-indigo-700">This page executes on the Edge Runtime close to the user for optimal performance.</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg border shadow">
          <h2 className="text-xl font-semibold text-indigo-700 mb-4">⚡ Edge Performance</h2>
          <div className="space-y-2 text-sm">
            <div><strong>Request Time:</strong> {requestTime}</div>
            <div><strong>Server Time:</strong> {serverTime}</div>
            <div><strong>Processing Time:</strong> {processingTime}ms</div>
            <div><strong>Edge Region:</strong> {edgeLocation}</div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow">
          <h2 className="text-xl font-semibold text-indigo-700 mb-4">🌍 Edge Benefits</h2>
          <ul className="text-sm space-y-2">
            <li>• Runs closer to users globally</li>
            <li>• Faster cold starts than traditional SSR</li>
            <li>• Automatic geographic distribution</li>
            <li>• Reduced latency for dynamic content</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg mt-6">
        <h2 className="text-xl font-semibold mb-4">Edge Runtime Characteristics</h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <h3 className="font-medium text-green-700 mb-2">✅ Available</h3>
            <ul className="space-y-1">
              <li>• Web APIs (fetch, etc.)</li>
              <li>• Environment variables</li>
              <li>• JSON operations</li>
              <li>• Crypto (Web Crypto API)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-red-700 mb-2">❌ Not Available</h3>
            <ul className="space-y-1">
              <li>• Node.js APIs (fs, path)</li>
              <li>• Native Node modules</li>
              <li>• Large npm packages</li>
              <li>• File system access</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-blue-700 mb-2">🎯 Best For</h3>
            <ul className="space-y-1">
              <li>• API routes</li>
              <li>• Authentication</li>
              <li>• A/B testing</li>
              <li>• Real-time features</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
