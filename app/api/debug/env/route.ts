import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Create a safe copy of environment variables
    const envVars: Record<string, string> = {};
    
    // Add specific environment variables we want to check
    // DATABASE_URL is the one we're particularly interested in
    if (process.env.DATABASE_URL) {
      envVars['DATABASE_URL'] = process.env.DATABASE_URL;
    } else {
      envVars['DATABASE_URL'] = 'NOT FOUND';
    }
    
    // Add other environment variables that might be relevant
    if (process.env.NODE_ENV) {
      envVars['NODE_ENV'] = process.env.NODE_ENV;
    }
    
    if (process.env.OPENAI_API_KEY) {
      // Mask the actual key value for security
      envVars['OPENAI_API_KEY'] = 'PRESENT (masked)';
    } else {
      envVars['OPENAI_API_KEY'] = 'NOT FOUND';
    }
    
    // Add process.env object keys (without values) to see what's available
    envVars['AVAILABLE_ENV_VARS'] = Object.keys(process.env).join(', ');
    
    // Add some system info that might be helpful
    envVars['NEXT_RUNTIME'] = process.env.NEXT_RUNTIME || 'nodejs';
    envVars['VERCEL_ENV'] = process.env.VERCEL_ENV || 'development';
    
    return NextResponse.json(envVars);
  } catch (error) {
    console.error('Error fetching environment variables:', error);
    return NextResponse.json(
      { error: 'Failed to fetch environment variables' },
      { status: 500 }
    );
  }
}
