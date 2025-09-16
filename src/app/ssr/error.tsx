'use client'

import React, { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="max-w-3xl mx-auto bg-red-50 border border-red-200 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-red-700 mb-2">SSR Error</h2>
      <p className="text-red-600 mb-4">The server failed to render this request.</p>
      <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={() => reset()}>
        Retry
      </button>
    </div>
  )
}

