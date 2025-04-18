'use client';

import { useEffect, useState } from 'react';
import { fetchWithAuth, getApiKey, setApiKey, hasApiKey } from '@/lib/utils/apiUtils';

export default function DebugPage() {
  const [envVars, setEnvVars] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setLocalApiKey] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if API key is already set
  useEffect(() => {
    setIsAuthenticated(hasApiKey());
    const savedKey = getApiKey();
    if (savedKey) {
      setLocalApiKey(savedKey);
    }
  }, []);

  // Fetch environment variables when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;
    
    async function fetchEnvVars() {
      try {
        setLoading(true);
        const response = await fetchWithAuth('/api/debug/env');
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized: Invalid API key');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEnvVars(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchEnvVars();
  }, [isAuthenticated]);

  // Handle API key submission
  const handleSubmitApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    setApiKey(apiKey);
    setIsAuthenticated(true);
  };

  // Handle API key input change
  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalApiKey(e.target.value);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Environment Debug</h1>
      
      {!isAuthenticated ? (
        <div className="bg-white shadow-md rounded p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Authentication Required</h2>
          <p className="mb-4">Please enter your API key to access this page:</p>
          
          <form onSubmit={handleSubmitApiKey} className="space-y-4">
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
                API Key
              </label>
              <input
                type="password"
                id="apiKey"
                value={apiKey}
                onChange={handleApiKeyChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your API key"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Authenticate
            </button>
          </form>
          
          <div className="mt-4 text-sm text-gray-500">
            <p>The API key can be found in your .env file as API_SECRET_KEY.</p>
          </div>
        </div>
      ) : (
        <>
          {loading && <p>Loading environment variables...</p>}
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p>Error: {error}</p>
            </div>
          )}
          
          {!loading && !error && (
            <div className="bg-white shadow-md rounded p-4">
              <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Variable
                      </th>
                      <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(envVars).map(([key, value]) => (
                      <tr key={key}>
                        <td className="py-2 px-4 border-b border-gray-200">{key}</td>
                        <td className="py-2 px-4 border-b border-gray-200 font-mono">
                          {key.includes('KEY') || key.includes('SECRET') || key.includes('PASSWORD') 
                            ? '********' 
                            : value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {Object.keys(envVars).length === 0 && (
                <p className="text-gray-500 italic">No environment variables found.</p>
              )}
            </div>
          )}
        </>
      )}
      
      <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <p className="text-yellow-700">
          <strong>Note:</strong> For security reasons, some sensitive values may be masked.
          This page only shows environment variables that are accessible to the server.
        </p>
      </div>
    </div>
  );
}
