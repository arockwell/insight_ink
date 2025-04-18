'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-100 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Organize Your Thoughts with AI-Powered Note Taking
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-10">
            Capture ideas, organize information, and discover connections with an intelligent note-taking application.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="#auth-section" 
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
            >
              Get Started
            </Link>
            <Link 
              href="#features-section" 
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="mt-16 max-w-5xl mx-auto">
          {/* Placeholder for future app screenshot or illustration */}
          <div className="bg-gray-200 rounded-lg w-full h-96 flex items-center justify-center shadow-lg">
            <p className="text-gray-600 font-medium">App Screenshot</p>
          </div>
        </div>
      </div>
    </section>
  );
}
