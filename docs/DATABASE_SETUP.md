# Database Setup Guide

This document provides information about the PostgreSQL setup for Insight Ink.

## Overview

Insight Ink uses PostgreSQL with the pgvector extension for vector embeddings and similarity search. The database is containerized using Docker.

## Setup Process

1. Start the PostgreSQL container:
   ```bash
   docker-compose up -d
   ```

2. Initialize the database schema:
   ```bash
   npx prisma db push
   ```
   
   Note: We use `prisma db push` instead of migrations because Prisma migrations may encounter timeout issues with advisory locks.

3. Seed the database with initial data:
   ```bash
   npm run db:seed
   ```

4. Verify the setup:
   ```bash
   npm run db:validate
   ```

## Troubleshooting

### Prisma Migration Timeouts

If you encounter timeouts when trying to use Prisma migrations:

```
Error: P1002
The database server at `localhost:5432` was reached but timed out.
Context: Timed out trying to acquire a postgres advisory lock (SELECT pg_advisory_lock(72707369)).
```

Use `npx prisma db push` instead, which applies schema changes without requiring advisory locks.

### Vector Extension

If the vector extension is not detected:

1. Check if it's installed:
   ```bash
   docker exec insight_ink-postgres-1 psql -U postgres -d insight_ink -c "SELECT * FROM pg_extension WHERE extname = 'vector';"
   ```

2. Install it manually if needed:
   ```bash
   docker exec insight_ink-postgres-1 psql -U postgres -d insight_ink -c "CREATE EXTENSION IF NOT EXISTS vector;"
   ```

## Database Structure

The database includes the following tables:

- `users` - User accounts and authentication information
- `notes` - User notes with content, embedding, and metadata
- `tags` - Categories for organizing notes
- `note_tags` - Junction table for many-to-many relationship between notes and tags
- `note_versions` - Historical versions of notes for tracking changes
