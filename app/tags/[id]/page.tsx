'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { XCircleIcon, ArrowLeftIcon, DocumentIcon } from '@heroicons/react/24/solid'
import NoteCard from '@/components/notes/NoteCard'
import { fetchWithAuth } from '@/lib/utils/apiUtils'

type Tag = {
  id: number
  name: string
  color: string
}

type NoteTag = {
  tag: Tag
}

type Note = {
  id: number
  title: string
  content: string | null
  category: string | null
  createdAt: string
  updatedAt: string
  noteTags: NoteTag[]
}

export default function TagDetailPage() {
  const params = useParams<{ id: string }>()
  const [tag, setTag] = useState<Tag | null>(null)
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch tag
        const tagResponse = await fetchWithAuth(`/api/tags/${params.id}`)
        if (!tagResponse.ok) {
          throw new Error('Failed to fetch tag')
        }
        const tagData = await tagResponse.json()
        setTag(tagData)
        
        // Fetch notes with this tag
        const notesResponse = await fetchWithAuth(`/api/tags/${params.id}/notes`)
        if (!notesResponse.ok) {
          throw new Error('Failed to fetch notes')
        }
        const notesData = await notesResponse.json()
        setNotes(notesData)
      } catch (err) {
        setError('Error loading data. Please try again.')
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }
    
    if (params.id) {
      fetchData()
    }
  }, [params.id])

  // Handle note deletion
  const handleDeleteNote = (id: number) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id))
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error || !tag) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon 
              className="text-red-400" 
              style={{ width: '20px', height: '20px' }} 
              aria-hidden="true" 
            />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error || 'Tag not found'}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <Link 
            href="/tags" 
            className="text-primary-600 hover:text-primary-800 flex items-center mb-2"
          >
            <ArrowLeftIcon 
              className="mr-1" 
              style={{ width: '20px', height: '20px' }} 
              aria-hidden="true" 
            />
            Back to Tags
          </Link>
          <div className="flex items-center">
            <div
              className="w-6 h-6 rounded-full mr-2"
              style={{ backgroundColor: tag.color }}
            />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {tag.name}
            </h1>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Notes with this tag
        </h2>
        
        {notes.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
            <DocumentIcon 
              className="mx-auto text-gray-400" 
              style={{ width: '48px', height: '48px' }} 
              aria-hidden="true" 
            />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No notes with this tag</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Create a new note and add this tag to it.
            </p>
            <div className="mt-6">
              <Link href="/notes/new" className="btn btn-primary">
                Create a new note
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {notes.map(note => (
              <NoteCard 
                key={note.id} 
                note={note} 
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
