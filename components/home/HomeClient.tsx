'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DocumentTextIcon, PlusCircleIcon, KeyIcon, BeakerIcon } from '@heroicons/react/24/outline';
import { getApiKey, setApiKey, hasApiKey } from '@/lib/utils/apiUtils';

// We'll use our component classes instead of inline styles

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
    <div className="relative">
      <div className="flex flex-col items-center justify-center min-h-[70vh] relative z-10 bg-gray-50 w-full">
        <header className="text-center mb-10">
          <h1 className="hero-title">
            Welcome to Insight Ink
          </h1>
          <p className="hero-subtitle">
            An AI-powered note-taking application that helps you organize your thoughts and ideas
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 w-full max-w-2xl">
          <Link 
            href="/notes" 
            className="feature-card feature-card-primary"
          >
            <div className="feature-icon-container feature-icon-primary">
              <DocumentTextIcon className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="feature-title feature-title-primary">Browse Notes</h2>
            <p className="feature-description">View and manage your existing notes</p>
          </Link>
          
          <Link 
            href="/notes/new" 
            className="feature-card feature-card-success"
          >
            <div className="feature-icon-container feature-icon-success">
              <PlusCircleIcon className="w-6 h-6 text-success-600" />
            </div>
            <h2 className="feature-title feature-title-success">Create Note</h2>
            <p className="feature-description">Start writing a new note</p>
          </Link>
        </div>
        
        {/* API Key Management */}
        <div className="mt-4 w-full max-w-md">
          {!showApiKeyForm ? (
            <button
              onClick={() => setShowApiKeyForm(true)}
              className="api-key-button"
            >
              <KeyIcon className="w-5 h-5 mr-2 text-gray-500" />
              {isAuthenticated ? 'Update API Key' : 'Set API Key'}
            </button>
          ) : (
            <div className="api-key-form">
              <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                <KeyIcon className="w-5 h-5 mr-2 text-primary-500" />
                {isAuthenticated ? 'Update API Key' : 'Set API Key'}
              </h2>
              
              {apiKeySaved && (
                <div className="api-form-success">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <p>API key saved successfully!</p>
                </div>
              )}
              
              <form onSubmit={handleSubmitApiKey} className="space-y-4">
                <div>
                  <label htmlFor="apiKey" className="label">
                    API Key
                  </label>
                  <input
                    type="password"
                    id="apiKey"
                    value={apiKey}
                    onChange={handleApiKeyChange}
                    className="input"
                    placeholder="Enter your API key"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 btn btn-primary"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowApiKeyForm(false)}
                    className="flex-1 btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
              
              <div className="api-form-hint">
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
    </div>
  );
}
