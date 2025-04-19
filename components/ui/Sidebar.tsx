'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { 
  DocumentTextIcon, 
  TagIcon, 
  HomeIcon, 
  PlusCircleIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  BeakerIcon
} from '@heroicons/react/24/outline'

export default function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const authenticatedNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Notes', href: '/notes', icon: DocumentTextIcon },
    { name: 'Tags', href: '/tags', icon: TagIcon },
    { name: 'Search', href: '/search', icon: MagnifyingGlassIcon },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
  ];

  const publicNavigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Notes', href: '/notes', icon: DocumentTextIcon },
    { name: 'Tags', href: '/tags', icon: TagIcon },
    { name: 'Debug', href: '/debug', icon: BeakerIcon },
  ];

  const navigation = session ? authenticatedNavigation : publicNavigation;

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        {/* Header */}
        <div className="sidebar-header">
          <Link href="/" className="app-title">
            <span className="title-gradient">Insight Ink</span>
          </Link>
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
          {session ? (
            <div className="space-y-3">
              <Link
                href="/notes/new"
                className="btn-new-note w-full"
              >
                <PlusCircleIcon className="w-5 h-5 mr-1.5" />
                <span>New Note</span>
              </Link>
              
              <div className="flex items-center justify-between text-primary-100 px-3 py-2">
                <div className="flex items-center">
                  <UserCircleIcon className="w-5 h-5 mr-2" />
                  <span className="text-sm truncate max-w-[150px]">
                    {session.user?.name || session.user?.email}
                  </span>
                </div>
                
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-primary-200 hover:text-white"
                  title="Sign out"
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                href="/login"
                className="btn btn-primary w-full"
              >
                Sign In
              </Link>
              
              <Link
                href="/signup"
                className="btn btn-secondary w-full"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
