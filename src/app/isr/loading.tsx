import React from 'react'

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-yellow-800 mb-2">Loading ISR...</h2>
        <p className="text-yellow-700">Serving static content and checking revalidation in background.</p>
      </div>
      <div className="mt-6 grid gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-100 h-20 rounded-lg border" />
        ))}
      </div>
    </div>
  )
}

