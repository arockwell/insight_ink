'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { formatDistanceToNow } from '@/lib/utils/dateUtils'

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

export default function NoteDetailPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [note, setNote] = useState<Note | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/notes/${params.id}`)
        
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

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setIsDeleting(true)
      try {
        const response = await fetch(`/api/notes/${params.id}`, {
          method: 'DELETE',
        })
        
        if (!response.ok) {
          throw new Error('Failed to delete note')
        }
        
        router.push('/notes')
      } catch (err) {
        setError('Error deleting note. Please try again.')
        console.error('Error deleting note:', err)
        setIsDeleting(false)
      }
    }
  }

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

  // Format the updated date
  const updatedAt = new Date(note.updatedAt)
  const timeAgo = formatDistanceToNow(updatedAt)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <Link 
            href="/notes" 
            className="text-primary-600 hover:text-primary-800 flex items-center mb-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Notes
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{note.title}</h1>
        </div>
        
        <div className="flex space-x-3">
          <Link
            href={`/notes/${note.id}/edit`}
            className="btn btn-secondary flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit
          </Link>
          
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="btn bg-red-600 text-white hover:bg-red-700 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
            {note.category && (
              <div className="flex items-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                  {note.category}
                </span>
              </div>
            )}
            
            <div>
              Updated {timeAgo}
            </div>
          </div>
          
          {note.noteTags && note.noteTags.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-1">
              {note.noteTags.map(({ tag }) => (
                <Link
                  key={tag.id}
                  href={`/tags/${tag.id}`}
                  style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium hover:opacity-80"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          )}
          
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown>
              {note.content || ''}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}