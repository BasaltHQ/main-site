import { NextRequest, NextResponse } from 'next/server';
import { validateSession } from '@/lib/cosmos/auth';
import { getHelpArticles, createHelpArticle, updateHelpArticle, deleteHelpArticle } from '@/lib/cosmos/cms';
import { HelpArticle } from '@/lib/cms/types';

// GET /api/cms/help - Get all help articles or filter by query
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const published = searchParams.get('published');
    const id = searchParams.get('id');

    // Build filters for Cosmos
    const filters: any = {};
    if (id) filters.id = id;
    if (category) filters.category = category;
    if (published !== null) filters.published = published === 'true';

    const articles = await getHelpArticles(filters);

    if (id) {
      if (articles.length === 0) {
        return NextResponse.json({ error: 'Article not found' }, { status: 404 });
      }
      return NextResponse.json(articles[0]);
    }

    // Sort by most recent
    articles.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching help articles:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/cms/help - Create new help article (requires auth)
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
    const { title, description, category, content, videoUrl, videoThumbnail, tags, published } = body;

    if (!title || !description || !category || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const created = await createHelpArticle({
      title,
      description,
      category,
      content,
      videoUrl,
      videoThumbnail,
      tags: tags || [],
      published: published ?? false,
    } as Omit<HelpArticle, 'id' | 'createdAt' | 'updatedAt'>);

    if (!created) {
      return NextResponse.json({ error: 'Failed to create help article' }, { status: 500 });
    }

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Error creating help article:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/cms/help - Update help article (requires auth)
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
      return NextResponse.json({ error: 'Article ID is required' }, { status: 400 });
    }

    const existing = await getHelpArticles({ id });
    if (existing.length === 0) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    const updated = await updateHelpArticle({
      ...(existing[0]),
      ...updates,
      updatedAt: new Date().toISOString(),
    } as HelpArticle);

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating help article:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/cms/help - Delete help article (requires auth)
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
      return NextResponse.json({ error: 'Article ID is required' }, { status: 400 });
    }

    const existing = await getHelpArticles({ id });
    if (existing.length === 0) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    const success = await deleteHelpArticle(id);
    return NextResponse.json({ success });
  } catch (error) {
    console.error('Error deleting help article:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
