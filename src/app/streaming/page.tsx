import React, { Suspense } from 'react'
import { getUserMetrics, getPosts } from '@/lib/data'
import { CardSkeleton, PostSkeleton } from '@/components/Skeleton'

// Separate Server Components for individual streaming parts

async function MetricsSection() {
  const metrics = await getUserMetrics() // 1.5s delay
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {metrics.map((metric) => (
        <div key={metric.label} className="bg-white p-6 rounded-xl border border-blue-50 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-sm font-medium text-gray-500 mb-1">{metric.label}</p>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
              metric.trend === 'up' ? 'bg-green-100 text-green-700' : 
              metric.trend === 'down' ? 'bg-red-100 text-red-700' : 
              'bg-gray-100 text-gray-700'
            }`}>
              {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '•'}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

async function PostsSection() {
  // Simulate an even slower data fetch (2.5s)
  await new Promise(resolve => setTimeout(resolve, 2500))
  const posts = await getPosts(3)
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-800">Recent Activity Feed</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {posts.map((post) => (
          <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors">
            <h4 className="font-semibold text-gray-900 mb-2">{post.title}</h4>
            <p className="text-sm text-gray-600 line-clamp-2">{post.body}</p>
            <div className="mt-4 flex items-center text-xs text-gray-400">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                Statically composed, dynamically streamed
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function StreamingPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
              Advanced Streaming Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Demonstrating <span className="text-blue-600 font-semibold italic">Component-Level Streaming</span> using Next.js Suspense.
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-blue-200 animate-pulse">
              LIVE STREAMING ENABLED
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-6 rounded-2xl">
          <h2 className="text-sm font-bold text-blue-800 uppercase tracking-widest mb-3">How it works</h2>
          <p className="text-blue-900 leading-relaxed max-w-3xl">
            This page is a <strong>Server Component</strong>. Notice how the header loads instantly, while the metrics and feed 
            pop in independently as their data becomes available. This prevents a slow API call from blocking the entire page render.
          </p>
        </div>
      </header>

      <section className="mb-12">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-800">System Metrics</h2>
          <span className="text-xs font-medium text-gray-400 ml-2">(Loads in ~1.5s)</span>
        </div>
        
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <CardSkeleton /> <CardSkeleton /> <CardSkeleton /> <CardSkeleton />
          </div>
        }>
          <MetricsSection />
        </Suspense>
      </section>

      <section>
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-2 h-8 bg-indigo-600 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-800">Activity Stream</h2>
          <span className="text-xs font-medium text-gray-400 ml-2">(Loads in ~2.5s)</span>
        </div>

        <Suspense fallback={
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-2">
            <PostSkeleton /> <PostSkeleton /> <PostSkeleton />
          </div>
        }>
          <PostsSection />
        </Suspense>
      </section>

      <footer className="mt-16 pt-8 border-t border-gray-100 text-center text-gray-400 text-sm">
        <p>Built with Next.js App Router • React Server Components • Suspense</p>
      </footer>
    </div>
  )
}
