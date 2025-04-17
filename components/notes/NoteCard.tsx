'use client'

import { useState } from 'react'
import Link from 'next/link'
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

interface NoteCardProps {
  note: Note
  onDelete?: (id: number) => void
}

export default function NoteCard({ note, onDelete }: NoteCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  
  // Format the updated date
  const updatedAt = new Date(note.updatedAt)
  const timeAgo = formatDistanceToNow(updatedAt)
  
  // Get a preview of the content
  const previewContent = note.content 
    ? note.content.substring(0, 150) + (note.content.length > 150 ? '...' : '')
    : ''
  
  // Handle delete button click
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setIsDeleting(true)
      try {
        await fetch(`/api/notes/${note.id}`, {
          method: 'DELETE',
        })
        
        if (onDelete) {
          onDelete(note.id)
        }
      } catch (error) {
        console.error('Error deleting note:', error)
        setIsDeleting(false)
      }
    }
  }
  
  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <Link href={`/notes/${note.id}`} className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400">
            {note.title}
          </h3>
        </Link>
        
        <div className="flex items-center space-x-2">
          <Link 
            href={`/notes/${note.id}/edit`}
            className="p-1 text-gray-500 hover:text-primary-600"
          >
            <span className="sr-only">Edit</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </Link>
          
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-1 text-gray-500 hover:text-red-600"
          >
            <span className="sr-only">Delete</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      {note.category && (
        <div className="mt-1">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
            {note.category}
          </span>
        </div>
      )}
      
      <div className="mt-2">
        <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">
          {previewContent}
        </p>
      </div>
      
      {note.noteTags && note.noteTags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1">
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
      
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        Updated {timeAgo}
      </div>
    </div>
  )
}