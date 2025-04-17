# Insight Ink

Insight Ink is an AI-powered note-taking application that helps you organize, tag, and search your notes semantically.

## Features

- Create and edit notes with markdown support
- Automatic tagging and categorization with AI
- Semantic search using embeddings
- Version history for your notes
- Rich UI with responsive design

## Tech Stack

- Next.js with TypeScript
- Prisma ORM with PostgreSQL
- OpenAI API for AI features
- NextAuth for authentication
- Tailwind CSS for styling

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL with pgvector extension

### Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (copy `.env.example` to `.env.local`)
4. Initialize the database: `npx prisma migrate dev`
5. Run the development server: `npm run dev`

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests