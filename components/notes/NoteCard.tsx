'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PencilIcon, TrashIcon, ClockIcon } from '@heroicons/react/24/solid'
import { DocumentTextIcon } from '@heroicons/react/24/outline'
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
    <div className="card group relative overflow-hidden border-l-4 border-l-primary-500">
      <div className="absolute top-0 right-0 h-16 w-16">
        <div className="absolute transform rotate-45 bg-gradient-to-r from-primary-100 to-primary-200 text-primary-600 shadow-sm py-1 right-[-35px] top-[32px] w-[170px]"></div>
      </div>
      
      <div className="flex justify-between items-start">
        <Link href={`/notes/${note.id}`} className="flex-1 group">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
            {note.title}
          </h3>
        </Link>
        
        <div className="flex items-center space-x-1 z-10">
          <Link 
            href={`/notes/${note.id}/edit`}
            className="p-1.5 text-gray-500 hover:text-primary-600 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors duration-200"
          >
            <span className="sr-only">Edit</span>
            <PencilIcon 
              className="w-4 h-4"
              aria-hidden="true" 
            />
          </Link>
          
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-1.5 text-gray-500 hover:text-red-600 bg-gray-50 hover:bg-red-50 rounded-md transition-colors duration-200"
          >
            <span className="sr-only">Delete</span>
            <TrashIcon 
              className="w-4 h-4"
              aria-hidden="true" 
            />
          </button>
        </div>
      </div>
      
      {note.category && (
        <div className="mt-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-200">
            {note.category}
          </span>
        </div>
      )}
      
      <div className="mt-3">
        {previewContent ? (
          <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed">
            {previewContent}
          </p>
        ) : (
          <div className="flex items-center justify-center py-6 text-gray-400">
            <DocumentTextIcon className="w-8 h-8 mr-2 opacity-50" />
            <span className="text-sm">No content</span>
          </div>
        )}
      </div>
      
      {note.noteTags && note.noteTags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {note.noteTags.map(({ tag }) => (
            <Link
              key={tag.id}
              href={`/tags/${tag.id}`}
              style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
              className="tag-badge hover:shadow-sm"
            >
              {tag.name}
            </Link>
          ))}
        </div>
      )}
      
      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center text-xs text-gray-500 dark:text-gray-400">
        <ClockIcon className="w-3.5 h-3.5 mr-1" />
        Updated {timeAgo}
      </div>
    </div>
  )
}
