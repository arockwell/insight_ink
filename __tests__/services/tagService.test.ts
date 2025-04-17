import { tagService } from '@/lib/services/tagService';
import prisma from '@/lib/db';

// Mock Prisma client
jest.mock('@/lib/db', () => ({
  __esModule: true,
  default: {
    tag: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    note: {
      findMany: jest.fn(),
    },
    $disconnect: jest.fn(),
  },
}));

describe('Tag Service', () => {
  const mockTags = [
    { id: 1, name: 'important', color: '#ef4444', createdAt: new Date(), updatedAt: new Date() },
    { id: 2, name: 'work', color: '#3b82f6', createdAt: new Date(), updatedAt: new Date() },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllTags', () => {
    it('should return all tags ordered by name', async () => {
      (prisma.tag.findMany as jest.Mock).mockResolvedValue(mockTags);
      
      const result = await tagService.getAllTags();
      
      expect(prisma.tag.findMany).toHaveBeenCalledWith({
        orderBy: { name: 'asc' },
      });
      expect(result).toEqual(mockTags);
    });
  });

  describe('getTagById', () => {
    it('should return a tag by id', async () => {
      const mockTag = mockTags[0];
      (prisma.tag.findUnique as jest.Mock).mockResolvedValue(mockTag);
      
      const result = await tagService.getTagById(1);
      
      expect(prisma.tag.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockTag);
    });
  });

  describe('createTag', () => {
    it('should return existing tag if name already exists', async () => {
      const mockTag = mockTags[0];
      (prisma.tag.findFirst as jest.Mock).mockResolvedValue(mockTag);
      
      const result = await tagService.createTag({ name: 'important' });
      
      expect(prisma.tag.findFirst).toHaveBeenCalledWith({
        where: { name: { equals: 'important', mode: 'insensitive' } },
      });
      expect(prisma.tag.create).not.toHaveBeenCalled();
      expect(result).toEqual(mockTag);
    });

    it('should create a new tag with color if provided', async () => {
      const newTag = { id: 3, name: 'new-tag', color: '#10b981', createdAt: new Date(), updatedAt: new Date() };
      (prisma.tag.findFirst as jest.Mock).mockResolvedValue(null);
      (prisma.tag.create as jest.Mock).mockResolvedValue(newTag);
      
      const result = await tagService.createTag({ name: 'new-tag', color: '#10b981' });
      
      expect(prisma.tag.create).toHaveBeenCalledWith({
        data: {
          name: 'new-tag',
          color: '#10b981',
        },
      });
      expect(result).toEqual(newTag);
    });

    it('should create a new tag with random color if not provided', async () => {
      const newTag = { id: 3, name: 'new-tag', color: '#random', createdAt: new Date(), updatedAt: new Date() };
      (prisma.tag.findFirst as jest.Mock).mockResolvedValue(null);
      (prisma.tag.create as jest.Mock).mockResolvedValue(newTag);
      
      // Mock getRandomColor
      jest.spyOn(tagService, 'getRandomColor').mockReturnValue('#random');
      
      const result = await tagService.createTag({ name: 'new-tag' });
      
      expect(prisma.tag.create).toHaveBeenCalledWith({
        data: {
          name: 'new-tag',
          color: '#random',
        },
      });
      expect(result).toEqual(newTag);
    });
  });

  describe('getNotesByTag', () => {
    it('should return notes with the specified tag', async () => {
      const mockNotes = [
        { id: 1, title: 'Note 1', content: 'Content 1' },
        { id: 2, title: 'Note 2', content: 'Content 2' },
      ];
      (prisma.note.findMany as jest.Mock).mockResolvedValue(mockNotes);
      
      const result = await tagService.getNotesByTag(1);
      
      expect(prisma.note.findMany).toHaveBeenCalledWith({
        where: {
          noteTags: {
            some: {
              tagId: 1,
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
      expect(result).toEqual(mockNotes);
    });
  });
});