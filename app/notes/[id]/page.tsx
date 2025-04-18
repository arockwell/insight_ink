'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { 
  XCircleIcon, 
  ArrowLeftIcon, 
  PencilIcon, 
  TrashIcon 
} from '@heroicons/react/24/solid'
import { formatDistanceToNow } from '@/lib/utils/dateUtils'
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

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setIsDeleting(true)
      try {
        const response = await fetchWithAuth(`/api/notes/${params.id}`, {
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
            <ArrowLeftIcon 
              className="mr-1" 
              style={{ width: '20px', height: '20px' }} 
              aria-hidden="true" 
            />
            Back to Notes
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{note.title}</h1>
        </div>
        
        <div className="flex space-x-3">
          <Link
            href={`/notes/${note.id}/edit`}
            className="btn btn-secondary flex items-center"
          >
            <PencilIcon 
              className="mr-1" 
              style={{ width: '20px', height: '20px' }} 
              aria-hidden="true" 
            />
            Edit
          </Link>
          
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="btn bg-red-600 text-white hover:bg-red-700 flex items-center"
          >
            <TrashIcon 
              className="mr-1" 
              style={{ width: '20px', height: '20px' }} 
              aria-hidden="true" 
            />
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
