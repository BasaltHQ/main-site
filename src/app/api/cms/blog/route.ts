import { NextRequest, NextResponse } from 'next/server';
import { validateSession } from '@/lib/cosmos/auth';
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from '@/lib/cosmos/cms';
import { BlogPost } from '@/lib/blog/posts';

// GET /api/cms/blog - Get all blog posts or filter by query
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const tag = searchParams.get('tag');

    const filters: any = {};
    if (slug) filters.slug = slug;
    if (tag) filters.tag = tag;

    const list = await getBlogPosts(filters);

    if (slug) {
      if (list.length === 0) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      return NextResponse.json(list[0]);
    }

    return NextResponse.json(list);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/cms/blog - Create new blog post (requires auth)
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
    const { title, description, content, author, tags, coverImage } = body;

    if (!title || !description || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const created = await createBlogPost({
      title,
      description,
      content,
      date: new Date().toISOString().split('T')[0],
      author: author || 'Ledger1 Team',
      tags: tags || [],
      coverImage,
    });

    if (!created) {
      return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
    }

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/cms/blog - Update blog post (requires auth)
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
    const { slug, ...updates } = body;

    if (!slug) {
      return NextResponse.json({ error: 'Post slug is required' }, { status: 400 });
    }

    const existing = await getBlogPosts({ slug });
    if (existing.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const updated = await updateBlogPost({
      ...(existing[0]),
      ...updates,
    } as BlogPost);

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/cms/blog - Delete blog post (requires auth)
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
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Post slug is required' }, { status: 400 });
    }

    const existing = await getBlogPosts({ slug });
    if (existing.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const success = await deleteBlogPost(slug);
    return NextResponse.json({ success });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
