import { NextRequest, NextResponse } from 'next/server';
import { validateSession } from '@/lib/cosmos/auth';
import { initializeCosmosDB, container } from '@/lib/cosmos/client';
import { helpArticles, documentation, videos, careers } from '@/lib/cms/data';
import { posts } from '@/lib/blog/posts';

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await validateSession(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await initializeCosmosDB();

    let helpSeeded = 0;
    let docsSeeded = 0;
    let videosSeeded = 0;
    let careersSeeded = 0;
    let blogSeeded = 0;

    // Seed Help Articles
    for (const item of helpArticles) {
      try {
        // Upsert using existing ID and docType to avoid duplicates
        await container.items.upsert({ ...item, docType: 'help-article' });
        helpSeeded++;
      } catch (e) {
        console.error('Help seed error:', e);
      }
    }

    // Seed Documentation
    for (const item of documentation) {
      try {
        await container.items.upsert({ ...item, docType: 'documentation' });
        docsSeeded++;
      } catch (e) {
        console.error('Docs seed error:', e);
      }
    }

    // Seed Videos
    for (const item of videos) {
      try {
        await container.items.upsert({ ...item, docType: 'video' });
        videosSeeded++;
      } catch (e) {
        console.error('Videos seed error:', e);
      }
    }

    // Seed Careers
    for (const item of careers) {
      try {
        await container.items.upsert({ ...item, docType: 'career' });
        careersSeeded++;
      } catch (e) {
        console.error('Careers seed error:', e);
      }
    }

    // Seed Blog Posts (use slug as id)
    for (const post of posts) {
      try {
        await container.items.upsert({ id: post.slug, ...post, docType: 'blog-post' });
        blogSeeded++;
      } catch (e) {
        console.error('Blog seed error:', e);
      }
    }

    return NextResponse.json({
      success: true,
      helpSeeded,
      docsSeeded,
      videosSeeded,
      careersSeeded,
      blogSeeded,
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Failed to seed data' }, { status: 500 });
  }
}
