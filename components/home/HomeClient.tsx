'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DocumentTextIcon, PlusCircleIcon, KeyIcon, BeakerIcon } from '@heroicons/react/24/outline';
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
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-600">
          Welcome to Insight Ink
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
          An AI-powered note-taking application that helps you organize your thoughts and ideas
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 w-full max-w-2xl">
        <Link 
          href="/notes" 
          className="group flex flex-col items-center p-6 bg-white rounded-xl shadow-soft hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-primary-200"
        >
          <div className="w-16 h-16 mb-4 rounded-full bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors duration-200">
            <DocumentTextIcon className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors duration-200">Browse Notes</h2>
          <p className="text-gray-500 text-center">View and manage your existing notes</p>
        </Link>
        
        <Link 
          href="/notes/new" 
          className="group flex flex-col items-center p-6 bg-white rounded-xl shadow-soft hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-success-200"
        >
          <div className="w-16 h-16 mb-4 rounded-full bg-success-50 flex items-center justify-center group-hover:bg-success-100 transition-colors duration-200">
            <PlusCircleIcon className="w-8 h-8 text-success-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-success-600 transition-colors duration-200">Create Note</h2>
          <p className="text-gray-500 text-center">Start writing a new note</p>
        </Link>
      </div>
      
      {/* API Key Management */}
      <div className="mt-4 w-full max-w-md">
        {!showApiKeyForm ? (
          <button
            onClick={() => setShowApiKeyForm(true)}
            className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center shadow-sm"
          >
            <KeyIcon className="w-5 h-5 mr-2 text-gray-500" />
            {isAuthenticated ? 'Update API Key' : 'Set API Key'}
          </button>
        ) : (
          <div className="bg-white shadow-card rounded-xl p-6 border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
              <KeyIcon className="w-5 h-5 mr-2 text-primary-500" />
              {isAuthenticated ? 'Update API Key' : 'Set API Key'}
            </h2>
            
            {apiKeySaved && (
              <div className="mb-4 bg-success-50 border border-success-200 text-success-700 px-4 py-3 rounded-lg flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your API key"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowApiKeyForm(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
            
            <div className="mt-4 text-sm text-gray-500 bg-gray-50 p-3 rounded-md border border-gray-100">
              <p>The API key can be found in your .env file as API_SECRET_KEY.</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Debug Link */}
      <div className="mt-8">
        <Link 
          href="/debug" 
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center transition-colors duration-200"
        >
          <BeakerIcon className="w-4 h-4 mr-1" />
          Debug Environment
        </Link>
      </div>
    </div>
  );
}
