'use client'

import React, { useState, useEffect } from 'react'

interface Post {
  id: number
  title: string
  body: string
}

export default function CSRPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [animateCards, setAnimateCards] = useState(false)

  useEffect(() => {
    // Simulate API call with client-side styling effects
    const fetchPosts = async () => {
      try {
        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate delay
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
        const data = await response.json()
        setPosts(data)
        
        // Trigger animation after data loads (CSR-specific effect)
        setTimeout(() => setAnimateCards(true), 100)
      } catch (err) {
        setError('Failed to fetch posts')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="max-w-6xl mx-auto">
      <div className="demo-header bg-blue-50 border-blue-400">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="text-4xl animate-pulse-slow">🔄</div>
          </div>
          <div className="ml-4">
            <h1 className="text-3xl font-bold text-blue-800 mb-3">
              Client-Side Rendering (CSR)
            </h1>
            <p className="text-blue-600 text-lg">
              This page demonstrates dynamic client-side styling and interactions. 
              Everything is rendered and styled in the browser using React hooks and state.
            </p>
            <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              Client-side rendered content
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="demo-card">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">How CSR Works:</h2>
          <div className="space-y-4">
            {[
              { step: 1, text: "Browser downloads HTML shell and JavaScript bundle", color: "bg-blue-500" },
              { step: 2, text: "JavaScript executes and renders the page", color: "bg-blue-600" },
              { step: 3, text: "API calls are made to fetch data", color: "bg-blue-700" },
              { step: 4, text: "Page updates with fetched data and styling", color: "bg-blue-800" }
            ].map((item, index) => (
              <div 
                key={item.step} 
                className="demo-step"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <span className={`demo-step-number ${item.color}`}>
                  {item.step}
                </span>
                <span className="text-gray-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="demo-card">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Interactive Features:</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">Dynamic State Management</h3>
              <p className="text-sm text-blue-600">Loading states, error handling, and data updates</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-purple-800 mb-2">Client-Side Animations</h3>
              <p className="text-sm text-purple-600">Smooth transitions and interactive effects</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">Real-time Updates</h3>
              <p className="text-sm text-green-600">Content updates without page refresh</p>
            </div>
          </div>
        </div>
      </div>

      <div className="demo-card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Sample Posts (Fetched Client-Side):
          </h2>
          {!loading && (
            <div className="flex items-center text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium">Live Data</span>
            </div>
          )}
        </div>
        
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-gray-600 animate-pulse-slow">Loading posts with dynamic styling...</p>
            <div className="mt-2 text-sm text-gray-500">Demonstrating client-side loading states</div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 animate-fade-in">
            <div className="flex items-center">
              <div className="text-red-500 text-xl mr-3">❌</div>
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-4">
            {posts.map((post, index) => (
              <div 
                key={post.id} 
                className={`post-item border-blue-400 transform transition-all duration-500 ${
                  animateCards ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                    {post.id}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{post.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <h3 className="font-semibold mb-4 text-blue-800 text-xl">CSR Styling Characteristics:</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-medium text-green-600 mb-3 flex items-center">
              <span className="text-lg mr-2">✅</span> Advantages
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center"><span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>Dynamic interactions and animations</li>
              <li className="flex items-center"><span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>Real-time style updates</li>
              <li className="flex items-center"><span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>Rich user interface components</li>
              <li className="flex items-center"><span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>Responsive to user interactions</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-medium text-red-600 mb-3 flex items-center">
              <span className="text-lg mr-2">⚠️</span> Considerations
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center"><span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>Styles load after JavaScript execution</li>
              <li className="flex items-center"><span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>Potential flash of unstyled content</li>
              <li className="flex items-center"><span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>Requires JavaScript for styling</li>
              <li className="flex items-center"><span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>Runtime style computations</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Technical Deep Dive Section */}
      <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <span className="text-2xl mr-3">⚡</span>
          Technical Deep Dive: How CSR Works
        </h2>

        {/* Initial HTML vs Rendered HTML */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Initial HTML (What Browser Gets)</h3>
            <div className="bg-gray-900 text-red-400 p-4 rounded-lg text-sm font-mono">
              <pre>{`<!DOCTYPE html>
<html>
<head>
  <title>CSR Page</title>
  <link href="styles.css" rel="stylesheet">
</head>
<body>
  <div id="__next">
    <!-- Empty or minimal content -->
    <div class="loading-spinner">Loading...</div>
  </div>
  <script src="bundle.js"></script>
</body>
</html>`}</pre>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              ⚠️ <strong>Minimal HTML</strong> - Most content rendered by JavaScript
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">After JavaScript Execution</h3>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono">
              <pre>{`<!-- DOM populated by React -->
<div id="__next">
  <h1>Client-Side Rendered Content</h1>
  <div class="posts-container">
    ${posts.slice(0, 2).map(post => `
    <article class="post-card">
      <h3>${post.title}</h3>
      <p>${post.body.substring(0, 50)}...</p>
    </article>`).join('')}
  </div>
</div>`}</pre>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              ✅ <strong>Fully rendered DOM</strong> - Content populated by JavaScript
            </p>
          </div>
        </div>

        {/* JavaScript Bundle Analysis */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">JavaScript Bundle Breakdown</h3>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-100 p-4 rounded text-center">
                <div className="text-2xl font-bold text-blue-600">~250KB</div>
                <div className="text-sm text-blue-700">React Runtime</div>
              </div>
              <div className="bg-green-100 p-4 rounded text-center">
                <div className="text-2xl font-bold text-green-600">~45KB</div>
                <div className="text-sm text-green-700">Component Code</div>
              </div>
              <div className="bg-purple-100 p-4 rounded text-center">
                <div className="text-2xl font-bold text-purple-600">~15KB</div>
                <div className="text-sm text-purple-700">Styling Libraries</div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4 text-center">
              Total bundle size affects initial load time and Time to Interactive (TTI)
            </p>
          </div>
        </div>

        {/* Render Timeline */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">CSR Rendering Timeline</h3>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-red-50 rounded border-l-4 border-red-400">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
              <div className="ml-4">
                <div className="font-medium">HTML Downloaded (~0ms)</div>
                <div className="text-sm text-gray-600">Browser receives minimal HTML shell</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-yellow-50 rounded border-l-4 border-yellow-400">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
              <div className="ml-4">
                <div className="font-medium">JavaScript Downloaded (~500ms)</div>
                <div className="text-sm text-gray-600">Bundle parsed and executed</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-blue-50 rounded border-l-4 border-blue-400">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
              <div className="ml-4">
                <div className="font-medium">API Call Made (~800ms)</div>
                <div className="text-sm text-gray-600">Fetch data from external API</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-green-50 rounded border-l-4 border-green-400">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
              <div className="ml-4">
                <div className="font-medium">Content Rendered (~2000ms)</div>
                <div className="text-sm text-gray-600">DOM updated with fetched data</div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Comparison */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <h4 className="font-semibold text-gray-700 mb-2">TTFB</h4>
            <div className="text-2xl font-bold text-green-600">~50ms</div>
            <p className="text-xs text-gray-500">Fast HTML delivery</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <h4 className="font-semibold text-gray-700 mb-2">FCP</h4>
            <div className="text-2xl font-bold text-yellow-600">~800ms</div>
            <p className="text-xs text-gray-500">After JS execution</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <h4 className="font-semibold text-gray-700 mb-2">LCP</h4>
            <div className="text-2xl font-bold text-red-600">~2000ms</div>
            <p className="text-xs text-gray-500">After API response</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <h4 className="font-semibold text-gray-700 mb-2">TTI</h4>
            <div className="text-2xl font-bold text-blue-600">~2100ms</div>
            <p className="text-xs text-gray-500">Fully interactive</p>
          </div>
        </div>

        {/* State Management Demo */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Client-Side State Management</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Current State:</h4>
              <div className="bg-white p-3 rounded text-sm font-mono">
                {`{
  posts: [${posts.length} items],
  loading: ${loading},
  error: ${error ? `"${error}"` : 'null'},
  animateCards: ${animateCards}
}`}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Capabilities:</h4>
              <ul className="text-sm space-y-1">
                <li>• Real-time state updates</li>
                <li>• Dynamic styling based on state</li>
                <li>• Interactive animations</li>
                <li>• User-driven state changes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
