'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { DocumentTextIcon, TagIcon, HomeIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'

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
      <div id="sidebar-container" className="sidebar">
        <div className="sidebar-content">
          {/* Header */}
          <div className="sidebar-header">
            <h1 className="app-title">
              <span className="title-gradient">Insight Ink</span>
            </h1>
          </div>
          
          {/* Navigation */}
          <div className="nav-container">
            <nav className="nav-items">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`nav-item ${isActive ? 'nav-item-active' : 'nav-item-inactive'}`}
                  >
                    <Icon 
                      className={`nav-icon ${isActive ? 'nav-icon-active' : 'nav-icon-inactive'}`}
                      aria-hidden="true"
                    />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
          
          {/* Footer */}
          <div className="sidebar-footer">
            <Link
              href="/notes/new"
              className="btn-new-note"
            >
              <PlusCircleIcon className="w-5 h-5 mr-1.5" />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
