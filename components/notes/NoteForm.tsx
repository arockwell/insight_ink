'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { XCircleIcon } from '@heroicons/react/24/solid'
import { fetchWithAuth } from '@/lib/utils/apiUtils'

type Tag = {
  id: number
  name: string
  color: string
}

interface NoteFormProps {
  noteId?: number
  initialTitle?: string
  initialContent?: string
  initialCategory?: string
  initialTags?: Tag[]
}

export default function NoteForm({
  noteId,
  initialTitle = '',
  initialContent = '',
  initialCategory = '',
  initialTags = []
}: NoteFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
  const [category, setCategory] = useState(initialCategory)
  const [tagList, setTagList] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  // Initialize tags if present
  useEffect(() => {
    if (initialTags && initialTags.length > 0) {
      setTagList(initialTags.map(tag => tag.name).join(', '))
    }
  }, [initialTags])

  // Debounced auto-save
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!content && !title) return;

      setSaveStatus('saving');
      const saveNote = async () => {
        try {
          const url = noteId 
            ? `/api/notes/${noteId}` 
            : '/api/notes';
          
          const method = noteId ? 'PUT' : 'POST';
          
          const response = await fetchWithAuth(url, {
            method,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: title || 'Untitled Note',
              content,
              category: category || undefined,
              tagList,
            }),
          });
          
          if (!response.ok) {
            throw new Error('Failed to save note');
          }
          
          const savedNote = await response.json();
          
          // If we're creating a new note, redirect to edit page
          if (!noteId && savedNote.id) {
            router.push(`/notes/${savedNote.id}/edit`);
          }
          
          setSaveStatus('saved');
          
          // Reset status after 2 seconds
          setTimeout(() => {
            setSaveStatus('idle');
          }, 2000);
        } catch (err) {
          console.error('Error saving note:', err);
          setSaveStatus('error');
          setError('Failed to save note. Please try again.');
          
          // Reset status after 2 seconds
          setTimeout(() => {
            setSaveStatus('idle');
          }, 2000);
        }
      };
      
      saveNote();
    }, 2000);
    
    return () => clearTimeout(timeoutId);
  }, [title, content, category, tagList, noteId, router])

  // Handle content change
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  // Handle title change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setIsSaving(true)
    setSaveStatus('saving')
    setError(null)
    
    try {
      const url = noteId 
        ? `/api/notes/${noteId}` 
        : '/api/notes'
      
      const method = noteId ? 'PUT' : 'POST'
      
      const response = await fetchWithAuth(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title || 'Untitled Note',
          content,
          category: category || undefined,
          tagList,
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to save note')
      }
      
      setSaveStatus('saved')
      router.push('/notes')
    } catch (err) {
      console.error('Error saving note:', err)
      setSaveStatus('error')
      setError('Failed to save note. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-group">
      {error && (
        <div className="form-error">
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
      )}

      <div>
        <label htmlFor="title" className="label">
          Title
        </label>
        <input
          type="text"
          id="title"
          className="input"
          placeholder="Title (optional - will be generated from content)"
          value={title}
          onChange={handleTitleChange}
        />
      </div>

      <div>
        <label htmlFor="category" className="label">
          Category
        </label>
        <select
          id="category"
          className="input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Study">Study</option>
          <option value="Ideas">Ideas</option>
          <option value="Projects">Projects</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="tags" className="label">
          Tags
        </label>
        <input
          type="text"
          id="tags"
          className="input"
          placeholder="Comma-separated tags (e.g., important, todo, reference)"
          value={tagList}
          onChange={(e) => setTagList(e.target.value)}
        />
        <p className="form-hint">
          Enter tags separated by commas (e.g., important, todo, reference)
        </p>
      </div>

      <div>
        <label htmlFor="content" className="label">
          Content
        </label>
        <div className="relative">
          <textarea
            id="content"
            rows={15}
            className="input font-mono text-sm"
            placeholder="# Markdown supported

Write your notes using **markdown** formatting..."
            value={content}
            onChange={handleContentChange}
          />
          <div 
            className={`absolute bottom-2 right-2 text-xs text-gray-500 italic ${saveStatus === 'idle' ? 'invisible' : 'visible'}`}
          >
            {saveStatus === 'saving' ? 'Auto-saving...' : 
             saveStatus === 'saved' ? 'Changes saved' : 
             'Error saving changes'}
          </div>
        </div>
        <p className="form-hint">Supports Markdown formatting</p>
      </div>

      <div className="form-actions">
        <button
          type="button"
          onClick={() => router.push('/notes')}
          className="btn btn-secondary"
        >
          Cancel
        </button>
        
        <button
          type="submit"
          disabled={isSaving}
          className="btn btn-primary"
        >
          {isSaving ? 'Saving...' : noteId ? 'Update Note' : 'Create Note'}
        </button>
      </div>
    </form>
  )
}
