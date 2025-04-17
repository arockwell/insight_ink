import prisma from '@/lib/db';

export type TagInput = {
  name: string;
  color?: string;
};

export const tagService = {
  // Get all tags
  async getAllTags() {
    return prisma.tag.findMany({
      orderBy: { name: 'asc' },
    });
  },
  
  // Get tag by ID
  async getTagById(id: number) {
    return prisma.tag.findUnique({
      where: { id },
    });
  },
  
  // Create tag
  async createTag(data: TagInput) {
    const { name, color } = data;
    
    // Check if tag with same name already exists
    const existingTag = await prisma.tag.findFirst({
      where: { name: { equals: name, mode: 'insensitive' } },
    });
    
    if (existingTag) {
      return existingTag;
    }
    
    return prisma.tag.create({
      data: {
        name,
        color: color || this.getRandomColor(),
      },
    });
  },
  
  // Update tag
  async updateTag(id: number, data: TagInput) {
    const { name, color } = data;
    
    return prisma.tag.update({
      where: { id },
      data: { name, color },
    });
  },
  
  // Delete tag
  async deleteTag(id: number) {
    return prisma.tag.delete({
      where: { id },
    });
  },
  
  // Get notes by tag
  async getNotesByTag(tagId: number) {
    return prisma.note.findMany({
      where: {
        noteTags: {
          some: {
            tagId,
          },
        },
      },
      include: {
        noteTags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });
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