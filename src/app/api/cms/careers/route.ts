import { NextRequest, NextResponse } from 'next/server';
import { validateSession } from '@/lib/cosmos/auth';
import {
  getCareers,
  createCareer,
  updateCareer,
  deleteCareer,
} from '@/lib/cosmos/cms';

// GET /api/cms/careers - Get all careers or a specific career
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const published = searchParams.get('published');

    // If requesting unpublished or no published flag, require auth
    const requiresAuth = !published || published !== 'true';
    if (requiresAuth) {
      const authHeader = request.headers.get('authorization');
      if (!authHeader || !(await validateSession(authHeader.replace('Bearer ', '')))) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const filters: any = {};
    if (id) filters.id = id;
    if (published) filters.published = published === 'true';

    const careers = await getCareers(filters);

    if (id && careers.length === 0) {
      return NextResponse.json({ error: 'Career not found' }, { status: 404 });
    }

    return NextResponse.json(id ? careers[0] : careers);
  } catch (error) {
    console.error('Error fetching careers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch careers' },
      { status: 500 }
    );
  }
}

// POST /api/cms/careers - Create a new career
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !(await validateSession(authHeader.replace('Bearer ', '')))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const career = await createCareer(data);

    if (!career) {
      return NextResponse.json(
        { error: 'Failed to create career' },
        { status: 500 }
      );
    }

    return NextResponse.json(career, { status: 201 });
  } catch (error) {
    console.error('Error creating career:', error);
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    );
  }
}

// PUT /api/cms/careers - Update a career
export async function PUT(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !(await validateSession(authHeader.replace('Bearer ', '')))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const career = await updateCareer(data);

    if (!career) {
      return NextResponse.json({ error: 'Career not found' }, { status: 404 });
    }

    return NextResponse.json(career);
  } catch (error) {
    console.error('Error updating career:', error);
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    );
  }
}

// DELETE /api/cms/careers - Delete a career
export async function DELETE(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !(await validateSession(authHeader.replace('Bearer ', '')))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Career ID required' },
        { status: 400 }
      );
    }

    const success = await deleteCareer(id);
    if (!success) {
      return NextResponse.json({ error: 'Career not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting career:', error);
    return NextResponse.json(
      { error: 'Failed to delete career' },
      { status: 500 }
    );
  }
}
