import { NextRequest, NextResponse } from 'next/server';
import { validateSession } from '@/lib/cosmos/auth';
import { getVideos, createVideo, updateVideo, deleteVideo } from '@/lib/cosmos/cms';
import { Video } from '@/lib/cms/types';

// GET /api/cms/videos - Get all videos or filter by query
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const published = searchParams.get('published');
    const id = searchParams.get('id');

    const filters: any = {};
    if (id) filters.id = id;
    if (category) filters.category = category;
    if (published !== null) filters.published = published === 'true';

    const vids = await getVideos(filters);

    if (id) {
      if (vids.length === 0) {
        return NextResponse.json({ error: 'Video not found' }, { status: 404 });
      }
      return NextResponse.json(vids[0]);
    }

    vids.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    return NextResponse.json(vids);
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/cms/videos - Create new video (requires auth)
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
    const { title, description, url, thumbnail, duration, category, tags, published } = body;

    if (!title || !description || !url || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const created = await createVideo({
      title,
      description,
      url,
      thumbnail,
      duration,
      category,
      tags: tags || [],
      published: published ?? false,
    } as Omit<Video, 'id' | 'createdAt' | 'updatedAt'>);

    if (!created) {
      return NextResponse.json({ error: 'Failed to create video' }, { status: 500 });
    }

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Error creating video:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/cms/videos - Update video (requires auth)
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
      return NextResponse.json({ error: 'Video ID is required' }, { status: 400 });
    }

    const existing = await getVideos({ id });
    if (existing.length === 0) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    const updated = await updateVideo({
      ...(existing[0]),
      ...updates,
      updatedAt: new Date().toISOString(),
    } as Video);

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating video:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/cms/videos - Delete video (requires auth)
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
      return NextResponse.json({ error: 'Video ID is required' }, { status: 400 });
    }

    const existing = await getVideos({ id });
    if (existing.length === 0) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    const success = await deleteVideo(id);
    return NextResponse.json({ success });
  } catch (error) {
    console.error('Error deleting video:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
