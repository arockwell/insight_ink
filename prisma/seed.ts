import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create some tags
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { name: 'important' },
      update: {},
      create: {
        name: 'important',
        color: '#ef4444',
      },
    }),
    prisma.tag.upsert({
      where: { name: 'work' },
      update: {},
      create: {
        name: 'work',
        color: '#3b82f6',
      },
    }),
    prisma.tag.upsert({
      where: { name: 'personal' },
      update: {},
      create: {
        name: 'personal',
        color: '#8b5cf6',
      },
    }),
    prisma.tag.upsert({
      where: { name: 'todo' },
      update: {},
      create: {
        name: 'todo',
        color: '#f59e0b',
      },
    }),
    prisma.tag.upsert({
      where: { name: 'idea' },
      update: {},
      create: {
        name: 'idea',
        color: '#10b981',
      },
    }),
  ]);

  console.log(`Created ${tags.length} tags`);

  // Create some notes
  const noteData = [
    {
      title: 'Welcome to Insight Ink',
      content: `# Welcome to Insight Ink

This is a sample note to get you started with Insight Ink, an AI-powered note-taking application.

## Features

- **Markdown Support**: Write your notes using markdown formatting
- **Tagging**: Organize your notes with tags
- **AI Features**: Smart tagging and semantic search
- **Version History**: Track changes to your notes

Give it a try by creating your first note!`,
      category: 'Personal',
      tagNames: ['important'],
    },
    {
      title: 'Project Ideas',
      content: `# Project Ideas

## Web Development
- Build a personal portfolio website
- Create a recipe sharing platform
- Develop a habit tracker app

## Data Science
- Analyze COVID-19 data
- Build a recommendation system
- Create a sentiment analysis tool

## Machine Learning
- Image classification for plant species
- Natural language processing for text summarization
- Reinforcement learning for game playing`,
      category: 'Work',
      tagNames: ['idea', 'work'],
    },
    {
      title: 'Weekly Todo List',
      content: `# Weekly Todo List

- [x] Finish project proposal
- [ ] Schedule team meeting
- [ ] Research new technologies
- [ ] Update documentation
- [ ] Prepare presentation
- [ ] Review code
- [ ] Deploy application`,
      category: 'Work',
      tagNames: ['todo', 'work'],
    },
  ];

  for (const data of noteData) {
    const { tagNames, ...noteInfo } = data;
    
    // Create the note
    const note = await prisma.note.create({
      data: {
        ...noteInfo,
        // Simulate an embedding with a simple JSON array
        embedding: Array.from({ length: 10 }, () => Math.random()),
      },
    });

    // Get tag IDs
    const tagIds = tags
      .filter(tag => tagNames.includes(tag.name))
      .map(tag => tag.id);

    // Create note-tag relationships
    for (const tagId of tagIds) {
      await prisma.noteTag.create({
        data: {
          noteId: note.id,
          tagId,
        },
      });
    }

    console.log(`Created note: ${note.title}`);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });