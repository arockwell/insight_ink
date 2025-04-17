import NoteForm from '@/components/notes/NoteForm'

export default function NewNotePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create New Note</h1>
      <NoteForm />
    </div>
  )
}