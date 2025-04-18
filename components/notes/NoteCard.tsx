'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
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

interface NoteCardProps {
  note: Note
  // eslint-disable-next-line no-unused-vars
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
        await fetchWithAuth(`/api/notes/${note.id}`, {
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
    <div className="card hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <Link href={`/notes/${note.id}`} className="flex-1">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400">
            {note.title}
          </h3>
        </Link>
        
        <div className="flex items-center space-x-2">
          <Link 
            href={`/notes/${note.id}/edit`}
            className="p-1 text-gray-500 hover:text-primary-600"
          >
            <span className="sr-only">Edit</span>
            <PencilIcon 
              style={{ width: '20px', height: '20px' }} 
              aria-hidden="true" 
            />
          </Link>
          
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-1 text-gray-500 hover:text-red-600"
          >
            <span className="sr-only">Delete</span>
            <TrashIcon 
              style={{ width: '20px', height: '20px' }} 
              aria-hidden="true" 
            />
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
