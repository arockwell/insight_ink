'use client';

import { useEffect, useState } from 'react';

export default function DebugPage() {
  const [envVars, setEnvVars] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEnvVars() {
      try {
        const response = await fetch('/api/debug/env');
        if (!response.ok) {
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
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Environment Debug</h1>
      
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
      
      <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <p className="text-yellow-700">
          <strong>Note:</strong> For security reasons, some sensitive values may be masked.
          This page only shows environment variables that are accessible to the server.
        </p>
      </div>
    </div>
  );
}
