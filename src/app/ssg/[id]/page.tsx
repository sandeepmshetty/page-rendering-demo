import React from 'react'

interface Post {
  id: number
  title: string
  body: string
}

export async function generateStaticParams() {
  // Pre-build a handful of pages
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
  const posts: Post[] = await res.json()
  return posts.map(p => ({ id: String(p.id) }))
}

export const dynamic = 'force-static'

async function getPost(id: string): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  if (!res.ok) throw new Error('Failed to fetch post')
  return res.json()
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)
  return (
    <div className="max-w-3xl mx-auto">
      <div className="demo-header bg-purple-50 border-purple-400">
        <h1 className="text-3xl font-bold text-purple-800">SSG Detail: Post #{post.id}</h1>
        <p className="text-purple-700">This page was statically generated at build time.</p>
      </div>
      <article className="bg-white p-6 rounded-lg shadow-md border mt-6">
        <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-700">{post.body}</p>
      </article>
    </div>
  )
}

