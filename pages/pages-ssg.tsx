import React from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'

interface Post {
  id: number
  title: string
  body: string
}

interface Props {
  posts: Post[]
  buildTime: string
}

// This is getStaticProps - runs at BUILD TIME
export const getStaticProps: GetStaticProps<Props> = async () => {
  console.log('🏗️ getStaticProps running at BUILD TIME')
  
  try {
    // This fetch happens during build
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`)
    }
    
    const posts: Post[] = await response.json()
    
    return {
      props: {
        posts,
        buildTime: new Date().toISOString(),
      },
    }
  } catch (error) {
    console.error('❌ Error in getStaticProps:', error)
    
    // Fallback data in case of fetch failure
    return {
      props: {
        posts: [
          { id: 1, title: 'Fallback: Offline Title', body: 'This is fallback content because the API call failed.' },
          { id: 2, title: 'Fallback: Check Connection', body: 'The server could not reach the external API.' },
        ],
        buildTime: new Date().toISOString(),
      },
    }
  }
}

export default function PagesSsgDemo({ posts, buildTime }: Props) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">
          📄 Pages Router: getStaticProps
        </h1>
        <p className="text-purple-700">
          This page uses <code className="bg-purple-100 px-2 py-1 rounded">getStaticProps</code> 
          {' '}from the Pages Router (pages/ directory)
        </p>
        <div className="mt-4 text-sm text-purple-600">
          <strong>Built at:</strong>{' '}
          <span suppressHydrationWarning>
            {new Date(buildTime).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">How getStaticProps Works:</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-medium text-green-700 mb-2">✅ When it runs:</h3>
            <ul className="space-y-1">
              <li>• During build process</li>
              <li>• Never in browser</li>
              <li>• Server-side only</li>
              <li>• Can access file system</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-blue-700 mb-2">🎯 Best for:</h3>
            <ul className="space-y-1">
              <li>• Static content</li>
              <li>• Blog posts</li>
              <li>• Product catalogs</li>
              <li>• Content that rarely changes</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Posts (fetched at build time):</h2>
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