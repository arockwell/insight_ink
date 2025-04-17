# Claude Instructions for Insight Ink

This document contains instructions for Claude when working on the Insight Ink project.

## Project Overview

Insight Ink is an AI-powered note-taking application that helps users organize, tag, and search their notes semantically.

## Development Guidelines

1. **Code Style**
   - Use TypeScript for all new files
   - Follow Next.js app router patterns
   - Use Tailwind CSS for styling
   - Follow React best practices (functional components, hooks)

2. **Testing**
   - Write tests for new components and functions
   - Run tests with `npm test` before committing

3. **Commands to Run**
   - Lint: `npm run lint`
   - Type check: `npm run typecheck`
   - Test: `npm test`
   - Dev server: `npm run dev`
   - Build: `npm run build`

4. **Feature Implementation Priorities**
   - Core note CRUD functionality
   - Tagging system
   - AI-powered features (embeddings, auto-tagging)
   - UI components and styling
   - Authentication

## File Structure Conventions

- `/app/*` - Next.js app router pages and API routes
- `/components/*` - React components
- `/lib/*` - Utility functions and services
- `/prisma/*` - Database schema and migrations
- `/public/*` - Static assets
- `/styles/*` - Global styles