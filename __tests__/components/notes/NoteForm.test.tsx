import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NoteForm from '@/components/notes/NoteForm';

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ id: 123, title: 'Test Note' }),
  } as Response)
);

// Mock router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('NoteForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders form fields correctly', () => {
    render(<NoteForm />);
    
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tags/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create note/i })).toBeInTheDocument();
  });

  it('pre-fills form with initial values when provided', () => {
    const initialValues = {
      noteId: 1,
      initialTitle: 'Test Title',
      initialContent: 'Test Content',
      initialCategory: 'Work',
      initialTags: [
        { id: 1, name: 'important', color: '#ff0000' },
      ],
    };
    
    render(<NoteForm {...initialValues} />);
    
    expect(screen.getByLabelText(/title/i)).toHaveValue(initialValues.initialTitle);
    expect(screen.getByLabelText(/category/i)).toHaveValue(initialValues.initialCategory);
    expect(screen.getByLabelText(/content/i)).toHaveValue(initialValues.initialContent);
    
    // Check that the button text changes to "Update Note" for edit mode
    expect(screen.getByRole('button', { name: /update note/i })).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    render(<NoteForm />);
    
    // Fill out the form
    await userEvent.type(screen.getByLabelText(/title/i), 'New Test Note');
    await userEvent.type(screen.getByLabelText(/content/i), 'This is a test note content');
    
    // Select a category
    await userEvent.selectOptions(screen.getByLabelText(/category/i), 'Personal');
    
    // Add tags
    await userEvent.type(screen.getByLabelText(/tags/i), 'test, important');
    
    // Submit the form
    await userEvent.click(screen.getByRole('button', { name: /create note/i }));
    
    // Verify fetch was called with correct data
    expect(fetch).toHaveBeenCalledWith('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'New Test Note',
        content: 'This is a test note content',
        category: 'Personal',
        tagList: 'test, important',
      }),
    });
  });

  it('auto-saves after user input with delay', async () => {
    render(<NoteForm />);
    
    // Type in the content field
    await userEvent.type(screen.getByLabelText(/content/i), 'Auto-save test');
    
    // Fast-forward timers
    jest.advanceTimersByTime(2000);
    
    // Check that fetch was called with the auto-save data
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: expect.any(String),
      });
    });
    
    // Check that the auto-save status is displayed
    expect(screen.getByText(/auto-saving/i)).toBeInTheDocument();
  });
});