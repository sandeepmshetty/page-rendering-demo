interface Post {
  id: number;
  title: string;
  body: string;
}

interface ISRPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

// Fetch data with ISR revalidation
async function getData(): Promise<{ posts: Post[]; timestamp: string; cacheStatus: string }> {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3', {
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    
    const posts = await res.json();
    const timestamp = new Date().toISOString();
    
    // Simulate cache status based on timestamp
    const cacheAge = Date.now() % 120000; // Simulate 2-minute cache cycle
    const cacheStatus = cacheAge < 60000 ? 'fresh' : 'stale-revalidating';
    
    return { posts, timestamp, cacheStatus };
  } catch (error) {
    return {
      posts: [
        { id: 1, title: "Fallback Post 1", body: "This is a fallback post for ISR demo." },
        { id: 2, title: "Fallback Post 2", body: "ISR allows graceful fallbacks when APIs fail." },
        { id: 3, title: "Fallback Post 3", body: "Content is still served even during revalidation." }
      ],
      timestamp: new Date().toISOString(),
      cacheStatus: 'fallback'
    };
  }
}

import RevalidateButton from '@/components/RevalidateButton';

export default async function ISRPage({ searchParams }: ISRPageProps) {
  const { posts, timestamp, cacheStatus } = await getData();
  // Generate adaptive styles based on cache status
  const cacheColors = {
    fresh: 'from-green-400 to-emerald-600',
    'stale-revalidating': 'from-yellow-400 to-orange-600', 
    fallback: 'from-red-400 to-pink-600'
  };
  
  const adaptiveStyles = `
    .isr-container {
      background: linear-gradient(135deg, ${cacheStatus === 'fresh' ? '#10b981, #059669' : 
                                          cacheStatus === 'stale-revalidating' ? '#f59e0b, #ea580c' : 
                                          '#ef4444, #ec4899'});
      transition: all 0.5s ease-in-out;
    }
    .cache-indicator {
      box-shadow: 0 0 20px ${cacheStatus === 'fresh' ? '#10b981' : 
                             cacheStatus === 'stale-revalidating' ? '#f59e0b' : 
                             '#ef4444'}40;
      animation: pulse-${cacheStatus} 2s ease-in-out infinite;
    }
    @keyframes pulse-fresh {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.8; }
    }
    @keyframes pulse-stale-revalidating {
      0%, 100% { transform: scale(1); opacity: 1; }
      25% { transform: scale(1.02); opacity: 0.9; }
      75% { transform: scale(1.08); opacity: 0.7; }
    }
    @keyframes pulse-fallback {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.1); opacity: 0.6; }
    }
  `;

  return (
    <div className="min-h-screen p-8">
      <style dangerouslySetInnerHTML={{ __html: adaptiveStyles }} />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Incremental Static Regeneration (ISR)
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Static pages that update in the background - best of both worlds
          </p>
          
          {/* Cache Status Indicator */}
          <div className={`cache-indicator inline-block px-6 py-3 rounded-full text-white font-semibold mb-8 bg-gradient-to-r ${cacheColors[cacheStatus as keyof typeof cacheColors]}`}>
            Cache Status: {cacheStatus.replace('-', ' ').toUpperCase()}
          </div>

          <div className="mt-4">
            <RevalidateButton path="/isr" />
          </div>

        </div>

        {/* ISR Explanation */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">How ISR Works</h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">1. Static First</h3>
              <p className="text-blue-700">Pages are pre-rendered at build time for instant loading</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">2. Background Updates</h3>
              <p className="text-yellow-700">Content revalidates in background after specified time</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">3. Seamless Refresh</h3>
              <p className="text-green-700">Users get fresh content without waiting for builds</p>
            </div>
          </div>
        </div>

        {/* Dynamic Content Based on Cache Status */}
        <div className="grid gap-6">
          {posts.map((post, index) => (
            <div 
              key={post.id} 
              className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-500 hover:scale-105"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.body}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Post #{post.id}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  cacheStatus === 'fresh' ? 'bg-green-100 text-green-800' :
                  cacheStatus === 'stale-revalidating' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {cacheStatus === 'fresh' ? 'Fresh Content' :
                   cacheStatus === 'stale-revalidating' ? 'Updating...' :
                   'Fallback Content'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Details */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Technical Details</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong className="text-gray-700">Revalidation Strategy:</strong>
              <p className="text-gray-600">Time-based (60 seconds)</p>
            </div>
            <div>
              <strong className="text-gray-700">Cache Status:</strong>
              <p className="text-gray-600">{cacheStatus}</p>
            </div>
            <div>
              <strong className="text-gray-700">Last Generated:</strong>
              <p className="text-gray-600">{new Date(timestamp).toLocaleString()}</p>
            </div>
            <div>
              <strong className="text-gray-700">Content Source:</strong>
              <p className="text-gray-600">
                {cacheStatus === 'fallback' ? 'Static Fallback' : 'JSONPlaceholder API'}
              </p>
            </div>
          </div>
        </div>

        {/* Performance Benefits */}
        <div className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">ISR Benefits</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
              Fast initial page loads (static generation)
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
              Fresh content without full rebuilds
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
              Automatic fallback to cached content during API failures
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
              Reduced server load with intelligent caching
            </li>
          </ul>
        </div>
      </div>

      {/* Technical Deep Dive Section */}
      <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <span className="text-2xl mr-3">🔄</span>
          Technical Deep Dive: How ISR Works
        </h2>

        {/* ISR Lifecycle */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">ISR Revalidation Lifecycle</h3>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-blue-50 rounded border-l-4 border-blue-400">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
              <div className="ml-4 flex-1">
                <div className="font-medium">Initial Build (t=0)</div>
                <div className="text-sm text-gray-600">Static page generated with initial data</div>
              </div>
              <div className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">Build Time</div>
            </div>
            
            <div className="flex items-center p-4 bg-green-50 rounded border-l-4 border-green-400">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
              <div className="ml-4 flex-1">
                <div className="font-medium">Serve Cached (t=0-60s)</div>
                <div className="text-sm text-gray-600">Static file served instantly from cache</div>
              </div>
              <div className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">Cache Hit</div>
            </div>
            
            <div className="flex items-center p-4 bg-yellow-50 rounded border-l-4 border-yellow-400">
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
              <div className="ml-4 flex-1">
                <div className="font-medium">Trigger Revalidation (t=60s+)</div>
                <div className="text-sm text-gray-600">First request after revalidate time triggers background update</div>
              </div>
              <div className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded">Stale While Revalidate</div>
            </div>
            
            <div className="flex items-center p-4 bg-purple-50 rounded border-l-4 border-purple-400">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
              <div className="ml-4 flex-1">
                <div className="font-medium">Background Update</div>
                <div className="text-sm text-gray-600">New data fetched and page regenerated in background</div>
              </div>
              <div className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded">Background Process</div>
            </div>
            
            <div className="flex items-center p-4 bg-indigo-50 rounded border-l-4 border-indigo-400">
              <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">5</div>
              <div className="ml-4 flex-1">
                <div className="font-medium">Cache Update</div>
                <div className="text-sm text-gray-600">New version replaces cached version when ready</div>
              </div>
              <div className="text-xs text-indigo-600 bg-indigo-100 px-2 py-1 rounded">Cache Update</div>
            </div>
          </div>
        </div>

        {/* Code Configuration */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">ISR Configuration Code</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Page-level Revalidation:</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded text-sm font-mono">
                <pre>{`// page.tsx
export const revalidate = 60;

export default async function Page() {
  const data = await fetch(url, {
    next: { revalidate: 60 }
  });
  return <div>{/* content */}</div>;
}`}</pre>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Fetch-level Revalidation:</h4>
              <div className="bg-gray-900 text-blue-400 p-3 rounded text-sm font-mono">
                <pre>{`// Individual fetch control
const posts = await fetch(url, {
  next: { 
    revalidate: 60,  // 60 seconds
    tags: ['posts']  // Cache tags
  }
});

// On-demand revalidation
revalidateTag('posts');`}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Cache States Visualization */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Current Cache State Visualization</h3>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="grid md:grid-cols-3 gap-4">
              <div className={`p-4 rounded-lg text-center border-2 ${
                cacheStatus === 'fresh' ? 'border-green-400 bg-green-50' : 'border-gray-200 bg-white'
              }`}>
                <div className="text-2xl mb-2">🟢</div>
                <div className="font-semibold">Fresh</div>
                <div className="text-sm text-gray-600">Content is current</div>
                {cacheStatus === 'fresh' && <div className="text-xs text-green-600 mt-2">← Current State</div>}
              </div>
              
              <div className={`p-4 rounded-lg text-center border-2 ${
                cacheStatus === 'stale-revalidating' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 bg-white'
              }`}>
                <div className="text-2xl mb-2">🟡</div>
                <div className="font-semibold">Stale-Revalidating</div>
                <div className="text-sm text-gray-600">Updating in background</div>
                {cacheStatus === 'stale-revalidating' && <div className="text-xs text-yellow-600 mt-2">← Current State</div>}
              </div>
              
              <div className={`p-4 rounded-lg text-center border-2 ${
                cacheStatus === 'fallback' ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
              }`}>
                <div className="text-2xl mb-2">🔴</div>
                <div className="font-semibold">Fallback</div>
                <div className="text-sm text-gray-600">Using cached fallback</div>
                {cacheStatus === 'fallback' && <div className="text-xs text-red-600 mt-2">← Current State</div>}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Comparison */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">ISR vs Other Strategies</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 border-b">Strategy</th>
                  <th className="text-left p-3 border-b">Initial Load</th>
                  <th className="text-left p-3 border-b">Data Freshness</th>
                  <th className="text-left p-3 border-b">Server Load</th>
                  <th className="text-left p-3 border-b">Build Time</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">SSG</td>
                  <td className="p-3 text-green-600">⚡ Instant</td>
                  <td className="p-3 text-red-600">❌ Build-time only</td>
                  <td className="p-3 text-green-600">✅ Minimal</td>
                  <td className="p-3 text-red-600">⚠️ Can be long</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">SSR</td>
                  <td className="p-3 text-yellow-600">⚡ Fast</td>
                  <td className="p-3 text-green-600">✅ Always fresh</td>
                  <td className="p-3 text-red-600">❌ High</td>
                  <td className="p-3 text-green-600">✅ Quick</td>
                </tr>
                <tr className="border-b hover:bg-gray-50 bg-purple-25">
                  <td className="p-3 font-medium bg-purple-50">ISR</td>
                  <td className="p-3 text-green-600 bg-purple-50">⚡ Instant</td>
                  <td className="p-3 text-green-600 bg-purple-50">✅ Configurable</td>
                  <td className="p-3 text-green-600 bg-purple-50">✅ Low</td>
                  <td className="p-3 text-green-600 bg-purple-50">✅ Quick</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-3 font-medium">CSR</td>
                  <td className="p-3 text-red-600">❌ Slow</td>
                  <td className="p-3 text-green-600">✅ Real-time</td>
                  <td className="p-3 text-green-600">✅ Minimal</td>
                  <td className="p-3 text-green-600">✅ Quick</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Real-world Use Cases */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">ISR Use Cases & Examples</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3 text-purple-600">Perfect for:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-1.5"></span>
                  <div>
                    <strong>E-commerce product pages</strong><br/>
                    <span className="text-gray-600">Price/inventory updates without rebuilds</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-1.5"></span>
                  <div>
                    <strong>Blog posts with comments</strong><br/>
                    <span className="text-gray-600">Static content with periodic updates</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-1.5"></span>
                  <div>
                    <strong>News articles</strong><br/>
                    <span className="text-gray-600">Breaking news updates without full rebuilds</span>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-orange-600">Configuration Examples:</h4>
              <div className="space-y-3 text-sm">
                <div className="bg-white p-3 rounded border">
                  <strong>High-traffic pages:</strong> <code className="bg-gray-100 px-1 rounded">revalidate: 3600</code><br/>
                  <span className="text-gray-600">1 hour - reduce server load</span>
                </div>
                <div className="bg-white p-3 rounded border">
                  <strong>Dynamic content:</strong> <code className="bg-gray-100 px-1 rounded">revalidate: 60</code><br/>
                  <span className="text-gray-600">1 minute - frequent updates</span>
                </div>
                <div className="bg-white p-3 rounded border">
                  <strong>News/alerts:</strong> <code className="bg-gray-100 px-1 rounded">revalidate: 10</code><br/>
                  <span className="text-gray-600">10 seconds - breaking news</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `
      }} />
    </div>
  );
}

// Force static generation with ISR
export const revalidate = 60; // Revalidate every 60 seconds
