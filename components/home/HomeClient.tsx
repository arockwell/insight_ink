'use client';

import { useEffect, useState } from 'react';
import { getApiKey, setApiKey, hasApiKey } from '@/lib/utils/apiUtils';

export default function HomeClient() {
  const [apiKey, setLocalApiKey] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showApiKeyForm, setShowApiKeyForm] = useState<boolean>(false);
  const [apiKeySaved, setApiKeySaved] = useState<boolean>(false);

  // Check if API key is already set
  useEffect(() => {
    setIsAuthenticated(hasApiKey());
    const savedKey = getApiKey();
    if (savedKey) {
      setLocalApiKey(savedKey);
    }
  }, []);

  // Handle API key submission
  const handleSubmitApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    setApiKey(apiKey);
    setIsAuthenticated(true);
    setApiKeySaved(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setApiKeySaved(false);
      setShowApiKeyForm(false);
    }, 3000);
  };

  // Handle API key input change
  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalApiKey(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-4xl font-bold mb-4">Welcome to Insight Ink</h1>
      <p className="text-xl mb-8">An AI-powered note-taking application</p>
      
      <div className="flex gap-4 mb-8">
        <a 
          href="/notes" 
          className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition"
        >
          Browse Notes
        </a>
        <a 
          href="/notes/new" 
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Create Note
        </a>
      </div>
      
      {/* API Key Management */}
      <div className="mt-8 w-full max-w-md">
        {!showApiKeyForm ? (
          <button
            onClick={() => setShowApiKeyForm(true)}
            className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            {isAuthenticated ? 'Update API Key' : 'Set API Key'}
          </button>
        ) : (
          <div className="bg-white shadow-md rounded p-6">
            <h2 className="text-xl font-semibold mb-4">
              {isAuthenticated ? 'Update API Key' : 'Set API Key'}
            </h2>
            
            {apiKeySaved && (
              <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                <p>API key saved successfully!</p>
              </div>
            )}
            
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
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowApiKeyForm(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
              </div>
            </form>
            
            <div className="mt-4 text-sm text-gray-500">
              <p>The API key can be found in your .env file as API_SECRET_KEY.</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Debug Link */}
      <div className="mt-8">
        <a 
          href="/debug" 
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Debug Environment
        </a>
      </div>
    </div>
  );
}
