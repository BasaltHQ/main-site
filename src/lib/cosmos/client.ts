import { CosmosClient, Database, Container } from '@azure/cosmos';

if (!process.env.COSMOS_CONNECTION_STRING) {
  throw new Error('COSMOS_CONNECTION_STRING is not defined in environment variables');
}

if (!process.env.COSMOS_DB_ID) {
  throw new Error('COSMOS_DB_ID is not defined in environment variables');
}

if (!process.env.COSMOS_CONTAINER_ID) {
  throw new Error('COSMOS_CONTAINER_ID is not defined in environment variables');
}

// Initialize Cosmos client
const client = new CosmosClient(process.env.COSMOS_CONNECTION_STRING);

// Get database and container references
const database: Database = client.database(process.env.COSMOS_DB_ID);
const container: Container = database.container(process.env.COSMOS_CONTAINER_ID);

// Initialize database and container (will create if they don't exist)
export async function initializeCosmosDB() {
  try {
    // Create database if it doesn't exist
    const { database: db } = await client.databases.createIfNotExists({
      id: process.env.COSMOS_DB_ID!,
    });

    // Create container if it doesn't exist
    await db.containers.createIfNotExists({
      id: process.env.COSMOS_CONTAINER_ID!,
      partitionKey: { paths: ['/docType'] },
    });

    console.log('Cosmos DB initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing Cosmos DB:', error);
    return false;
  }
}

export { client, database, container };
