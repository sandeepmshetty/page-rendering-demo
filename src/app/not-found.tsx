import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <div className="text-6xl mb-4">🧭</div>
      <h1 className="text-3xl font-bold mb-2">Page not found</h1>
      <p className="text-gray-600 mb-6">The page you’re looking for doesn’t exist.</p>
      <Link href="/" className="bg-gray-900 text-white px-4 py-2 rounded">
        Go home
      </Link>
    </div>
  )
}

