import React from 'react'

interface Post {
  id: number
  title: string
  body: string
}

async function getPosts(): Promise<Post[]> {
  // This runs at build time
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
  return response.json()
}

export default async function SSGPage() {
  const posts = await getPosts()
  const buildTime = new Date().toLocaleString()

  // Static CSS variables computed at build time
  const staticColors = {
    primary: '#8b5cf6',
    secondary: '#a855f7',
    accent: '#c084fc',
    light: '#f3e8ff',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #c084fc 100%)'
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Build-time generated static styles using standard CSS */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes staticGlow {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          
          .static-gradient {
            background: ${staticColors.gradient};
            background-size: 200% 200%;
            animation: staticGlow 4s ease-in-out infinite;
          }
          
          .static-card {
            background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
            border: 1px solid #e2e8f0;
            box-shadow: 
              0 4px 6px -1px rgba(139, 92, 246, 0.1),
              0 2px 4px -1px rgba(139, 92, 246, 0.06);
          }
          
          .static-post {
            background: linear-gradient(90deg, ${staticColors.light} 0%, transparent 100%);
            border-left: 4px solid ${staticColors.primary};
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .static-post:hover {
            background: linear-gradient(90deg, #ede9fe 0%, ${staticColors.light} 100%);
            transform: translateX(6px);
            box-shadow: 0 8px 25px rgba(139, 92, 246, 0.15);
          }
          
          .build-timestamp {
            background: ${staticColors.gradient};
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 9999px;
            font-size: 0.875rem;
            font-weight: 500;
            box-shadow: 0 4px 14px rgba(139, 92, 246, 0.25);
          }
        `
      }} />

      <div className="demo-header bg-purple-50 border-purple-400">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="text-4xl">📄</div>
          </div>
          <div className="ml-4">
            <h1 className="text-3xl font-bold text-purple-800 mb-3">
              Static Site Generation (SSG)
            </h1>
            <p className="text-purple-600 text-lg mb-4">
              This page is pre-rendered at build time with optimized static CSS. 
              All styles are computed and embedded during the build process for maximum performance.
            </p>
            <div className="flex items-center space-x-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-purple-100 text-purple-800 border border-purple-200">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Static pre-rendered content
              </div>
              <div className="build-timestamp">
                Built: {buildTime}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="static-card rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b border-purple-100 pb-3">
            How SSG Styling Works:
          </h2>
          <div className="space-y-4">
            {[
              { step: 1, text: "Styles computed at build time", color: staticColors.primary, icon: "⚙️" },
              { step: 2, text: "CSS optimized and minified", color: staticColors.secondary, icon: "🗜️" },
              { step: 3, text: "Static HTML with embedded styles", color: staticColors.accent, icon: "📦" },
              { step: 4, text: "Instant delivery from CDN", color: "#d946ef", icon: "⚡" }
            ].map((item) => (
              <div key={item.step} className="demo-step bg-purple-50 border border-purple-100">
                <span 
                  className="demo-step-number text-white"
                  style={{ backgroundColor: item.color }}
                >
                  {item.step}
                </span>
                <span className="text-purple-900 flex-1">{item.text}</span>
                <span className="text-lg">{item.icon}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="static-card rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b border-purple-100 pb-3">
            Static Performance Features:
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-purple-800 mb-2 flex items-center">
                <span className="text-lg mr-2">🚀</span>
                Pre-computed Styles
              </h3>
              <p className="text-sm text-purple-600">All CSS calculations done at build time</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                <span className="text-lg mr-2">📦</span>
                Optimized Bundles
              </h3>
              <p className="text-sm text-blue-600">Minified CSS with unused styles removed</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                <span className="text-lg mr-2">⚡</span>
                CDN Delivery
              </h3>
              <p className="text-sm text-green-600">Static assets served from edge locations</p>
            </div>
          </div>
        </div>
      </div>

      <div className="static-card rounded-xl p-6">
        <div className="flex justify-between items-center mb-6 border-b border-purple-100 pb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Pre-built Posts with Static Styling:
          </h2>
          <div className="flex items-center space-x-3">
            <div className="text-purple-600 text-sm font-medium bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              📦 Static Build
            </div>
            <div className="static-gradient text-white text-sm px-3 py-1 rounded-full">
              {buildTime}
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {posts.map((post, index) => (
            <article key={post.id} className="static-post p-6 rounded-r-lg">
              <div className="flex items-start">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-4 mt-1"
                  style={{
                    background: `linear-gradient(135deg, ${staticColors.primary} 0%, ${staticColors.secondary} 100%)`,
                    boxShadow: `0 2px 4px rgba(139, 92, 246, 0.3)`
                  }}
                >
                  {post.id}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-2 text-lg">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-3">{post.body}</p>
                  <div className="flex items-center space-x-2">
                    <div className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded border border-purple-200">
                      🏗️ Pre-built at {buildTime}
                    </div>
                    <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded border border-green-200">
                      ⚡ Static delivery
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-200">
        <h3 className="font-semibold mb-4 text-purple-800 text-xl flex items-center">
          <span className="text-2xl mr-3">🎨</span>
          SSG Styling Characteristics:
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-purple-100">
            <h4 className="font-medium text-green-600 mb-3 flex items-center">
              <span className="text-lg mr-2">✅</span> Advantages
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center">
                <span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>
                Maximum performance with pre-computed styles
              </li>
              <li className="flex items-center">
                <span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>
                Zero runtime CSS processing
              </li>
              <li className="flex items-center">
                <span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>
                Optimized and minified CSS bundles
              </li>
              <li className="flex items-center">
                <span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>
                Perfect lighthouse scores
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-red-100">
            <h4 className="font-medium text-red-600 mb-3 flex items-center">
              <span className="text-lg mr-2">⚠️</span> Limitations
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center">
                <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                No dynamic styling at runtime
              </li>
              <li className="flex items-center">
                <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                Rebuild required for style changes
              </li>
              <li className="flex items-center">
                <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                Build time increases with complexity
              </li>
              <li className="flex items-center">
                <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                Limited personalization options
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Technical Deep Dive Section */}
      <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <span className="text-2xl mr-3">🏗️</span>
          Technical Deep Dive: How SSG Works
        </h2>

        {/* Build Process vs Runtime */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-800 mb-4">🔨 Build Time Process</h3>
            <ul className="space-y-2 text-sm text-purple-700">
              <li>• API calls made during build</li>
              <li>• Static HTML files generated</li>
              <li>• CSS optimized and minified</li>
              <li>• Images processed and optimized</li>
              <li>• Bundle splitting for efficiency</li>
            </ul>
            <div className="mt-4 p-3 bg-purple-100 rounded text-xs">
              <strong>Build Time:</strong> {buildTime}<br/>
              <strong>Generation:</strong> Static file creation
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-4">⚡ Runtime Experience</h3>
            <ul className="space-y-2 text-sm text-green-700">
              <li>• Instant file serving from CDN</li>
              <li>• No server processing needed</li>
              <li>• Pre-optimized critical CSS</li>
              <li>• Immediate content visibility</li>
              <li>• Minimal JavaScript execution</li>
            </ul>
            <div className="mt-4 p-3 bg-green-100 rounded text-xs">
              <strong>Delivery:</strong> Static file serving<br/>
              <strong>Speed:</strong> Near-instant loading
            </div>
          </div>
        </div>

        {/* Generated Files Structure */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Generated Static Files</h3>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono">
            <pre>{`📁 .next/
├── 📁 static/
│   ├── 📄 chunks/
│   │   ├── main-[hash].js        # Core React bundle
│   │   ├── webpack-[hash].js     # Webpack runtime
│   │   └── pages/ssg-[hash].js   # Page-specific code
│   └── 📄 css/
│       └── [hash].css            # Optimized styles
├── 📁 server/
│   └── 📄 pages/
│       └── ssg.html             # Pre-rendered HTML
└── 📄 build-manifest.json       # Asset mapping`}</pre>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            ✅ <strong>Zero runtime processing</strong> - Everything pre-computed at build time
          </p>
        </div>

        {/* Build-time CSS Generation */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Static CSS Generation Example</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Build-time Computed Styles:</h4>
              <div className="bg-gray-900 text-blue-400 p-3 rounded text-xs font-mono">
                <pre>{`const staticColors = {
  primary: '${staticColors.primary}',
  secondary: '${staticColors.secondary}',
  accent: '${staticColors.accent}',
  gradient: '${staticColors.gradient}'
};

// Generated at build time:
.static-gradient {
  background: ${staticColors.gradient};
  animation: staticGlow 4s infinite;
}`}</pre>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Optimized Output:</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded text-xs font-mono">
                <pre>{`/* Minified and optimized */
.static-gradient{
  background:linear-gradient(135deg,
    #8b5cf6 0%,#a855f7 50%,#c084fc 100%);
  background-size:200% 200%;
  animation:staticGlow 4s ease-in-out infinite
}
@keyframes staticGlow{
  0%,100%{background-position:0% 50%}
  50%{background-position:100% 50%}
}`}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">SSG Performance Characteristics</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
              <h4 className="font-semibold text-gray-700 mb-2">TTFB</h4>
              <div className="text-2xl font-bold text-green-600">~20ms</div>
              <p className="text-xs text-gray-500">CDN static serving</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
              <h4 className="font-semibold text-gray-700 mb-2">FCP</h4>
              <div className="text-2xl font-bold text-green-600">~100ms</div>
              <p className="text-xs text-gray-500">Immediate content</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
              <h4 className="font-semibold text-gray-700 mb-2">LCP</h4>
              <div className="text-2xl font-bold text-green-600">~150ms</div>
              <p className="text-xs text-gray-500">All content ready</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
              <h4 className="font-semibold text-gray-700 mb-2">TTI</h4>
              <div className="text-2xl font-bold text-green-600">~200ms</div>
              <p className="text-xs text-gray-500">Fast hydration</p>
            </div>
          </div>
        </div>

        {/* Build vs Runtime Comparison */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Build vs Runtime Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left p-2">Aspect</th>
                  <th className="text-left p-2">Build Time</th>
                  <th className="text-left p-2">Runtime</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b border-gray-200">
                  <td className="p-2 font-medium">Data Fetching</td>
                  <td className="p-2 text-purple-600">✅ API calls made</td>
                  <td className="p-2 text-gray-500">❌ No API calls</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-2 font-medium">CSS Processing</td>
                  <td className="p-2 text-purple-600">✅ Optimized & minified</td>
                  <td className="p-2 text-gray-500">❌ Pre-processed</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-2 font-medium">HTML Generation</td>
                  <td className="p-2 text-purple-600">✅ Complete HTML created</td>
                  <td className="p-2 text-gray-500">❌ Static file served</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-2 font-medium">Server Load</td>
                  <td className="p-2 text-purple-600">⚡ High (one-time)</td>
                  <td className="p-2 text-green-600">✅ Minimal</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

// This tells Next.js to generate this page statically at build time
export const dynamic = 'force-static'
