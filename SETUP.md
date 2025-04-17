# Local Development Setup Guide

This guide will help you set up your local development environment for Insight Ink.

## Prerequisites

- Node.js 18+
- Docker and Docker Compose (for running PostgreSQL with pgvector)
- npm or yarn

## Step 1: Clone the Repository

```bash
git clone https://github.com/username/insight_ink.git
cd insight_ink
```

## Step 2: Set Up PostgreSQL with pgvector

We'll use Docker to run PostgreSQL with the pgvector extension:

1. Create a `docker-compose.yml` file in the project root:

```yml
version: '3'

services:
  postgres:
    image: ankane/pgvector:latest
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: insight_ink
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

2. Start the database:

```bash
docker-compose up -d
```

3. Verify the pgvector extension:

```bash
docker-compose exec postgres psql -U postgres -d insight_ink -c "CREATE EXTENSION IF NOT EXISTS vector;"
```

You should see `CREATE EXTENSION` if successful.

## Step 3: Configure Environment Variables

1. Copy the example environment file:

```bash
cp .env.example .env.local
```

2. Update the database URL in `.env.local`:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/insight_ink"
```

3. (Optional) Set up OpenAI API keys if you want to test AI features:

```
OPENAI_API_KEY="your-openai-api-key"
OPENAI_ORGANIZATION_ID="your-organization-id"
```

## Step 4: Install Dependencies

```bash
npm install
# or
yarn install
```

Note: You may see some npm deprecation warnings during installation. These are related to transitive dependencies (dependencies of our dependencies) and can be safely ignored. For example:

```
npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory...
```

These warnings don't affect the functionality of our application and will be resolved when the upstream packages update their dependencies.

## Step 5: Set Up the Database

1. Initialize Prisma and apply migrations:

```bash
npx prisma migrate dev --name init
```

This will:
- Create the database tables based on your schema
- Generate the Prisma client
- Enable the pgvector extension

2. (Optional) Seed the database with sample data:

```bash
npx prisma db seed
```

## Step 6: Start the Development Server

```bash
npm run dev
# or
yarn dev
```

The application should now be running at [http://localhost:3000](http://localhost:3000).

## Verifying pgvector Setup

To verify that pgvector is working correctly:

1. Open Prisma Studio to interact with your database:

```bash
npx prisma studio
```

2. Create a note with content to generate an embedding.

3. Check that the embedding is stored in the database by querying:

```bash
docker-compose exec postgres psql -U postgres -d insight_ink -c "SELECT id, title, embedding IS NOT NULL as has_embedding FROM notes;"
```

You should see `true` in the `has_embedding` column for notes that have content.

## Running Tests

```bash
npm test
# or
yarn test
```

## Troubleshooting

### Database Connection Issues

- Verify that Docker is running
- Check if the PostgreSQL container is up: `docker-compose ps`
- Try restarting the container: `docker-compose restart postgres`

### pgvector Extension Problems

- Verify the extension is created: `docker-compose exec postgres psql -U postgres -d insight_ink -c "\\dx"`
- If needed, recreate the extension manually: `docker-compose exec postgres psql -U postgres -d insight_ink -c "CREATE EXTENSION vector;"`

### Prisma Migration Issues

- Reset the database if needed: `npx prisma migrate reset`
- Generate Prisma client: `npx prisma generate`

### npm Dependency Warnings

If you see npm deprecation warnings during installation, these can generally be ignored as they're related to transitive dependencies. The application will still function correctly, and these issues will be resolved as the upstream packages update.