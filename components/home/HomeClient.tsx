'use client'

import Link from 'next/link'

export default function HomeClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-12">
      {/* Hero Section */}
      <div className="relative pt-8 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1>
                <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                  <span className="hero-title">Capture ideas with AI-powered notes</span>
                </span>
              </h1>
              <p className="mt-3 hero-subtitle">
                Insight Ink helps you organize your thoughts with AI-powered tagging, semantic search, and smart suggestions.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <div className="space-x-4">
                  <Link href="/signup" className="btn btn-primary text-lg px-8 py-3">
                    Get Started
                  </Link>
                  <Link href="/login" className="btn btn-secondary text-lg px-8 py-3">
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div 
                  className="w-full h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
                  style={{ minHeight: '300px' }}
                >
                  <div className="text-white text-xl font-bold">Insight Ink</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Smarter note-taking
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Everything you need to capture, organize, and find your ideas.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {/* Feature 1 */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md">
                  <span className="text-lg font-bold">T</span>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">AI-Powered Tagging</p>
                <div className="mt-2 ml-16 text-base text-gray-500">
                  Automatically tag your notes using AI to keep everything organized.
                </div>
              </div>

              {/* Feature 2 */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md">
                  <span className="text-lg font-bold">S</span>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Semantic Search</p>
                <div className="mt-2 ml-16 text-base text-gray-500">
                  Find what you're looking for even if you don't remember the exact words.
                </div>
              </div>

              {/* Feature 3 */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md">
                  <span className="text-lg font-bold">M</span>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Markdown Support</p>
                <div className="mt-2 ml-16 text-base text-gray-500">
                  Write notes in markdown for rich formatting and structure.
                </div>
              </div>

              {/* Feature 4 */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md">
                  <span className="text-lg font-bold">V</span>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Version History</p>
                <div className="mt-2 ml-16 text-base text-gray-500">
                  Never lose your work with automatic version history tracking.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-primary-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to start taking smarter notes?</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-primary-200">
            Join thousands of users who are organizing their thoughts more efficiently.
          </p>
          <Link
            href="/signup"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 sm:w-auto"
          >
            Sign up for free
          </Link>
        </div>
      </div>
    </div>
  );
}
