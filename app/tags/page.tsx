'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { XCircleIcon, TagIcon, TrashIcon } from '@heroicons/react/24/solid'
import { TagIcon as TagOutlineIcon } from '@heroicons/react/24/outline'
import { fetchWithAuth } from '@/lib/utils/apiUtils'

type Tag = {
  id: number
  name: string
  color: string
  createdAt: string
  updatedAt: string
}

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch all tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true)
        const response = await fetchWithAuth('/api/tags')
        
        if (!response.ok) {
          throw new Error('Failed to fetch tags')
        }
        
        const data = await response.json()
        setTags(data)
      } catch (err) {
        setError('Error loading tags. Please try again.')
        console.error('Error fetching tags:', err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchTags()
  }, [])

  // Handle tag deletion
  const handleDeleteTag = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this tag? It will be removed from all notes.')) {
      try {
        const response = await fetchWithAuth(`/api/tags/${id}`, {
          method: 'DELETE',
        })
        
        if (!response.ok) {
          throw new Error('Failed to delete tag')
        }
        
        setTags(prevTags => prevTags.filter(tag => tag.id !== id))
      } catch (err) {
        setError('Error deleting tag. Please try again.')
        console.error('Error deleting tag:', err)
      }
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="page-title mb-0 pb-0 border-0">
          <span className="flex items-center">
            <TagOutlineIcon className="w-7 h-7 mr-2 text-accent-500" />
            All Tags
          </span>
        </h1>
      </div>
      
      {loading ? (
        <div className="flex flex-col justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-600 mb-4"></div>
          <p className="text-gray-500 animate-pulse">Loading tags...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon 
                className="text-red-400 w-5 h-5" 
                aria-hidden="true" 
              />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      ) : tags.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700">
          <div className="w-20 h-20 mx-auto bg-accent-50 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <TagIcon 
              className="text-accent-400 w-10 h-10" 
              aria-hidden="true" 
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No tags yet</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Tags will appear here when you add them to your notes. Tags help you organize and categorize your notes.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {tags.map(tag => (
            <div
              key={tag.id}
              className="card hover:border-accent-200 transition-all duration-200 flex flex-col p-0 overflow-hidden"
            >
              <div 
                className="h-2 w-full"
                style={{ backgroundColor: tag.color }}
              ></div>
              <div className="flex-1 px-5 py-4">
                <Link 
                  href={`/tags/${tag.id}`}
                  className="group"
                >
                  <div className="flex items-center mb-2">
                    <div
                      className="w-5 h-5 rounded-full mr-2 shadow-sm"
                      style={{ backgroundColor: tag.color }}
                    />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors duration-200">
                      {tag.name}
                    </h3>
                  </div>
                </Link>
                
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <Link 
                    href={`/tags/${tag.id}`}
                    className="text-sm text-gray-600 hover:text-accent-600 transition-colors duration-200"
                  >
                    View notes
                  </Link>
                  
                  <button
                    onClick={() => handleDeleteTag(tag.id)}
                    className="p-1.5 text-gray-500 hover:text-red-600 bg-gray-50 hover:bg-red-50 rounded-md transition-colors duration-200"
                    aria-label="Delete tag"
                  >
                    <TrashIcon 
                      className="w-4 h-4" 
                      aria-hidden="true" 
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
