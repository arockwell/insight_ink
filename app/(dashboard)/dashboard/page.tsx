import { getServerSession } from 'next-auth/next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { 
  DocumentTextIcon, 
  TagIcon, 
  MagnifyingGlassIcon, 
  PlusCircleIcon 
} from '@heroicons/react/24/outline';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import prisma from '@/lib/db';

async function getRecentNotes(userId: number) {
  return prisma.note.findMany({
    where: { 
      userId: userId
    } as any, // Type assertion to work around Prisma type issues
    orderBy: { updatedAt: 'desc' },
    take: 5,
    include: { 
      noteTags: { 
        include: { 
          tag: true 
        } 
      } 
    },
  });
}

// Define TypeScript interface for the notes with tags
interface NoteWithTags {
  id: number;
  title: string;
  content: string | null;
  category: string | null;
  summary: string | null;
  createdAt: Date;
  updatedAt: Date;
  noteTags: Array<{
    tag: {
      id: number;
      name: string;
      color: string;
    }
  }>;
}

async function getStats(userId: number) {
  const notesCount = await prisma.note.count({
    where: { 
      userId: userId
    } as any, // Type assertion to work around Prisma type issues
  });
  
  const tagsCount = await prisma.tag.count();
  
  return { notesCount, tagsCount };
}

export default async function DashboardPage() {
  let session;
  
  try {
    session = await getServerSession(authOptions);
    
    if (!session) {
      redirect('/login');
    }
  } catch (error) {
    console.error('Error getting session:', error);
    redirect('/login');
  }
  
  const userId = parseInt(session.user.id);
  const recentNotes = await getRecentNotes(userId) as unknown as NoteWithTags[];
  const stats = await getStats(userId);
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {session.user.name || 'User'}
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your notes today.
        </p>
      </div>
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100 text-primary-800">
              <DocumentTextIcon className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Notes</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.notesCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100 text-primary-800">
              <TagIcon className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Tags</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.tagsCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary-100 text-primary-800">
                <MagnifyingGlassIcon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Search</p>
                <p className="text-md font-semibold text-gray-900">Find your notes</p>
              </div>
            </div>
            <Link href="/search" className="text-primary-600 hover:text-primary-800">
              Search
            </Link>
          </div>
        </div>
      </div>
      
      {/* Recent Notes Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Notes</h2>
          <Link href="/notes/new" className="btn btn-primary flex items-center">
            <PlusCircleIcon className="h-5 w-5 mr-1" />
            New Note
          </Link>
        </div>
        
        <div className="space-y-4">
          {recentNotes.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">You haven't created any notes yet.</p>
              <Link href="/notes/new" className="btn btn-primary mt-4">
                Create your first note
              </Link>
            </div>
          ) : (
            recentNotes.map((note: NoteWithTags) => (
              <Link
                key={note.id}
                href={`/notes/${note.id}`}
                className="block hover:bg-gray-50 p-4 border border-gray-200 rounded-lg transition-colors"
              >
                <h3 className="text-lg font-medium text-gray-900">{note.title}</h3>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                  {note.content?.substring(0, 150) || 'No content'}
                </p>
                {note.noteTags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {note.noteTags.map(({ tag }) => (
                      <span
                        key={tag.id}
                        style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-2 text-xs text-gray-500">
                  Updated {new Date(note.updatedAt).toLocaleDateString()}
                </div>
              </Link>
            ))
          )}
        </div>
        
        {recentNotes.length > 0 && (
          <div className="mt-4 text-center">
            <Link href="/notes" className="text-primary-600 hover:text-primary-800">
              View all notes
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
