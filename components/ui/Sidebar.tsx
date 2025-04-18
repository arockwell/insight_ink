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
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex flex-col flex-grow overflow-y-auto bg-gradient-to-b from-primary-800 via-primary-700 to-primary-800 shadow-xl">
        <div className="flex items-center flex-shrink-0 px-4 pt-6 pb-4 border-b border-primary-600/30">
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-primary-100">
              Insight Ink
            </span>
          </h1>
        </div>
        <div className="mt-6 flex-1 flex flex-col">
          <nav className="flex-1 px-3 pb-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    isActive
                      ? 'bg-primary-600/50 text-white shadow-sm'
                      : 'text-primary-100 hover:bg-primary-600/30'
                  } group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200`}
                >
                  <item.icon
                    className={`mr-3 flex-shrink-0 ${isActive ? 'text-white' : 'text-primary-300 group-hover:text-white'}`}
                    style={{ width: '20px', height: '20px' }}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-primary-600/30">
          <Link
            href="/notes/new"
            className="flex items-center justify-center px-4 py-2.5 rounded-lg shadow-sm text-sm font-medium bg-white hover:bg-gray-50 text-primary-700 transition-all duration-200 hover:shadow transform hover:-translate-y-0.5"
          >
            <PlusCircleIcon className="w-5 h-5 mr-1.5" />
            New Note
          </Link>
        </div>
      </div>
    </div>
  )
}
