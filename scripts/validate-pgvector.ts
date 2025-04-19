/**
 * This script validates that PostgreSQL is running and the pgvector extension is properly configured
 */

import { PrismaClient } from '@prisma/client';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function main() {
  console.log('Validating pgvector setup...');
  
  try {
    // Check if PostgreSQL is running
    console.log('Checking if PostgreSQL is running...');
    await execAsync('docker-compose ps postgres');
    console.log('✅ PostgreSQL container is running');
  } catch (error) {
    console.error('❌ PostgreSQL container is not running. Please start it with: docker-compose up -d');
    process.exit(1);
  }
  
  // Connect to the database
  const prisma = new PrismaClient();
  
  try {
    // Check connection
    console.log('Checking database connection...');
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Check pgvector extension using a direct SQL query instead of ORM
    console.log('Checking pgvector extension...');
    try {
      // First method: Check using pg_extension
      const result = await prisma.$queryRaw`SELECT * FROM pg_extension WHERE extname = 'vector'`;
      
      if (Array.isArray(result) && result.length > 0) {
        console.log('✅ pgvector extension is installed (confirmed via pg_extension)');
      } else {
        // Second method: Try a direct Docker command as fallback
        console.log('Extension not found via Prisma query, trying direct Docker command...');
        const { stdout } = await execAsync('docker exec insight_ink-postgres-1 psql -U postgres -d insight_ink -c "SELECT * FROM pg_extension WHERE extname = \'vector\';"');
        
        if (stdout.includes('vector')) {
          console.log('✅ pgvector extension is installed (confirmed via direct query)');
        } else {
          throw new Error('pgvector extension not found');
        }
      }
    } catch (error) {
      console.error('❌ pgvector extension is not installed or not properly configured.');
      console.log('Please run: docker exec insight_ink-postgres-1 psql -U postgres -d insight_ink -c "CREATE EXTENSION IF NOT EXISTS vector;"');
      process.exit(1);
    }
    
    // Test database schema and tables
    console.log('Checking database schema...');
    const tables = await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`;
    console.log('Found tables:', tables);
    
    if (!Array.isArray(tables) || tables.length === 0) {
      console.error('❌ No tables found in the database. Schema may not be initialized.');
      console.log('Please run: npx prisma db push');
      process.exit(1);
    }
    
    // Test vector functionality by creating a note with an embedding
    console.log('Testing vector functionality...');
    const testEmbedding = Array.from({ length: 10 }, () => Math.random());
    
    // Create a test note with embedding
    const testNote = await prisma.note.create({
      data: {
        title: 'pgvector test note',
        content: 'This is a test note to validate pgvector functionality',
        embedding: testEmbedding,
      },
    });
    
    console.log('✅ Successfully created a note with an embedding');
    
    // Clean up the test note
    await prisma.note.delete({
      where: { id: testNote.id },
    });
    
    console.log('✅ Successfully cleaned up test data');
    
    console.log('\n🎉 pgvector setup validation completed successfully!');
    console.log('You can now start developing with Insight Ink.');
  } catch (error) {
    console.error('❌ Error during validation:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
