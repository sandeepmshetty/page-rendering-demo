import React from 'react'
import Link from 'next/link'

export default function ComparisonPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">
          ⚖️ Pages Router vs App Router Comparison
        </h1>
        <p className="text-blue-700">
          Understanding the evolution from Pages Router to App Router in Next.js
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">📁 Pages Router (Legacy)</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-purple-700 mb-2">Data Fetching Methods:</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-purple-50 p-3 rounded">
                  <code className="font-mono">getStaticProps</code>
                  <p className="text-gray-600 mt-1">Runs at build time for SSG</p>
                </div>
                <div className="bg-purple-50 p-3 rounded">
                  <code className="font-mono">getServerSideProps</code>
                  <p className="text-gray-600 mt-1">Runs on each request for SSR</p>
                </div>
                <div className="bg-purple-50 p-3 rounded">
                  <code className="font-mono">getStaticPaths</code>
                  <p className="text-gray-600 mt-1">Defines dynamic routes for SSG</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-purple-700 mb-2">File Structure:</h3>
              <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
{`pages/
  index.tsx         → /
  about.tsx         → /about
  blog/
    index.tsx       → /blog
    [slug].tsx      → /blog/[slug]
  api/
    hello.ts        → /api/hello`}
              </pre>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-2xl font-bold text-green-800 mb-4">🆕 App Router (Current)</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-green-700 mb-2">Data Fetching Methods:</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-green-50 p-3 rounded">
                  <code className="font-mono">async components</code>
                  <p className="text-gray-600 mt-1">Direct async/await in components</p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <code className="font-mono">fetch with cache</code>
                  <p className="text-gray-600 mt-1">Built-in caching strategies</p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <code className="font-mono">generateStaticParams</code>
                  <p className="text-gray-600 mt-1">Dynamic route generation</p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <code className="font-mono">server actions</code>
                  <p className="text-gray-600 mt-1">Direct mutations & revalidation</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-green-700 mb-2">File Structure:</h3>
              <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
{`app/
  page.tsx          → /
  about/
    page.tsx        → /about
  blog/
    page.tsx        → /blog
    [slug]/
      page.tsx      → /blog/[slug]
    layout.tsx      → Shared layout
  api/
    hello/
      route.ts      → /api/hello`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">🔄 Migration Examples</h2>
        
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-purple-700 mb-3">Pages Router (Old Way)</h3>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{`// pages/blog.tsx
export const getStaticProps = async () => {
  const posts = await fetch('/api/posts')
  return {
    props: { posts: await posts.json() },
    revalidate: 60
  }
}

export default function Blog({ posts }) {
  return <div>{/* render posts */}</div>
}`}
            </pre>
          </div>
          
          <div>
            <h3 className="font-semibold text-green-700 mb-3">App Router (New Way)</h3>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{`// app/blog/page.tsx
async function getPosts() {
  const res = await fetch('/api/posts', {
    next: { revalidate: 60 }
  })
  return res.json()
}

export default async function Blog() {
  const posts = await getPosts()
  return <div>{/* render posts */}</div>
}`}
            </pre>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">📊 Comparison Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Feature</th>
                <th className="text-left p-3 text-purple-700">Pages Router</th>
                <th className="text-left p-3 text-green-700">App Router</th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              <tr className="border-b">
                <td className="p-3 font-medium">Data Fetching</td>
                <td className="p-3">getStaticProps, getServerSideProps</td>
                <td className="p-3">async/await in components</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Layouts</td>
                <td className="p-3">Custom _app.tsx wrapper</td>
                <td className="p-3">Native layout.tsx files</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Loading States</td>
                <td className="p-3">Manual implementation</td>
                <td className="p-3">Built-in loading.tsx</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Error Handling</td>
                <td className="p-3">Custom _error.tsx</td>
                <td className="p-3">Built-in error.tsx</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Server Components</td>
                <td className="p-3">❌ Not available</td>
                <td className="p-3">✅ Default behavior</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Streaming</td>
                <td className="p-3">❌ Limited support</td>
                <td className="p-3">✅ Component-level (Suspense)</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Data Mutations</td>
                <td className="p-3 text-purple-700">API Routes only</td>
                <td className="p-3 text-green-700">✅ Native Server Actions</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Link 
          href="/pages-ssg" 
          className="block bg-purple-100 border border-purple-200 p-4 rounded-lg hover:bg-purple-200 transition-colors text-center"
        >
          <h3 className="font-semibold text-purple-800 mb-2">Try getStaticProps</h3>
          <p className="text-purple-600 text-sm">Pages Router SSG example</p>
        </Link>
        
        <Link 
          href="/pages-ssr" 
          className="block bg-green-100 border border-green-200 p-4 rounded-lg hover:bg-green-200 transition-colors text-center"
        >
          <h3 className="font-semibold text-green-800 mb-2">Try getServerSideProps</h3>
          <p className="text-green-600 text-sm">Pages Router SSR example</p>
        </Link>
        
        <Link 
          href="/" 
          className="block bg-blue-100 border border-blue-200 p-4 rounded-lg hover:bg-blue-200 transition-colors text-center"
        >
          <h3 className="font-semibold text-blue-800 mb-2">App Router Examples</h3>
          <p className="text-blue-600 text-sm">Modern Next.js approach</p>
        </Link>
      </div>
    </div>
  )
}