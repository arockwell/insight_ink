import OpenAI from 'openai';

// Create a mock client for test environments
const isTestEnvironment = process.env.NODE_ENV === 'test';

// In test environment, create a mock client that returns predictable responses
const openai = isTestEnvironment
  ? ({
      embeddings: {
        create: async () => ({
          data: [{ embedding: Array(1536).fill(0.1) }]
        })
      },
      chat: {
        completions: {
          create: async () => ({
            choices: [
              {
                message: {
                  content: JSON.stringify({
                    tags: ['test-tag-1', 'test-tag-2']
                  })
                }
              }
            ]
          })
        }
      }
    } as unknown as OpenAI)
  : new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || 'dummy-key-for-build',
      organization: process.env.OPENAI_ORGANIZATION_ID,
    });

// Generate embeddings for vector search
export async function generateEmbedding(text: string) {
  if (!text) return null;
  
  // Truncate text if it's too long
  const truncatedText = text.length > 8000 
    ? text.substring(0, 8000) 
    : text;
  
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: truncatedText,
    });
    
    return response.data[0].embedding;
  } catch (error) {
    console.error('Error generating embeddings:', error);
    return null;
  }
}

// Generate smart tags
export async function generateSmartTags(content: string, limit: number = 5) {
  if (!content) return [];
  
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You extract relevant tags from text content.'
        },
        {
          role: 'user',
          content: `Extract up to ${limit} relevant tags from this note. Return only a JSON array of tag names without explanation.\n\nNOTE CONTENT:\n${content}`
        }
      ],
      response_format: { type: 'json_object' },
    });
    
    const responseContent = response.choices[0].message.content;
    if (!responseContent) return [];
    
    const data = JSON.parse(responseContent);
    return data.tags || [];
  } catch (error) {
    console.error('Error generating tags:', error);
    return [];
  }
}

// Generate title
export async function generateTitle(content: string) {
  if (!content || content.length < 50) return null;
  
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that generates concise, descriptive titles for notes. The title should be 5-10 words long and capture the main topic or purpose of the note.'
        },
        {
          role: 'user',
          content: `Generate a title for this note:\n\n${content}`
        }
      ],
      temperature: 0.7,
      max_tokens: 50,
    });
    
    return response.choices[0].message.content?.trim();
  } catch (error) {
    console.error('Error generating title:', error);
    return null;
  }
}

// Implement semantic search
export async function semanticSearch(query: string, limit: number = 10) {
  // Generate embedding for the query
  const embedding = await generateEmbedding(query);
  if (!embedding) return [];
  
  // This would normally use vector similarity search in the database
  // For now, we'll return an empty array as this will be implemented with pgvector
  // eslint-disable-next-line no-console
  console.log(`Will implement search with limit: ${limit}`); // Use limit to avoid linting error
  return [];
}