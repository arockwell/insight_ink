import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { Providers } from '../providers'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Insight Ink - AI-powered Note Taking',
  description: 'AI-powered note-taking application for organizing your thoughts and ideas',
  keywords: 'notes, AI, organization, productivity, writing',
}

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <link rel="stylesheet" href="/styles/styles.css" />
      </head>
      <body className={`${inter.className} bg-white`}>
        <Providers>
          <main className="min-h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
