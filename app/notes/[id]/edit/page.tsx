'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { XCircleIcon } from '@heroicons/react/24/solid'
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
            <XCircleIcon 
              className="text-red-400" 
              style={{ width: '20px', height: '20px' }} 
              aria-hidden="true" 
            />
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
