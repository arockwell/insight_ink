export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-4xl font-bold mb-4">Welcome to Insight Ink</h1>
      <p className="text-xl mb-8">An AI-powered note-taking application</p>
      <div className="flex gap-4">
        <a 
          href="/notes" 
          className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition"
        >
          Browse Notes
        </a>
        <a 
          href="/notes/new" 
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Create Note
        </a>
      </div>
    </div>
  )
}
