import React from 'react'

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="demo-header bg-purple-50 border-purple-400">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="text-4xl animate-pulse">📄</div>
          </div>
          <div className="ml-4">
            <h1 className="text-3xl font-bold text-purple-800 mb-2">Preparing static content...</h1>
            <p className="text-purple-700">Static HTML and CSS are being assembled.</p>
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