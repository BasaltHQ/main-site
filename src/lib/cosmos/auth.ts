import bcrypt from 'bcryptjs';
import { getContainer } from './client';
import { CMSUser, CMSSession } from '../cms/types';

// Helper to generate secure tokens
function generateToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Get user by username
export async function getUserByUsername(username: string): Promise<CMSUser | null> {
  try {
    const querySpec = {
      query: 'SELECT * FROM c WHERE c.docType = @docType AND c.username = @username',
      parameters: [
        { name: '@docType', value: 'user' },
        { name: '@username', value: username },
      ],
    };

    const { resources } = await getContainer().items.query(querySpec).fetchAll();
    return resources.length > 0 ? resources[0] : null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}

// Create a new user
export async function createUser(
  username: string,
  password: string,
  role: 'admin' | 'editor' = 'editor'
): Promise<CMSUser | null> {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const user: CMSUser & { docType: string } = {
      id: `user-${Date.now()}`,
      username,
      passwordHash,
      role,
      createdAt: new Date().toISOString(),
      docType: 'user',
    };

    const { resource } = await getContainer().items.create(user);
    return resource || null;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}

// Validate user credentials
export async function validateCredentials(
  username: string,
  password: string
): Promise<CMSUser | null> {
  const user = await getUserByUsername(username);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.passwordHash);
  return isValid ? user : null;
}

// Create a session
export async function createSession(userId: string): Promise<string | null> {
  try {
    const token = generateToken();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours

    const session = {
      id: `session-${token}`,
      token,
      userId,
      expiresAt,
      docType: 'session',
    };

    await getContainer().items.create(session);
    return token;
  } catch (error) {
    console.error('Error creating session:', error);
    return null;
  }
}

// Validate a session token
export async function validateSession(token: string): Promise<CMSUser | null> {
  try {
    const querySpec = {
      query: 'SELECT * FROM c WHERE c.docType = @docType AND c.token = @token',
      parameters: [
        { name: '@docType', value: 'session' },
        { name: '@token', value: token },
      ],
    };

    const { resources: sessions } = await container.items.query(querySpec).fetchAll();
    if (sessions.length === 0) return null;

    const session = sessions[0];

    // Check if session is expired
    if (new Date(session.expiresAt) < new Date()) {
      // Delete expired session
      await getContainer().item(session.id, 'session').delete();
      return null;
    }

    // Get user
    const user = await getUserById(session.userId);
    return user;
  } catch (error) {
    console.error('Error validating session:', error);
    return null;
  }
}

// Get user by ID
async function getUserById(userId: string): Promise<CMSUser | null> {
  try {
    const { resource } = await getContainer().item(userId, 'user').read();
    return resource || null;
  } catch (error) {
    console.error('Error getting user by ID:', error);
    return null;
  }
}

// Delete a session (logout)
export async function deleteSession(token: string): Promise<boolean> {
  try {
    const querySpec = {
      query: 'SELECT * FROM c WHERE c.docType = @docType AND c.token = @token',
      parameters: [
        { name: '@docType', value: 'session' },
        { name: '@token', value: token },
      ],
    };

    const { resources: sessions } = await container.items.query(querySpec).fetchAll();
    if (sessions.length === 0) return false;

    await getContainer().item(sessions[0].id, 'session').delete();
    return true;
  } catch (error) {
    console.error('Error deleting session:', error);
    return false;
  }
}

// Initialize default admin user if no users exist
export async function initializeDefaultUser(): Promise<void> {
  try {
    // Only create the demo admin user if explicitly enabled via env var
    const enableDemo = process.env.CMS_ENABLE_DEMO_LOGIN === 'true';
    if (!enableDemo) {
      return;
    }

    const querySpec = {
      query: 'SELECT * FROM c WHERE c.docType = @docType',
      parameters: [{ name: '@docType', value: 'user' }],
    };

    const { resources } = await getContainer().items.query(querySpec).fetchAll();

    if (resources.length === 0) {
      // Create default admin user
      await createUser('admin', 'admin123', 'admin');
      console.log('Default admin user created');
    }
  } catch (error) {
    console.error('Error initializing default user:', error);
  }
}
