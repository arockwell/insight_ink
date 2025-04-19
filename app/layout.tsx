import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { Providers } from './providers'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

// Dynamically import the Sidebar to prevent hydration issues
const SidebarWrapper = dynamic(() => import('@/components/ui/SidebarWrapper'), {
  ssr: false
})

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
  // Simplified Layout
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <link rel="stylesheet" href="/styles/styles.css" />
      </head>
      <body className={`${inter.className}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
