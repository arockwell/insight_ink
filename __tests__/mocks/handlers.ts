import { HttpResponse, http } from 'msw';

// Sample data for tests
export const mockTags = [
  { id: 1, name: 'important', color: '#ef4444', createdAt: '2023-01-01T00:00:00.000Z', updatedAt: '2023-01-01T00:00:00.000Z' },
  { id: 2, name: 'work', color: '#3b82f6', createdAt: '2023-01-01T00:00:00.000Z', updatedAt: '2023-01-01T00:00:00.000Z' },
  { id: 3, name: 'personal', color: '#8b5cf6', createdAt: '2023-01-01T00:00:00.000Z', updatedAt: '2023-01-01T00:00:00.000Z' },
];

export const mockNotes = [
  {
    id: 1,
    title: 'Test Note 1',
    content: 'This is test note 1',
    category: 'Personal',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
    noteTags: [{ tag: mockTags[0] }],
  },
  {
    id: 2,
    title: 'Test Note 2',
    content: 'This is test note 2',
    category: 'Work',
    createdAt: '2023-01-02T00:00:00.000Z',
    updatedAt: '2023-01-02T00:00:00.000Z',
    noteTags: [{ tag: mockTags[1] }],
  },
];

// Define handlers for API routes
export const handlers = [
  // Notes API
  http.get('/api/notes', () => {
    return HttpResponse.json(mockNotes);
  }),

  http.get('/api/notes/:id', ({ params }) => {
    const { id } = params;
    const note = mockNotes.find(note => note.id === Number(id));
    
    if (!note) {
      return new HttpResponse(null, { status: 404 });
    }
    
    return HttpResponse.json(note);
  }),

  http.post('/api/notes', async ({ request }) => {
    const body = await request.json();
    const newNote = {
      id: mockNotes.length + 1,
      title: body.title || 'Untitled Note',
      content: body.content || '',
      category: body.category || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      noteTags: [],
    };
    
    return HttpResponse.json(newNote, { status: 201 });
  }),

  http.put('/api/notes/:id', async ({ params, request }) => {
    const { id } = params;
    const body = await request.json();
    const noteIndex = mockNotes.findIndex(note => note.id === Number(id));
    
    if (noteIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }
    
    const updatedNote = {
      ...mockNotes[noteIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    };
    
    return HttpResponse.json(updatedNote);
  }),

  http.delete('/api/notes/:id', ({ params }) => {
    const { id } = params;
    const noteIndex = mockNotes.findIndex(note => note.id === Number(id));
    
    if (noteIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }
    
    return new HttpResponse(null, { status: 200 });
  }),

  // Tags API
  http.get('/api/tags', () => {
    return HttpResponse.json(mockTags);
  }),

  http.get('/api/tags/:id', ({ params }) => {
    const { id } = params;
    const tag = mockTags.find(tag => tag.id === Number(id));
    
    if (!tag) {
      return new HttpResponse(null, { status: 404 });
    }
    
    return HttpResponse.json(tag);
  }),

  http.get('/api/tags/:id/notes', ({ params }) => {
    const { id } = params;
    const notes = mockNotes.filter(note => 
      note.noteTags.some(noteTag => noteTag.tag.id === Number(id))
    );
    
    return HttpResponse.json(notes);
  }),

  http.post('/api/tags', async ({ request }) => {
    const body = await request.json();
    const newTag = {
      id: mockTags.length + 1,
      name: body.name,
      color: body.color || '#4263eb',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return HttpResponse.json(newTag, { status: 201 });
  }),
];