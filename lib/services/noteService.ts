import prisma from '@/lib/db';
import { generateEmbedding, generateTitle } from '@/lib/ai/openai';

export type NoteInput = {
  title?: string;
  content?: string;
  category?: string;
  tagIds?: number[];
  tagList?: string;
};

export const noteService = {
  // Get all notes
  async getAllNotes() {
    return prisma.note.findMany({
      orderBy: { updatedAt: 'desc' },
      include: { noteTags: { include: { tag: true } } },
    });
  },
  
  // Get note by ID
  async getNoteById(id: number) {
    return prisma.note.findUnique({
      where: { id },
      include: { noteTags: { include: { tag: true } } },
    });
  },
  
  // Create note
  async createNote(data: NoteInput) {
    const { title, content, category, tagIds, tagList } = data;
    
    // Generate embedding if content is provided
    let embeddingData = undefined;
    if (content) {
      const embeddingArray = await generateEmbedding(content);
      if (embeddingArray) {
        embeddingData = embeddingArray;
      }
    }
    
    // Generate title if not provided
    let finalTitle = title;
    if (!finalTitle && content && content.length > 50) {
      finalTitle = await generateTitle(content) || 'Untitled Note';
    } else if (!finalTitle) {
      finalTitle = 'Untitled Note';
    }
    
    // Process tags
    const processedTagIds = await this.processTagList(tagList, tagIds);
    
    return prisma.note.create({
      data: {
        title: finalTitle,
        content,
        category,
        embedding: embeddingData as any, // Type assertion due to Prisma Json typing limitations
        noteTags: {
          create: processedTagIds.map(tagId => ({ tagId })),
        },
      },
      include: { noteTags: { include: { tag: true } } },
    });
  },
  
  // Update note
  async updateNote(id: number, data: NoteInput) {
    const { title, content, category, tagIds, tagList } = data;
    
    // Build update data object
    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (category !== undefined) updateData.category = category;
    
    // Generate embedding if content changed
    if (content !== undefined) {
      const embeddingArray = await generateEmbedding(content);
      updateData.embedding = embeddingArray as any; // Type assertion due to Prisma Json typing limitations
    }
    
    // Process tags
    const processedTagIds = await this.processTagList(tagList, tagIds);
    
    // First, update the note
    await prisma.note.update({
      where: { id },
      data: updateData,
    });
    
    // Then, update tags if needed
    if (processedTagIds) {
      // Delete existing tags
      await prisma.noteTag.deleteMany({
        where: { noteId: id },
      });
      
      // Create new tags
      if (processedTagIds.length > 0) {
        await prisma.$transaction(
          processedTagIds.map(tagId =>
            prisma.noteTag.create({
              data: { noteId: id, tagId },
            })
          )
        );
      }
    }
    
    return prisma.note.findUnique({
      where: { id },
      include: { noteTags: { include: { tag: true } } },
    });
  },
  
  // Create version
  async createVersion(noteId: number, content: string, title: string) {
    return prisma.noteVersion.create({
      data: {
        noteId,
        content,
        title,
      },
    });
  },
  
  // Delete note
  async deleteNote(id: number) {
    return prisma.note.delete({
      where: { id },
    });
  },
  
  // Search notes
  async searchNotes(query: string, limit: number = 10) {
    // Implement hybrid search
    const exactMatches = await prisma.note.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { content: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: limit,
      include: { noteTags: { include: { tag: true } } },
    });
    
    return exactMatches;
  },
  
  // Helper method to process tag list
  async processTagList(tagList?: string, tagIds?: number[]) {
    if (!tagList && !tagIds) return [];
    
    if (tagIds) return tagIds;
    
    if (tagList) {
      const tagNames = tagList.split(',').map(tag => tag.trim()).filter(Boolean);
      
      const tagRecords = await Promise.all(
        tagNames.map(async (name) => {
          // Find or create tag
          const existingTag = await prisma.tag.findFirst({
            where: { name: { equals: name, mode: 'insensitive' } },
          });
          
          if (existingTag) return existingTag;
          
          // Create a new tag with a color
          return prisma.tag.create({
            data: {
              name,
              color: this.getRandomColor(),
            },
          });
        })
      );
      
      return tagRecords.map(tag => tag.id);
    }
    
    return [];
  },
  
  // Helper method to get a random color
  getRandomColor() {
    const colors = [
      "#4263eb", "#7950f2", "#be4bdb", "#e64980", "#fa5252",
      "#fd7e14", "#fab005", "#40c057", "#15aabf", "#228be6"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
};