import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import Sidebar from '@/components/ui/Sidebar'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Insight Ink',
  description: 'AI-powered note-taking application for organizing your thoughts and ideas',
  keywords: 'notes, AI, organization, productivity, writing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className={`${inter.className} min-h-screen bg-gray-50 antialiased`}>
        <div className="min-h-screen">
          {/* Sidebar */}
          <Sidebar />
          
          {/* Main Content */}
          <div className="md:pl-64">
            <main className="py-6 px-4 sm:px-6 md:px-8">
              <div className="max-w-6xl mx-auto">
                {children}
              </div>
            </main>
            <footer className="py-4 px-6 text-center text-sm text-gray-500">
              <p>© {new Date().getFullYear()} Insight Ink. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </body>
    </html>
  )
}
