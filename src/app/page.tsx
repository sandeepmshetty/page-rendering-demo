import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section - Improved separation */}
      <section className="relative overflow-hidden bg-white pt-24 pb-20">
        {/* Animated Background Element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-gradient-to-br from-blue-300 via-indigo-200 to-purple-300 blur-[140px] rounded-full animate-pulse-slow"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold mb-8 border border-blue-100 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-ping"></span>
              Next.js 14.2+ Performance Lab
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-8 leading-[1.1]">
              Mastering <span className="gradient-text">Next.js Rendering</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-12 max-w-2xl mx-auto">
              A comprehensive technical laboratory exploring the speed, trade-offs, and implementation patterns of modern web rendering.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <Link 
                href="/comparison" 
                className="px-10 py-5 bg-gray-900 text-white rounded-2xl font-bold shadow-2xl hover:bg-gray-800 transition-all transform hover:-translate-y-1 text-lg"
              >
                View Comparison Matrix
              </Link>
              <Link 
                href="/streaming" 
                className="px-10 py-5 bg-white text-blue-600 border-2 border-blue-600 rounded-2xl font-bold hover:bg-blue-50 transition-all transform hover:-translate-y-1 text-lg shadow-lg shadow-blue-50"
              >
                Try Live Streaming
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Added clear spacing instead of overlap */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* CSR Card */}
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100/50 hover:shadow-2xl transition-all group flex flex-col">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:rotate-6 shadow-sm">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Client-Side Rendering (CSR)</h2>
            <p className="text-gray-600 leading-relaxed mb-8 flex-grow">
              Highly dynamic interactivity executed entirely in the browser. Ideal for user-specific dashboards and complex single-page applications.
            </p>
            <Link href="/csr" className="text-blue-600 font-bold flex items-center hover:translate-x-2 transition-transform">
              Experience CSR Demo <span className="ml-2">→</span>
            </Link>
          </div>

          {/* SSR Card */}
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100/50 hover:shadow-2xl transition-all group flex flex-col">
            <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-green-600 group-hover:text-white transition-all transform group-hover:rotate-6 shadow-sm">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Server-Side Rendering (SSR)</h2>
            <p className="text-gray-600 leading-relaxed mb-8 flex-grow">
              Full HTML generation on the server for every request. Ensures fresh content and optimal SEO for real-time dynamic pages.
            </p>
            <Link href="/ssr" className="text-green-600 font-bold flex items-center hover:translate-x-2 transition-transform">
              Explore SSR Shell <span className="ml-2">→</span>
            </Link>
          </div>

          {/* SSG Card */}
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100/50 hover:shadow-2xl transition-all group flex flex-col">
            <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-purple-600 group-hover:text-white transition-all transform group-hover:rotate-6 shadow-sm">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Static Site Generation (SSG)</h2>
            <p className="text-gray-600 leading-relaxed mb-8 flex-grow">
              Lightning-fast loading with pre-built static HTML. Perfect for performance-focused marketing pages and documentation.
            </p>
            <Link href="/ssg" className="text-purple-600 font-bold flex items-center hover:translate-x-2 transition-transform">
              Check Build Artifacts <span className="ml-2">→</span>
            </Link>
          </div>

          {/* ISR Card */}
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-orange-100 bg-orange-50/5 hover:shadow-2xl transition-all group flex flex-col">
            <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-orange-600 group-hover:text-white transition-all transform group-hover:rotate-6 shadow-sm">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">On-Demand ISR</h2>
            <p className="text-gray-600 leading-relaxed mb-8 flex-grow">
              Static speed with request-time freshness. Features <span className="font-semibold text-orange-700 underline decoration-orange-200">Server Actions</span> for instant cache purging.
            </p>
            <Link href="/isr" className="text-orange-600 font-bold flex items-center hover:translate-x-2 transition-transform">
              Manage Edge Cache <span className="ml-2">→</span>
            </Link>
          </div>

          {/* Streaming Card */}
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-blue-200 ring-8 ring-blue-50/50 hover:shadow-2xl transition-all group flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3">
              <span className="bg-blue-600 text-white text-[10px] font-black tracking-widest px-3 py-1 rounded-bl-xl uppercase">Advanced</span>
            </div>
            <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-blue-200 shadow-lg transform group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.628.288a2 2 0 01-1.185.208l-2.338-.326a2 2 0 00-1.177.19l-.951.531a2 2 0 01-1.847.108l-2.408-1.107c-.607-.278-1.282.117-1.353.78l-.295 2.757c-.04.374.214.72.586.772l5.964.847a2 2 0 001.191-.19l.545-.305a2 2 0 011.826-.109l2.692 1.154a2 2 0 001.825-.11l1.022-.547a2 2 0 001.022-1.742V15.428z" /></svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Adaptive Streaming</h2>
            <p className="text-gray-600 leading-relaxed mb-8 flex-grow">
              Modern component-level hydration using <span className="font-semibold text-blue-700 underline decoration-blue-100">React Suspense</span> and progressive HTML delivery.
            </p>
            <Link href="/streaming" className="text-blue-700 font-bold flex items-center hover:translate-x-2 transition-transform">
              View Streaming Feed <span className="ml-2">→</span>
            </Link>
          </div>

          {/* Edge Card */}
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100/50 hover:shadow-2xl transition-all group flex flex-col">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all transform group-hover:rotate-6 shadow-sm">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9-3-9m-9 9a9 9 0 019-9" /></svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Edge Runtime</h2>
            <p className="text-gray-600 leading-relaxed mb-8 flex-grow">
              Distributed SSR executed close to your users globally. Minimal latency with maximum reach.
            </p>
            <Link href="/edge" className="text-indigo-600 font-bold flex items-center hover:translate-x-2 transition-transform">
              Test Edge Latency <span className="ml-2">→</span>
            </Link>
          </div>
        </div>

        {/* Legacy Support Section - With better separation */}
        <div className="mt-32 pt-20 border-t border-gray-200">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Full Interoperability</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Mastering the transition from <span className="font-bold px-3 py-1 bg-yellow-100 text-yellow-800 rounded-lg">Pages Router</span> to the modern App Router architecture.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Link href="/pages-ssg" className="group block p-10 bg-white border border-gray-100 rounded-3xl shadow-sm hover:border-purple-200 hover:shadow-xl transition-all text-center">
              <span className="text-xs font-black tracking-[0.2em] text-purple-600 block mb-3 uppercase">Legacy Pattern</span>
              <h3 className="text-2xl font-bold text-gray-900">getStaticProps</h3>
              <p className="text-gray-500 mt-4 leading-relaxed group-hover:text-purple-700">Explore the original build-time data fetching method used in Pages Router.</p>
            </Link>
            <Link href="/pages-ssr" className="group block p-10 bg-white border border-gray-100 rounded-3xl shadow-sm hover:border-green-200 hover:shadow-xl transition-all text-center">
              <span className="text-xs font-black tracking-[0.2em] text-green-600 block mb-3 uppercase">Legacy Pattern</span>
              <h3 className="text-2xl font-bold text-gray-900">getServerSideProps</h3>
              <p className="text-gray-500 mt-4 leading-relaxed group-hover:text-green-700">Deep dive into request-time data fetching logic from older Next.js versions.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


