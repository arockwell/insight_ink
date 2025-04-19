import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define paths that should be public (not protected)
const PUBLIC_PATHS = [
  '/',
  '/login',
  '/signup',
  '/about',
  '/features',
  '/api/auth/signin',
  '/api/auth/signout',
  '/api/auth/session',
  '/api/auth/csrf',
  '/api/auth/callback',
  '/api/auth/providers'
];

// API routes that need API key but not auth
const API_KEY_PATHS = [
  '/api/debug',
  '/api/notes',
  '/api/tags'
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Special handling for NextAuth paths
  if (path.startsWith('/api/auth')) {
    return NextResponse.next();
  }
  
  // Check if the path is a protected API route
  const isApiKeyProtectedPath = API_KEY_PATHS.some(prefix => path.startsWith(prefix));
  
  if (isApiKeyProtectedPath && !path.startsWith('/api/auth')) {
    // Get the API key from the request headers
    const apiKey = request.headers.get('x-api-key');
    
    // Check if the API key is valid
    if (!apiKey || apiKey !== process.env.API_SECRET_KEY) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized: Invalid API key' }),
        { 
          status: 401, 
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    // Continue with the request if API key is valid
    return NextResponse.next();
  }
  
  // Check if the path is public
  const isPublicPath = PUBLIC_PATHS.some(
    publicPath => path === publicPath || path.startsWith(`${publicPath}/`)
  );
  
  // Allow all API routes that start with /api/auth to bypass authentication
  if (path.startsWith('/api/auth')) {
    return NextResponse.next();
  }
  
  if (isPublicPath) {
    return NextResponse.next();
  }
  
  // Get the user's session token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-development',
  });
  
  // If there's no token and the path isn't public, redirect to login
  if (!token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }
  
  // Continue with the request if user is authenticated
  return NextResponse.next();
}

// Apply middleware to all routes except static files
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
