import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function LandingPage() {
  // Check if user is authenticated
  let session = null;
  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    console.error('Error getting session:', error);
    // Continue without a session
  }
  
  return (
    <div className="px-4 py-16 mx-auto max-w-7xl">
      {/* Navigation */}
      <nav className="flex justify-between items-center mb-16">
        <div className="text-2xl font-bold text-blue-600">Insight Ink</div>
        <div className="space-x-4">
          {session ? (
            <Link href="/dashboard" className="px-4 py-2 font-medium text-blue-600 rounded border border-blue-600 hover:bg-blue-50">
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="px-4 py-2 font-medium text-blue-600 rounded border border-blue-600 hover:bg-blue-50">
                Log in
              </Link>
              <Link href="/signup" className="px-4 py-2 font-medium text-white bg-blue-600 rounded hover:bg-blue-700">
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
      
      {/* Hero Section */}
      <div className="text-center mb-24">
        <h1 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Capture ideas with AI-powered notes
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Insight Ink helps you organize your thoughts with AI-powered tagging, semantic search, and smart suggestions.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/signup" className="px-6 py-3 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 shadow-md">
            Get Started
          </Link>
          <Link href="/login" className="px-6 py-3 font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 shadow-md">
            Sign In
          </Link>
        </div>
      </div>
      
      {/* Features */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold mb-4">T</div>
            <h3 className="text-xl font-bold mb-2">AI-Powered Tagging</h3>
            <p className="text-gray-600">Automatically tag your notes using AI to keep everything organized.</p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold mb-4">S</div>
            <h3 className="text-xl font-bold mb-2">Semantic Search</h3>
            <p className="text-gray-600">Find what you're looking for even if you don't remember the exact words.</p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold mb-4">M</div>
            <h3 className="text-xl font-bold mb-2">Markdown Support</h3>
            <p className="text-gray-600">Write notes in markdown for rich formatting and structure.</p>
          </div>
          
          {/* Feature 4 */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold mb-4">V</div>
            <h3 className="text-xl font-bold mb-2">Version History</h3>
            <p className="text-gray-600">Never lose your work with automatic version history tracking.</p>
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg p-10 text-center mb-24">
        <h2 className="text-3xl font-bold mb-4">Ready to start taking smarter notes?</h2>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of users who are organizing their thoughts more efficiently.
        </p>
        <Link href="/signup" className="px-8 py-3 font-medium text-blue-600 bg-white rounded-md hover:bg-blue-50 shadow-md inline-block">
          Sign up for free
        </Link>
      </div>
      
      {/* Footer */}
      <footer className="border-t border-gray-200 pt-8 text-center text-gray-500">
        <p>© {new Date().getFullYear()} Insight Ink. All rights reserved.</p>
      </footer>
    </div>
  );
}
