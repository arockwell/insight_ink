'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { XCircleIcon, DocumentIcon } from '@heroicons/react/24/solid'
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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">All Notes</h1>
        <Link
          href="/notes/new"
          className="btn btn-primary"
        >
          New Note
        </Link>
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
      ) : notes.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
          <DocumentIcon 
            className="mx-auto text-gray-400" 
            style={{ width: '48px', height: '48px' }} 
            aria-hidden="true" 
          />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No notes yet</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Create your first note to get started.</p>
          <div className="mt-6">
            <Link href="/notes/new" className="btn btn-primary">
              Create a new note
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
