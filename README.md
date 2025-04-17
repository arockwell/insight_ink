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
- Prisma ORM with PostgreSQL + pgvector
- OpenAI API for AI features
- NextAuth for authentication
- Tailwind CSS for styling
- Jest and React Testing Library for testing

## Quick Start

The easiest way to get started is by using our automated setup:

```bash
# Clone the repository
git clone https://github.com/username/insight_ink.git
cd insight_ink

# Copy environment variables
cp .env.example .env.local

# Run the setup script (installs dependencies, starts Docker, sets up DB)
npm run setup

# Validate the pgvector setup
npm run db:validate

# Start the development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Manual Setup

For detailed setup instructions, see [SETUP.md](SETUP.md).

## Local Development with Docker

We use Docker to run PostgreSQL with the pgvector extension:

```bash
# Start PostgreSQL
docker-compose up -d

# Validate pgvector is working
npm run db:validate

# Open Prisma Studio to view and edit data
npm run prisma:studio
```

## Database Migrations and Seeding

```bash
# Create and apply migrations
npm run prisma:migrate

# Seed the database with sample data
npm run db:seed
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests in CI mode
npm run test:ci
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm test` - Run tests
- `npm run setup` - Initial project setup with Docker
- `npm run db:validate` - Validate pgvector setup

## CI/CD

We use GitHub Actions for continuous integration. The CI pipeline runs on pull requests and merges to main, checking:

- Code linting
- Type checking
- Unit tests
- Build process

## Contributing

1. Create a new branch for your feature or bug fix
2. Make your changes
3. Write tests for your changes
4. Run tests and ensure they pass
5. Submit a pull request