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
    
    // Check pgvector extension
    console.log('Checking pgvector extension...');
    const result = await prisma.$queryRaw`SELECT * FROM pg_extension WHERE extname = 'vector'`;
    
    if (Array.isArray(result) && result.length > 0) {
      console.log('✅ pgvector extension is installed');
    } else {
      console.error('❌ pgvector extension is not installed.');
      console.log('Please run: docker-compose exec postgres psql -U postgres -d insight_ink -c "CREATE EXTENSION IF NOT EXISTS vector;"');
      return;
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