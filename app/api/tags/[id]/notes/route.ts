import { NextRequest, NextResponse } from 'next/server';
import { tagService } from '@/lib/services/tagService';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const id = parseInt(params.id);
    const notes = await tagService.getNotesByTag(id);
    
    return NextResponse.json(notes);
  } catch (error) {
    console.error('Error fetching notes by tag:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notes by tag' },
      { status: 500 }
    );
  }
}