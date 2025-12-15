import { NextRequest, NextResponse } from 'next/server';
import {
  validateCredentials,
  createSession,
  validateSession,
  deleteSession,
  initializeDefaultUser,
} from '@/lib/cosmos/auth';
import { initializeCosmosDB } from '@/lib/cosmos/client';

// Initialize on first request
let initialized = false;

async function ensureInitialized() {
  if (!initialized) {
    await initializeCosmosDB();
    await initializeDefaultUser();
    initialized = true;
  }
}

// POST /api/cms/auth - Login or logout
export async function POST(request: NextRequest) {
  await ensureInitialized();

  try {
    const body = await request.json();
    const { action, username, password } = body;

    // Logout
    if (action === 'logout') {
      const authHeader = request.headers.get('authorization');
      if (authHeader) {
        const token = authHeader.replace('Bearer ', '');
        await deleteSession(token);
      }
      return NextResponse.json({ success: true });
    }

    // Login
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password required' },
        { status: 400 }
      );
    }

    const user = await validateCredentials(username, password);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = await createSession(user.id);
    if (!token) {
      return NextResponse.json(
        { error: 'Failed to create session' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

// GET /api/cms/auth - Validate session
export async function GET(request: NextRequest) {
  await ensureInitialized();

  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.replace('Bearer ', '');
  const user = await validateSession(token);

  if (!user) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
  }

  return NextResponse.json({
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
    },
  });
}
