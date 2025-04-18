'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { XCircleIcon, DocumentIcon, PlusIcon } from '@heroicons/react/24/solid'
import { DocumentTextIcon } from '@heroicons/react/24/outline'
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

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch all notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true)
        const response = await fetchWithAuth('/api/notes')
        
        if (!response.ok) {
          throw new Error('Failed to fetch notes')
        }
        
        const data = await response.json()
        setNotes(data)
      } catch (err) {
        setError('Error loading notes. Please try again.')
        console.error('Error fetching notes:', err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchNotes()
  }, [])

  // Handle note deletion
  const handleDeleteNote = (id: number) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="page-title mb-0 pb-0 border-0">
          <span className="flex items-center">
            <DocumentTextIcon className="w-7 h-7 mr-2 text-primary-500" />
            All Notes
          </span>
        </h1>
        <Link
          href="/notes/new"
          className="btn btn-primary flex items-center"
        >
          <PlusIcon className="w-5 h-5 mr-1" />
          New Note
        </Link>
      </div>
      
      {loading ? (
        <div className="flex flex-col justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-500 animate-pulse">Loading notes...</p>
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
      ) : notes.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700">
          <div className="w-20 h-20 mx-auto bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <DocumentIcon 
              className="text-gray-400 w-10 h-10" 
              aria-hidden="true" 
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No notes yet</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
            Create your first note to get started with organizing your thoughts and ideas.
          </p>
          <Link 
            href="/notes/new" 
            className="btn btn-primary inline-flex items-center"
          >
            <PlusIcon className="w-5 h-5 mr-1" />
            Create a new note
          </Link>
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
  )
}
