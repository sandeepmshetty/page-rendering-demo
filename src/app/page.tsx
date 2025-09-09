import React from 'react'

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">
        Page Rendering Demo
      </h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            🔄 Client-Side Rendering (CSR)
          </h2>
          <p className="text-gray-600 mb-4">
            JavaScript runs in the browser to build the DOM and render content.
          </p>
          <a 
            href="/csr" 
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            View CSR Demo
          </a>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-2xl font-semibold mb-4 text-green-600">
            🖥️ Server-Side Rendering (SSR)
          </h2>
          <p className="text-gray-600 mb-4">
            HTML is generated on the server for each request.
          </p>
          <a 
            href="/ssr" 
            className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            View SSR Demo
          </a>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">
            📄 Static Site Generation (SSG)
          </h2>
          <p className="text-gray-600 mb-4">
            HTML pages are pre-built at build time.
          </p>
          <a 
            href="/ssg" 
            className="inline-block bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
          >
            View SSG Demo
          </a>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-2xl font-semibold mb-4 text-orange-600">
            ⚡ Incremental Static Regeneration (ISR)
          </h2>
          <p className="text-gray-600 mb-4">
            Static pages are regenerated on-demand with caching.
          </p>
          <a 
            href="/isr" 
            className="inline-block bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
          >
            View ISR Demo
          </a>
        </div>
      </div>

      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">About This Demo</h2>
        <p className="text-gray-600">
          This demo showcases different page rendering strategies in Next.js. 
          Each approach has its own performance characteristics and use cases. 
          Navigate through the examples to see how each rendering method works 
          and when to use them.
        </p>
      </div>
    </div>
  )
}
