'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()
  
  const links = [
    { href: '/', label: 'Home' },
    { href: '/csr', label: 'CSR' },
    { href: '/ssr', label: 'SSR' },
    { href: '/ssg', label: 'SSG' },
    { href: '/isr', label: 'ISR' },
  ]

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 shadow-lg border-b border-gray-700">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:text-blue-300 transition-colors flex items-center">
          <span className="text-2xl mr-2">🔄</span>
          Page Rendering Demo
        </Link>
        <div className="flex space-x-2">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`nav-link ${
                pathname === href
                  ? 'nav-link-active'
                  : 'nav-link-inactive'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
