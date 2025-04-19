import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { Providers } from '../providers'
import dynamic from 'next/dynamic'

// Dynamically import the Sidebar to prevent hydration issues
const SidebarWrapper = dynamic(() => import('@/components/ui/SidebarWrapper'), {
  ssr: false
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Insight Ink - Dashboard',
  description: 'AI-powered note-taking application for organizing your thoughts and ideas',
  keywords: 'notes, AI, organization, productivity, writing',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container-app">
      {/* Sidebar */}
      <SidebarWrapper />
      
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
  )
}
