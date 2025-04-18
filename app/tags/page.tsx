'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { XCircleIcon, TagIcon, TrashIcon } from '@heroicons/react/24/solid'
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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">All Tags</h1>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon 
                className="text-red-400" 
                style={{ width: '20px', height: '20px' }} 
                aria-hidden="true" 
              />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      ) : tags.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
          <TagIcon 
            className="mx-auto text-gray-400" 
            style={{ width: '48px', height: '48px' }} 
            aria-hidden="true" 
          />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No tags yet</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Tags will appear here when you add them to your notes.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {tags.map(tag => (
            <div
              key={tag.id}
              className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden flex flex-col"
            >
              <div className="flex-1 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <Link 
                  href={`/tags/${tag.id}`}
                  className="flex items-center"
                >
                  <div
                    className="w-4 h-4 rounded-full mr-2"
                    style={{ backgroundColor: tag.color }}
                  />
                  <h3 className="text-base font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400">
                    {tag.name}
                  </h3>
                </Link>
              </div>
              <div className="px-4 py-2 flex justify-end">
                <button
                  onClick={() => handleDeleteTag(tag.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <TrashIcon 
                    style={{ width: '20px', height: '20px' }} 
                    aria-hidden="true" 
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
