'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { DocumentTextIcon, TagIcon, HomeIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { useEffect, CSSProperties } from 'react'

export default function Sidebar() {
  const pathname = usePathname()

  useEffect(() => {
    console.log('Sidebar component mounted')
  }, [])

  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Notes', href: '/notes', icon: DocumentTextIcon },
    { name: 'Tags', href: '/tags', icon: TagIcon },
  ]

  const sidebarStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    width: '256px',
    backgroundColor: '#0369a1',
    color: 'white',
    display: 'block',
    zIndex: 40,
    transform: 'translateX(-256px)',
    transition: 'transform 0.3s ease-in-out',
  }

  const mediaQuery = `
    @media (min-width: 768px) {
      #sidebar-container {
        transform: translateX(0) !important;
      }
      .md\\:pl-64 {
        padding-left: 256px !important;
      }
    }
  `

  return (
    <>
      <style>{mediaQuery}</style>
      <div id="sidebar-container" style={sidebarStyle}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Header */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: '16px', 
            height: '64px', 
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)' 
          }}>
            <h1 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 800, 
              background: 'linear-gradient(to right, white, #e0f2fe)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 1px rgba(0, 0, 0, 0.1)'
            }}>
              Insight Ink
            </h1>
          </div>
          
          {/* Navigation */}
          <div style={{ flex: 1, overflowY: 'auto', paddingTop: '20px' }}>
            <nav style={{ padding: '0 16px 16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {navigation.map((item) => {
                  const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        padding: '10px 12px', 
                        borderRadius: '8px',
                        backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                        color: isActive ? 'white' : 'rgba(255, 255, 255, 0.8)',
                        transition: 'all 0.2s',
                        fontSize: '0.875rem',
                        fontWeight: 500
                      }}
                    >
                      <Icon 
                        style={{
                          marginRight: '12px',
                          width: '20px',
                          height: '20px',
                          color: isActive ? 'white' : 'rgba(255, 255, 255, 0.6)'
                        }}
                        aria-hidden="true"
                      />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </div>
            </nav>
          </div>
          
          {/* Footer */}
          <div style={{ 
            padding: '16px', 
            borderTop: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <Link
              href="/notes/new"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px 16px',
                backgroundColor: 'white',
                color: '#0284c7',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: 500,
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.2s'
              }}
            >
              <PlusCircleIcon style={{ width: '20px', height: '20px', marginRight: '6px' }} />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
