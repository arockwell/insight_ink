'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import NoteForm from '@/components/notes/NoteForm'
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
  noteTags: NoteTag[]
}

export default function EditNotePage() {
  const params = useParams<{ id: string }>()
  const [note, setNote] = useState<Note | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true)
        const response = await fetchWithAuth(`/api/notes/${params.id}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch note')
        }
        
        const data = await response.json()
        setNote(data)
      } catch (err) {
        setError('Error loading note. Please try again.')
        console.error('Error fetching note:', err)
      } finally {
        setLoading(false)
      }
    }
    
    if (params.id) {
      fetchNote()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error || !note) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error || 'Note not found'}</p>
          </div>
        </div>
      </div>
    )
  }

  const tags = note.noteTags.map(noteTag => noteTag.tag)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Note</h1>
      <NoteForm
        noteId={note.id}
        initialTitle={note.title}
        initialContent={note.content || ''}
        initialCategory={note.category || ''}
        initialTags={tags}
      />
    </div>
  )
}
