'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { DocumentTextIcon, TagIcon, HomeIcon, PlusCircleIcon } from '@heroicons/react/24/outline'

export default function Sidebar() {
  const pathname = usePathname()

  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Notes', href: '/notes', icon: DocumentTextIcon },
    { name: 'Tags', href: '/tags', icon: TagIcon },
  ]

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-header">
          <h1 className="app-title">
            <span className="title-gradient">
              Insight Ink
            </span>
          </h1>
        </div>
        <div className="nav-container">
          <nav className="nav-items">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`nav-item ${isActive ? 'nav-item-active' : 'nav-item-inactive'}`}
                >
                  <item.icon
                    className={`nav-icon ${isActive ? 'nav-icon-active' : 'nav-icon-inactive'}`}
                    style={{ width: '20px', height: '20px' }}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="sidebar-footer">
          <Link
            href="/notes/new"
            className="btn-new-note"
          >
            <PlusCircleIcon className="w-5 h-5 mr-1.5" />
            New Note
          </Link>
        </div>
      </div>
    </div>
  )
}
