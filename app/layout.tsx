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
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} min-h-screen antialiased`}>
        <div className="container-app">
          <Sidebar />
          <div className="content-area">
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
      </body>
    </html>
  )
}
