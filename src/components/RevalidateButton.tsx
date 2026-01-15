'use client'

import React, { useState, useTransition } from 'react'
import { refreshCache } from '@/lib/actions'

interface RevalidateButtonProps {
  path: string
}

export default function RevalidateButton({ path }: RevalidateButtonProps) {
  const [isPending, startTransition] = useTransition()
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleRevalidate = () => {
    setStatus('idle')
    startTransition(async () => {
      const result = await refreshCache(path)
      if (result.success) {
        setStatus('success')
        setTimeout(() => setStatus('idle'), 3000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3000)
      }
    })
  }

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleRevalidate}
        disabled={isPending}
        className={`px-6 py-3 rounded-xl font-bold text-white transition-all transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-wait ${
          status === 'success' ? 'bg-green-500' : 
          status === 'error' ? 'bg-red-500' : 
          'bg-orange-600 hover:bg-orange-700'
        }`}
      >
        {isPending ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Purging Edge Cache...
          </span>
        ) : status === 'success' ? (
          '✅ Cache Refresh Triggered!'
        ) : status === 'error' ? (
          '❌ Refresh Failed'
        ) : (
          '⚡ Purge Cache via Server Action'
        )}
      </button>
      <p className="mt-2 text-xs text-gray-400 italic">
        This uses a Next.js Server Action to call <code className="bg-gray-100 px-1 rounded">revalidatePath()</code>
      </p>
    </div>
  )
}
