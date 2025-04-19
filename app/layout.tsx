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
      <head>
        {/* Load our bundled CSS directly */}
        <link rel="stylesheet" href="/styles/styles.css" />
        <link rel="stylesheet" href="/fix-icon.css" />
      </head>
  <body className={`${inter.className}`}>
    <div className="container-app">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="content-area">
        <div className="relative z-10 bg-gray-50">
          <main className="main-content">
            <div className="content-container">
              {children}
            </div>
          </main>
          <footer className="page-footer">
            <p>© {new Date().getFullYear()} Insight Ink. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
      </body>
    </html>
  )
}
