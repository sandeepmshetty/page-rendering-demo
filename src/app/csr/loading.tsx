import React from 'react'

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="demo-header bg-blue-50 border-blue-400">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="text-4xl animate-pulse">⏳</div>
          </div>
          <div className="ml-4">
            <h1 className="text-3xl font-bold text-blue-800 mb-2">Loading CSR...</h1>
            <p className="text-blue-600">Client-side data and styles are being prepared.</p>
          </div>
        </div>
      </div>
      <div className="mt-6 grid gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-100 h-20 rounded-lg border" />
        ))}
      </div>
    </div>
  )
}
