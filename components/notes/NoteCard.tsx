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
    <article className="card card-primary">
      <header className="card-header">
        <Link href={`/notes/${note.id}`} className="flex-1 group">
          <h3 className="card-title">
            {note.title}
          </h3>
        </Link>
        
        <div className="flex items-center space-x-1 z-10">
          <Link 
            href={`/notes/${note.id}/edit`}
            className="btn-icon btn-icon-edit"
            aria-label="Edit note"
          >
            <PencilIcon className="w-4 h-4" />
          </Link>
          
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="btn-icon btn-icon-delete"
            aria-label="Delete note"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </header>
      
      {note.category && (
        <div className="mt-2">
          <span className="category-badge">
            {note.category}
          </span>
        </div>
      )}
      
      {previewContent ? (
        <div className="card-content">
          {previewContent}
        </div>
      ) : (
        <div className="card-empty">
          <DocumentTextIcon className="w-8 h-8 mr-2 opacity-50" />
          <span className="text-sm">No content</span>
        </div>
      )}
      
      {note.noteTags && note.noteTags.length > 0 && (
        <div className="tag-container">
          {note.noteTags.map(({ tag }) => (
            <Link
              key={tag.id}
              href={`/tags/${tag.id}`}
              style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
              className="tag-badge"
            >
              {tag.name}
            </Link>
          ))}
        </div>
      )}
      
      <footer className="card-footer">
        <ClockIcon className="w-3.5 h-3.5 mr-1" />
        Updated {timeAgo}
      </footer>
    </article>
  )
}
