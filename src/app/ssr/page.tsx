import React from 'react'

interface Post {
  id: number
  title: string
  body: string
}

async function getPosts(): Promise<Post[]> {
  // This runs on the server
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5', {
    cache: 'no-store' // This ensures fresh data on each request
  })
  return response.json()
}

export default async function SSRPage() {
  const posts = await getPosts()
  const renderTime = new Date().toLocaleString()
  const requestId = Math.random().toString(36).substring(7)

  // Generate sample HTML that would be sent to browser
  const sampleGeneratedHTML = `<!DOCTYPE html>
<html>
<head>
  <title>SSR Page</title>
  <style>/* Critical CSS inlined */</style>
</head>
<body>
  <div id="__next">
    <h1>Server-Side Rendered Content</h1>
    <p>Rendered at: ${renderTime}</p>
    <div>
      ${posts.map(post => `
        <article>
          <h3>${post.title}</h3>
          <p>${post.body.substring(0, 100)}...</p>
        </article>
      `).join('')}
    </div>
  </div>
  <script>/* Hydration script */</script>
</body>
</html>`

  // Server-side generated inline styles for critical rendering path
  const criticalStyles = {
    serverBadge: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.2)',
    },
    serverHeader: {
      background: 'linear-gradient(135deg, #dcfdf4 0%, #bbf7d0 100%)',
      borderLeft: '6px solid #10b981',
    },
    liveIndicator: {
      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Server-rendered critical styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .server-render-time {
            background: linear-gradient(45deg, #10b981, #059669);
            background-size: 200% 200%;
            animation: gradientShift 3s ease infinite;
          }
          
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          .server-post-item {
            border-left: 4px solid #10b981;
            background: linear-gradient(90deg, #f0fdf4 0%, transparent 100%);
            transition: all 0.2s ease;
          }
          
          .server-post-item:hover {
            background: linear-gradient(90deg, #dcfdf4 0%, #f0fdf4 100%);
            transform: translateX(4px);
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
          }
        `
      }} />
      
      <div className="demo-header" style={criticalStyles.serverHeader}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="text-4xl">🖥️</div>
          </div>
          <div className="ml-4">
            <h1 className="text-3xl font-bold text-green-800 mb-3">
              Server-Side Rendering (SSR)
            </h1>
            <p className="text-green-600 text-lg mb-4">
              This page is fully rendered on the server with critical CSS inlined for optimal performance. 
              All styling is applied before the HTML reaches the browser.
            </p>
            <div className="flex items-center space-x-4">
              <div 
                className="inline-flex items-center px-4 py-2 rounded-full text-sm text-white font-medium"
                style={criticalStyles.serverBadge}
              >
                <span className="w-2 h-2 bg-white rounded-full mr-2" style={criticalStyles.liveIndicator}></span>
                Server-rendered content
              </div>
              <div className="server-render-time text-white px-3 py-1 rounded-full text-sm font-medium">
                Rendered: {renderTime}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="demo-card border-green-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b border-green-100 pb-3">
            How SSR Styling Works:
          </h2>
          <div className="space-y-4">
            {[
              { step: 1, text: "Server processes request and applies styles", color: "bg-green-500", icon: "🔄" },
              { step: 2, text: "Critical CSS is inlined in HTML", color: "bg-green-600", icon: "🎨" },
              { step: 3, text: "Fully styled HTML sent to browser", color: "bg-green-700", icon: "📤" },
              { step: 4, text: "Browser displays styled content immediately", color: "bg-green-800", icon: "⚡" }
            ].map((item) => (
              <div key={item.step} className="demo-step bg-green-50 border border-green-100">
                <span className={`demo-step-number ${item.color}`}>
                  {item.step}
                </span>
                <span className="text-green-900 flex-1">{item.text}</span>
                <span className="text-lg">{item.icon}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="demo-card border-green-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b border-green-100 pb-3">
            SSR Styling Benefits:
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                <span className="text-lg mr-2">🚀</span>
                Critical CSS Inlined
              </h3>
              <p className="text-sm text-green-600">Styles are included in the initial HTML response</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                <span className="text-lg mr-2">👁️</span>
                No FOUC (Flash of Unstyled Content)
              </h3>
              <p className="text-sm text-blue-600">Content appears styled from the first render</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-purple-800 mb-2 flex items-center">
                <span className="text-lg mr-2">🔍</span>
                SEO-Friendly Styling
              </h3>
              <p className="text-sm text-purple-600">Search engines see fully styled content</p>
            </div>
          </div>
        </div>
      </div>

      <div className="demo-card border-green-200">
        <div className="flex justify-between items-center mb-6 border-b border-green-100 pb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Server-Rendered Posts with Inline Styles:
          </h2>
          <div className="flex items-center space-x-3">
            <div className="text-green-600 text-sm font-medium bg-green-50 px-3 py-1 rounded-full border border-green-200">
              ✅ Pre-styled on Server
            </div>
            <div className="text-blue-600 text-sm bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              🕐 {renderTime}
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {posts.map((post, index) => (
            <article 
              key={post.id} 
              className="server-post-item p-6 rounded-r-lg"
              style={{
                // Inline styles for server-side rendering
                animationDelay: `${index * 0.1}s`,
                background: `linear-gradient(90deg, 
                  hsl(${120 + index * 10}, 60%, 97%) 0%, 
                  hsl(${120 + index * 10}, 40%, 99%) 100%)`
              }}
            >
              <div className="flex items-start">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-4 mt-1"
                  style={{
                    background: `linear-gradient(135deg, #10b981 0%, #059669 100%)`,
                    boxShadow: '0 2px 4px rgba(16, 185, 129, 0.3)'
                  }}
                >
                  {post.id}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-2 text-lg">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{post.body}</p>
                  <div className="mt-3 text-xs text-green-600 bg-green-50 inline-block px-2 py-1 rounded">
                    Server-rendered at {renderTime}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
        <h3 className="font-semibold mb-4 text-green-800 text-xl flex items-center">
          <span className="text-2xl mr-3">🎨</span>
          SSR Styling Characteristics:
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-green-100">
            <h4 className="font-medium text-green-600 mb-3 flex items-center">
              <span className="text-lg mr-2">✅</span> Advantages
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center">
                <span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>
                Critical CSS inlined for fast rendering
              </li>
              <li className="flex items-center">
                <span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>
                No flash of unstyled content (FOUC)
              </li>
              <li className="flex items-center">
                <span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>
                SEO-friendly styled content
              </li>
              <li className="flex items-center">
                <span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>
                Consistent styling across all requests
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-red-100">
            <h4 className="font-medium text-red-600 mb-3 flex items-center">
              <span className="text-lg mr-2">⚠️</span> Considerations
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center">
                <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                Increased server processing time
              </li>
              <li className="flex items-center">
                <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                Larger HTML payload with inline styles
              </li>
              <li className="flex items-center">
                <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                Limited dynamic styling capabilities
              </li>
              <li className="flex items-center">
                <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                Server resource requirements
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Technical Deep Dive Section */}
      <div className="demo-card border-indigo-200 mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <span className="text-2xl mr-3">🔧</span>
          Technical Deep Dive: How SSR Works
        </h2>

        {/* HTML Source Display */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Generated HTML Source (What Browser Receives)</h3>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono">
            <pre className="whitespace-pre-wrap">{sampleGeneratedHTML}</pre>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            ✅ <strong>Fully rendered HTML</strong> - Content is visible immediately, no JavaScript required for initial render
          </p>
        </div>

        {/* Server vs Client Processing */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-4">🖥️ Server Processing</h3>
            <ul className="space-y-2 text-sm text-green-700">
              <li>• Data fetching happens on server</li>
              <li>• HTML rendered with complete content</li>
              <li>• CSS computed and inlined</li>
              <li>• SEO-friendly markup generated</li>
              <li>• No loading states visible to user</li>
            </ul>
            <div className="mt-4 p-3 bg-green-100 rounded text-xs">
              <strong>Request ID:</strong> {requestId}<br/>
              <strong>Render Time:</strong> {renderTime}
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">🌐 Client Experience</h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• Receives fully formed HTML</li>
              <li>• Content visible immediately</li>
              <li>• React hydrates for interactivity</li>
              <li>• No flash of unstyled content</li>
              <li>• Faster perceived performance</li>
            </ul>
            <div className="mt-4 p-3 bg-blue-100 rounded text-xs">
              <strong>Network:</strong> Single request<br/>
              <strong>Time to Content:</strong> ~100ms
            </div>
          </div>
        </div>

        {/* Request Flow */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Request Flow Diagram</h3>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mb-2">1</div>
                <p>User Request</p>
              </div>
              <div className="flex-1 h-px bg-gray-300 mx-4"></div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mb-2">2</div>
                <p>Server Fetch</p>
              </div>
              <div className="flex-1 h-px bg-gray-300 mx-4"></div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mb-2">3</div>
                <p>Render HTML</p>
              </div>
              <div className="flex-1 h-px bg-gray-300 mx-4"></div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mb-2">4</div>
                <p>Send Response</p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-700 mb-2">TTFB (Time to First Byte)</h4>
            <div className="text-2xl font-bold text-orange-600">~200ms</div>
            <p className="text-xs text-gray-500">Server processing time</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-700 mb-2">FCP (First Contentful Paint)</h4>
            <div className="text-2xl font-bold text-green-600">~300ms</div>
            <p className="text-xs text-gray-500">Content visible immediately</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-700 mb-2">LCP (Largest Contentful Paint)</h4>
            <div className="text-2xl font-bold text-blue-600">~400ms</div>
            <p className="text-xs text-gray-500">All content rendered</p>
          </div>
        </div>
      </div>
    </div>
  )
}
