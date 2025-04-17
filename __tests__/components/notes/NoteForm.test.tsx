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
});