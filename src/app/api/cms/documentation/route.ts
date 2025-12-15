import { NextRequest, NextResponse } from 'next/server';
import { validateSession } from '@/lib/cosmos/auth';
import { getDocumentation, createDocumentation, updateDocumentation, deleteDocumentation } from '@/lib/cosmos/cms';
import { Documentation } from '@/lib/cms/types';

// GET /api/cms/documentation - Get all documentation or filter by query
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');
    const published = searchParams.get('published');
    const id = searchParams.get('id');

    const filters: any = {};
    if (id) filters.id = id;
    if (section) filters.section = section;
    if (published !== null) filters.published = published === 'true';

    const docs = await getDocumentation(filters);

    if (id) {
      if (docs.length === 0) {
        return NextResponse.json({ error: 'Documentation not found' }, { status: 404 });
      }
      return NextResponse.json(docs[0]);
    }

    // Sort by order, then by most recent
    docs.sort((a, b) => {
      if (a.order !== b.order) {
        return a.order - b.order;
      }
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return NextResponse.json(docs);
  } catch (error) {
    console.error('Error fetching documentation:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/cms/documentation - Create new documentation (requires auth)
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await validateSession(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, section, content, order, tags, published } = body;

    if (!title || !description || !section || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const created = await createDocumentation({
      title,
      description,
      section,
      content,
      order: order ?? 999,
      tags: tags || [],
      published: published ?? false,
    } as Omit<Documentation, 'id' | 'createdAt' | 'updatedAt'>);

    if (!created) {
      return NextResponse.json({ error: 'Failed to create documentation' }, { status: 500 });
    }

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Error creating documentation:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/cms/documentation - Update documentation (requires auth)
export async function PUT(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await validateSession(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Documentation ID is required' }, { status: 400 });
    }

    const existing = await getDocumentation({ id });
    if (existing.length === 0) {
      return NextResponse.json({ error: 'Documentation not found' }, { status: 404 });
    }

    const updated = await updateDocumentation({
      ...(existing[0]),
      ...updates,
      updatedAt: new Date().toISOString(),
    } as Documentation);

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating documentation:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/cms/documentation - Delete documentation (requires auth)
export async function DELETE(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await validateSession(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Documentation ID is required' }, { status: 400 });
    }

    const existing = await getDocumentation({ id });
    if (existing.length === 0) {
      return NextResponse.json({ error: 'Documentation not found' }, { status: 404 });
    }

    const success = await deleteDocumentation(id);
    return NextResponse.json({ success });
  } catch (error) {
    console.error('Error deleting documentation:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
