import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define paths that should be protected
const PROTECTED_PATHS = [
  '/api/debug',  // Protect all debug routes
  '/api/notes',  // Protect note operations that might use OpenAI
  '/api/tags',   // Protect tag operations
];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Check if the path should be protected
  const shouldProtect = PROTECTED_PATHS.some(prefix => path.startsWith(prefix));
  
  if (shouldProtect) {
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
  }
  
  return NextResponse.next();
}

// Configure the middleware to run only for API routes
export const config = {
  matcher: '/api/:path*',
};
