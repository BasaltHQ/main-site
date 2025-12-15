import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { validateSession, createUser, getUserByUsername } from '@/lib/cosmos/auth';
import { container, initializeCosmosDB } from '@/lib/cosmos/client';
import { CMSUser } from '@/lib/cms/types';

// Ensure Cosmos DB is initialized before handling requests
let initialized = false;
async function ensureInitialized() {
  if (!initialized) {
    await initializeCosmosDB();
    initialized = true;
  }
}

function forbidden() {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

// GET /api/cms/users - List users (admin only)
export async function GET(request: NextRequest) {
  await ensureInitialized();
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const user = await validateSession(authHeader.replace('Bearer ', ''));
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (user.role !== 'admin') return forbidden();

  try {
    const querySpec = {
      query: 'SELECT c.id, c.username, c.role, c.createdAt FROM c WHERE c.docType = @docType',
      parameters: [{ name: '@docType', value: 'user' }],
    };
    const { resources } = await container.items.query(querySpec).fetchAll();
    return NextResponse.json(resources);
  } catch (error) {
    console.error('List users error:', error);
    return NextResponse.json({ error: 'Failed to list users' }, { status: 500 });
  }
}

// POST /api/cms/users - Create a user (admin only)
export async function POST(request: NextRequest) {
  await ensureInitialized();
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const currentUser = await validateSession(authHeader.replace('Bearer ', ''));
  if (!currentUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (currentUser.role !== 'admin') return forbidden();

  try {
    const body = await request.json();
    const { username, password, role } = body as { username: string; password: string; role?: 'admin' | 'editor' };
    if (!username || !password) {
      return NextResponse.json({ error: 'username and password are required' }, { status: 400 });
    }

    // Prevent duplicate usernames
    const existing = await getUserByUsername(username);
    if (existing) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    const created = await createUser(username, password, role || 'editor');
    if (!created) return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });

    const { passwordHash, ...safe } = created as any;
    return NextResponse.json(safe, { status: 201 });
  } catch (error) {
    console.error('Create user error:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

// PUT /api/cms/users - Update password or role
// Admins can update any user; non-admins can only update their own password
export async function PUT(request: NextRequest) {
  await ensureInitialized();
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const currentUser = await validateSession(authHeader.replace('Bearer ', ''));
  if (!currentUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { id, username, newPassword, role } = body as { id?: string; username?: string; newPassword?: string; role?: 'admin' | 'editor' };

    if (!id && !username) {
      return NextResponse.json({ error: 'Provide user id or username' }, { status: 400 });
    }

    // Resolve user by id or username
    let target: CMSUser | null = null;
    if (id) {
      const { resource } = await container.item(id, 'user').read<CMSUser>();
      target = resource || null;
    } else if (username) {
      target = await getUserByUsername(username);
    }

    if (!target) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    // Permission checks
    const isSelf = currentUser.id === target.id;
    if (!isSelf && currentUser.role !== 'admin') return forbidden();

    const patch: any = { ...target };

    if (newPassword) {
      // Anyone (self or admin) can set new password on this user, respecting the above permission check
      patch.passwordHash = await bcrypt.hash(newPassword, 10);
    }

    if (role) {
      // Only admin can change roles
      if (currentUser.role !== 'admin') return forbidden();
      patch.role = role;
    }

    // Preserve partition key value via docType
    (patch as any).docType = 'user';

    const { resource } = await container.item(patch.id, 'user').replace(patch);
    if (!resource) return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });

    const { passwordHash, ...safe } = resource as any;
    return NextResponse.json(safe);
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

// DELETE /api/cms/users - Delete user (admin only)
export async function DELETE(request: NextRequest) {
  await ensureInitialized();
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const currentUser = await validateSession(authHeader.replace('Bearer ', ''));
  if (!currentUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (currentUser.role !== 'admin') return forbidden();

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const username = searchParams.get('username');
    if (!id && !username) {
      return NextResponse.json({ error: 'Provide user id or username' }, { status: 400 });
    }

    // Find the user
    let targetId = id;
    if (!targetId && username) {
      const userDoc = await getUserByUsername(username);
      if (!userDoc) return NextResponse.json({ error: 'User not found' }, { status: 404 });
      targetId = userDoc.id;
    }

    if (!targetId) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    await container.item(targetId, 'user').delete();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
