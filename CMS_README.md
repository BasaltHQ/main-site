# Ledger1 CMS Documentation

## Overview

The Ledger1 website now includes a fully functional Content Management System (CMS) integrated directly into the web application. This allows authorized users to manage help articles, documentation, videos, and blog posts without editing code.

## Features

### 1. Enhanced Help Center (`/help`)
- **Category Filtering**: Filter articles by category (Getting Started, Integrations, Operations, etc.)
- **Video Support**: Each article can include an embedded YouTube video
- **Expandable Content**: Articles display with a summary and expandable full content
- **Tags**: Articles are tagged for better organization
- **Responsive Design**: Works seamlessly on mobile and desktop

### 2. Enhanced Documentation (`/docs`)
- **Search Functionality**: Search across all documentation content
- **Section Filtering**: Filter by section (API, User Guide, Integrations, etc.)
- **Organized Display**: Documentation sorted by order and section
- **Quick Links**: Easy navigation to related resources

### 3. CMS Dashboard (`/cms/dashboard`)
- **Multi-Tab Interface**: Manage Help Articles, Documentation, Videos, and Blog Posts
- **CRUD Operations**: Create, Read, Update, and Delete content
- **Draft/Published Status**: Control content visibility
- **Authentication**: Secure login required

## Getting Started

### Accessing the CMS

1. Navigate to `/cms/login`
2. Use the demo credentials:
   - **Username**: `admin`
   - **Password**: `admin123`
3. You'll be redirected to the dashboard at `/cms/dashboard`

### CMS Dashboard Navigation

The dashboard has 4 main tabs:
- **Help Articles**: Manage help center content with video support
- **Documentation**: Manage technical documentation
- **Videos**: Manage video library
- **Blog Posts**: Manage blog content

Each tab displays:
- List of all items with status (Published/Draft)
- Category/Section tags
- Edit and Delete buttons
- Add New button to create content

## API Endpoints

### Authentication
- `POST /api/cms/auth` - Login
- `GET /api/cms/auth` - Validate session
- `POST /api/cms/auth` (with action: logout) - Logout

### Help Articles
- `GET /api/cms/help` - Get all help articles
  - Query params: `?category=X&published=true&id=X`
- `POST /api/cms/help` - Create new article (requires auth)
- `PUT /api/cms/help` - Update article (requires auth)
- `DELETE /api/cms/help?id=X` - Delete article (requires auth)

### Documentation
- `GET /api/cms/documentation` - Get all documentation
  - Query params: `?section=X&published=true&id=X`
- `POST /api/cms/documentation` - Create new doc (requires auth)
- `PUT /api/cms/documentation` - Update doc (requires auth)
- `DELETE /api/cms/documentation?id=X` - Delete doc (requires auth)

### Videos
- `GET /api/cms/videos` - Get all videos
  - Query params: `?category=X&published=true&id=X`
- `POST /api/cms/videos` - Create new video (requires auth)
- `PUT /api/cms/videos` - Update video (requires auth)
- `DELETE /api/cms/videos?id=X` - Delete video (requires auth)

### Blog Posts
- `GET /api/cms/blog` - Get all blog posts
  - Query params: `?tag=X&slug=X`
- `POST /api/cms/blog` - Create new post (requires auth)
- `PUT /api/cms/blog` - Update post (requires auth)
- `DELETE /api/cms/blog?slug=X` - Delete post (requires auth)

## Data Structure

### Help Article
```typescript
{
  id: string;
  title: string;
  description: string;
  category: string;
  content: string;
  videoUrl?: string;          // YouTube embed URL
  videoThumbnail?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  published: boolean;
}
```

### Documentation
```typescript
{
  id: string;
  title: string;
  description: string;
  section: string;            // 'api' | 'user-guide' | etc.
  content: string;
  order: number;              // Display order
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  published: boolean;
}
```

### Video
```typescript
{
  id: string;
  title: string;
  description: string;
  url: string;                // YouTube embed URL
  thumbnail?: string;
  duration?: string;          // e.g., "5:32"
  category: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  published: boolean;
}
```

### Blog Post
```typescript
{
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;               // ISO date
  author?: string;
  tags?: string[];
  coverImage?: string;
}
```

## Sample Content

The system comes pre-loaded with:
- **3 Help Articles** with embedded videos covering:
  - Getting Started with Ledger1
  - Integrating Your POS System
  - Daily Reconciliation Process
  
- **3 Documentation Pages**:
  - API Overview
  - GraphQL Schema
  - Webhooks
  
- **3 Videos**:
  - Platform Overview
  - POS Integration Demo
  - Reporting Dashboard

- **5 Blog Posts** covering various technical topics

## Security Notes

**IMPORTANT**: This is a demo implementation with the following limitations:

1. **Authentication**: Uses simple token-based auth stored in localStorage
2. **Password**: Demo password check (not production-ready)
3. **Data Storage**: In-memory storage (resets on server restart)
4. **No Session Persistence**: Sessions are stored in memory

### For Production Use:
- Implement proper password hashing (bcrypt/argon2)
- Use a real database (PostgreSQL, MongoDB, etc.)
- Implement proper session management (Redis, database sessions)
- Add HTTPS-only cookies for auth tokens
- Implement CSRF protection
- Add rate limiting
- Add input validation and sanitization
- Implement role-based access control (RBAC)
- Add audit logging

## Development

### File Structure
```
src/
├── app/
│   ├── cms/
│   │   ├── login/page.tsx          # CMS login page
│   │   └── dashboard/page.tsx      # CMS dashboard
│   ├── help/page.tsx                # Public help center
│   ├── docs/page.tsx                # Public documentation
│   └── api/
│       └── cms/
│           ├── auth/route.ts        # Authentication API
│           ├── help/route.ts        # Help articles API
│           ├── documentation/route.ts
│           ├── videos/route.ts
│           └── blog/route.ts
└── lib/
    └── cms/
        ├── types.ts                 # TypeScript types
        ├── data.ts                  # Sample data
        └── auth.ts                  # Auth utilities
```

### Running the Application

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Visit the application
# Help Center: http://localhost:3000/help
# Documentation: http://localhost:3000/docs
# CMS Login: http://localhost:3000/cms/login
```

## Working with the CMS

### Adding New Content

1. **Login** to the CMS at `/cms/login`
2. **Select a tab** (Help Articles, Documentation, Videos, or Blog Posts)
3. **Click "Add New"** button
4. **Fill out the form** with all required fields (marked with *)
5. **Toggle "Published"** checkbox to make content visible to users
6. **Click "Save"** to create the content

### Editing Content

1. Find the content item in the list
2. Click the **"Edit"** button
3. Modify the form fields
4. Click **"Save"** to update

### Deleting Content

1. Find the content item in the list
2. Click the **"Delete"** button
3. Confirm the deletion

### Draft vs Published

- **Draft** content is only visible in the CMS dashboard
- **Published** content appears on the public website
- Use drafts to prepare content before making it live

## Form Fields Guide

### Help Article Form
- **Title**: Main heading (required)
- **Description**: Brief summary (required)
- **Category**: Grouping label like "Getting Started" (required)
- **Content**: Full article text with Markdown support (required)
- **Video URL**: YouTube embed URL (optional)
- **Video Thumbnail**: Image URL for video preview (optional)
- **Tags**: Comma-separated keywords (optional)
- **Published**: Toggle visibility (checkbox)

### Documentation Form
- **Title**: Document heading (required)
- **Description**: Brief summary (required)
- **Section**: Category like "api" or "user-guide" (required)
- **Content**: Full documentation with Markdown (required)
- **Display Order**: Number for sorting (lower = first)
- **Tags**: Comma-separated keywords (optional)
- **Published**: Toggle visibility (checkbox)

### Video Form
- **Title**: Video name (required)
- **Description**: Video summary (required)
- **Video URL**: YouTube embed URL (required)
- **Thumbnail**: Preview image URL (optional)
- **Duration**: Time in MM:SS format (optional)
- **Category**: Grouping like "Tutorials" (required)
- **Tags**: Comma-separated keywords (optional)
- **Published**: Toggle visibility (checkbox)

### Blog Post Form
- **Title**: Post headline (required) - slug auto-generated
- **Description**: Post summary (required)
- **Content**: Full post text with Markdown (required)
- **Author**: Writer name (defaults to "Ledger1 Team")
- **Cover Image**: Header image URL (optional)
- **Tags**: Comma-separated keywords (optional)

## Future Enhancements

Potential improvements for a production system:
1. Rich text editor (e.g., TipTap, Slate)
2. Image upload and management
3. Content versioning and history
4. Content scheduling (publish at specific date/time)
5. Multi-language support
6. SEO meta fields management
7. Content preview before publishing
8. Full-text search with Elasticsearch
9. Content analytics and tracking
10. Collaborative editing with real-time updates

## Support

For questions or issues with the CMS:
1. Check the API documentation above
2. Review the sample data in `src/lib/cms/data.ts`
3. Inspect browser console for errors
4. Check network tab for API responses

## License

This CMS is part of the Ledger1 website and follows the same license terms.
