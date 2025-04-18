import { render, screen, fireEvent } from '@testing-library/react';
import NoteCard from '@/components/notes/NoteCard';

// Mock data
const mockNote = {
  id: 1,
  title: 'Test Note 1',
  content: 'This is test note 1',
  category: 'Personal',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
  noteTags: [{ tag: { id: 1, name: 'important', color: '#ef4444' } }],
};

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  } as Response)
);

// Mock window.confirm
window.confirm = jest.fn(() => true);

describe('NoteCard', () => {
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders note title and content preview', () => {
    render(<NoteCard note={mockNote} />);
    
    expect(screen.getByText(mockNote.title)).toBeInTheDocument();
    expect(screen.getByText(mockNote.content)).toBeInTheDocument();
  });

  it('displays correct category badge', () => {
    render(<NoteCard note={mockNote} />);
    
    expect(screen.getByText(mockNote.category)).toBeInTheDocument();
  });

  it('displays note tags', () => {
    render(<NoteCard note={mockNote} />);
    
    mockNote.noteTags.forEach(({ tag }) => {
      expect(screen.getByText(tag.name)).toBeInTheDocument();
    });
  });

  it('calls onDelete when delete button is clicked', async () => {
    render(<NoteCard note={mockNote} onDelete={mockOnDelete} />);
    
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
    
    expect(window.confirm).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(`/api/notes/${mockNote.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    // Wait for the async operation to complete
    await new Promise(resolve => setTimeout(resolve, 0));
    
    expect(mockOnDelete).toHaveBeenCalledWith(mockNote.id);
  });
});
