'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

/**
 * Server Action to revalidate a specific path.
 * This will purge the Data Cache and trigger a background regeneration
 * for the specified route on the next request.
 */
export async function refreshCache(path: string) {
  try {
    console.log(`🚀 Triggering revalidation for: ${path}`)
    
    // Purge the cache for this specific path
    revalidatePath(path)
    
    // Optionally revalidate by tag if we had used tags (e.g., fetch(url, { next: { tags: ['posts'] } }))
    // revalidateTag('posts')
    
    return { success: true, message: `Cache purged for ${path}` }
  } catch (error) {
    console.error('❌ Revalidation failed:', error)
    return { success: false, message: 'Failed to refresh cache' }
  }
}
