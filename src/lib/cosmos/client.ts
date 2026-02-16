import { CosmosClient, Database, Container } from '@azure/cosmos';

let client: CosmosClient | null = null;
let database: Database | null = null;
let container: Container | null = null;

export function getClient(): CosmosClient {
  if (!client) {
    if (!process.env.COSMOS_CONNECTION_STRING) {
      throw new Error('COSMOS_CONNECTION_STRING is not defined in environment variables');
    }
    client = new CosmosClient(process.env.COSMOS_CONNECTION_STRING);
  }
  return client;
}

export function getContainer(): Container {
  if (!container) {
    const dbId = process.env.COSMOS_DB_ID;
    const containerId = process.env.COSMOS_CONTAINER_ID;

    if (!dbId) {
      throw new Error('COSMOS_DB_ID is not defined in environment variables');
    }
    if (!containerId) {
      throw new Error('COSMOS_CONTAINER_ID is not defined in environment variables');
    }

    const dbClient = getClient();
    database = dbClient.database(dbId);
    container = database.container(containerId);
  }
  return container;
}

// Initialize database and container (will create if they don't exist)
export async function initializeCosmosDB() {
  try {
    const dbId = process.env.COSMOS_DB_ID;
    const containerId = process.env.COSMOS_CONTAINER_ID;

    if (!dbId || !containerId) {
      throw new Error('Database or Container ID missing in environment variables');
    }

    // Create database if it doesn't exist
    const { database: db } = await getClient().databases.createIfNotExists({
      id: dbId,
    });

    // Create container if it doesn't exist
    await db.containers.createIfNotExists({
      id: containerId,
      partitionKey: { paths: ['/docType'] },
    });

    console.log('Cosmos DB initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing Cosmos DB:', error);
    return false;
  }
}

// Temporary export to maintain backward compatibility during refactor, but throwing error on access if not initialized specific way is hard.
// Instead, we will remove exports for client, database, container and force usage of getters.

