import React from 'react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'

interface Post {
  id: number
  title: string
  body: string
}

interface Props {
  posts: Post[]
  requestTime: string
  userAgent: string
  ip: string
}

// This is getServerSideProps - runs on EVERY REQUEST
export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
  console.log('🖥️ getServerSideProps running on REQUEST', new Date().toISOString())
  
  try {
    // This fetch happens on every request
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`)
    }
    
    const posts: Post[] = await response.json()
    
    return {
      props: {
        posts,
        requestTime: new Date().toISOString(),
        userAgent: req.headers['user-agent'] || 'Unknown',
        ip: req.headers['x-forwarded-for'] as string || 'localhost',
      },
    }
  } catch (error) {
    console.error('❌ Error in getServerSideProps:', error)
    
    return {
      props: {
        posts: [
          { id: 1, title: 'Fallback: SSR Offline', body: 'This is fallback content for the SSR demo.' },
        ],
        requestTime: new Date().toISOString(),
        userAgent: req.headers['user-agent'] || 'Unknown',
        ip: req.headers['x-forwarded-for'] as string || 'localhost',
      },
    }
  }
}

export default function PagesssrDemo({ posts, requestTime, userAgent, ip }: Props) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-green-800 mb-2">
          🖥️ Pages Router: getServerSideProps
        </h1>
        <p className="text-green-700">
          This page uses <code className="bg-green-100 px-2 py-1 rounded">getServerSideProps</code> 
          {' '}from the Pages Router (pages/ directory)
        </p>
        <div className="mt-4 text-sm text-green-600 space-y-1">
          <div><strong>Request Time:</strong> <span suppressHydrationWarning>{new Date(requestTime).toLocaleString()}</span></div>
          <div><strong>Your IP:</strong> {ip}</div>
          <div><strong>User Agent:</strong> {userAgent.substring(0, 60)}...</div>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">How getServerSideProps Works:</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-medium text-green-700 mb-2">✅ When it runs:</h3>
            <ul className="space-y-1">
              <li>• On every request</li>
              <li>• Server-side only</li>
              <li>• Has access to request object</li>
              <li>• Can read cookies, headers</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-blue-700 mb-2">🎯 Best for:</h3>
            <ul className="space-y-1">
              <li>• User-specific content</li>
              <li>• Authentication required</li>
              <li>• Real-time data</li>
              <li>• Request-dependent content</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Posts (fetched on each request):</h2>
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="font-medium text-lg mb-2">{post.title}</h3>
            <p className="text-gray-600 text-sm">{post.body}</p>
            <div className="mt-2 text-xs text-gray-500">Post ID: {post.id}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to App Router demos
        </Link>
      </div>
    </div>
  )
}