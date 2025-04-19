'use client'

import Sidebar from './Sidebar'

// This wrapper component ensures Sidebar is only rendered on the client side
// to prevent hydration mismatches, since it uses client-side hooks like useSession
export default function SidebarWrapper() {
  return <Sidebar />
}
