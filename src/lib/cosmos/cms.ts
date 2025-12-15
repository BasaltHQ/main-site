import { container } from './client';
import { HelpArticle, Documentation, Video, Career } from '../cms/types';
import { BlogPost } from '../blog/posts';

// Generic helper to query items by type
async function queryItemsByType<T>(type: string, filters?: Record<string, any>): Promise<T[]> {
  try {
    let query = 'SELECT * FROM c WHERE c.docType = @docType';
    const parameters: any[] = [{ name: '@docType', value: type }];

    if (filters) {
      Object.entries(filters).forEach(([key, value], index) => {
        if (value !== undefined && value !== null) {
          query += ` AND c.${key} = @${key}`;
          parameters.push({ name: `@${key}`, value });
        }
      });
    }

    const querySpec = { query, parameters };
    const { resources } = await container.items.query(querySpec).fetchAll();
    return resources;
  } catch (error) {
    console.error(`Error querying ${type}:`, error);
    return [];
  }
}

// Help Articles
export async function getHelpArticles(filters?: {
  id?: string;
  category?: string;
  published?: boolean;
}): Promise<HelpArticle[]> {
  return queryItemsByType<HelpArticle>('help-article', filters);
}

export async function createHelpArticle(article: Omit<HelpArticle, 'id' | 'createdAt' | 'updatedAt'>): Promise<HelpArticle | null> {
  try {
    const id = article.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const newArticle = {
      ...article,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      docType: 'help-article',
    };

    const { resource } = await container.items.create(newArticle);
    return resource || null;
  } catch (error) {
    console.error('Error creating help article:', error);
    return null;
  }
}

export async function updateHelpArticle(article: HelpArticle): Promise<HelpArticle | null> {
  try {
    const updated = {
      ...article,
      updatedAt: new Date().toISOString(),
      docType: 'help-article',
    };

    const { resource } = await container.item(article.id, 'help-article').replace(updated);
    return resource || null;
  } catch (error) {
    console.error('Error updating help article:', error);
    return null;
  }
}

export async function deleteHelpArticle(id: string): Promise<boolean> {
  try {
    await container.item(id, 'help-article').delete();
    return true;
  } catch (error) {
    console.error('Error deleting help article:', error);
    return false;
  }
}

// Documentation
export async function getDocumentation(filters?: {
  id?: string;
  section?: string;
  published?: boolean;
}): Promise<Documentation[]> {
  const docs = await queryItemsByType<Documentation>('documentation', filters);
  return docs.sort((a, b) => a.order - b.order);
}

export async function createDocumentation(doc: Omit<Documentation, 'id' | 'createdAt' | 'updatedAt'>): Promise<Documentation | null> {
  try {
    const id = doc.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const newDoc = {
      ...doc,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      docType: 'documentation',
    };

    const { resource } = await container.items.create(newDoc);
    return resource || null;
  } catch (error) {
    console.error('Error creating documentation:', error);
    return null;
  }
}

export async function updateDocumentation(doc: Documentation): Promise<Documentation | null> {
  try {
    const updated = {
      ...doc,
      updatedAt: new Date().toISOString(),
      docType: 'documentation',
    };

    const { resource } = await container.item(doc.id, 'documentation').replace(updated);
    return resource || null;
  } catch (error) {
    console.error('Error updating documentation:', error);
    return null;
  }
}

export async function deleteDocumentation(id: string): Promise<boolean> {
  try {
    await container.item(id, 'documentation').delete();
    return true;
  } catch (error) {
    console.error('Error deleting documentation:', error);
    return false;
  }
}

// Videos
export async function getVideos(filters?: {
  id?: string;
  category?: string;
  published?: boolean;
}): Promise<Video[]> {
  return queryItemsByType<Video>('video', filters);
}

export async function createVideo(video: Omit<Video, 'id' | 'createdAt' | 'updatedAt'>): Promise<Video | null> {
  try {
    const id = video.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const newVideo = {
      ...video,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      docType: 'video',
    };

    const { resource } = await container.items.create(newVideo);
    return resource || null;
  } catch (error) {
    console.error('Error creating video:', error);
    return null;
  }
}

export async function updateVideo(video: Video): Promise<Video | null> {
  try {
    const updated = {
      ...video,
      updatedAt: new Date().toISOString(),
      docType: 'video',
    };

    const { resource } = await container.item(video.id, 'video').replace(updated);
    return resource || null;
  } catch (error) {
    console.error('Error updating video:', error);
    return null;
  }
}

export async function deleteVideo(id: string): Promise<boolean> {
  try {
    await container.item(id, 'video').delete();
    return true;
  } catch (error) {
    console.error('Error deleting video:', error);
    return false;
  }
}

// Blog Posts
export async function getBlogPosts(filters?: {
  slug?: string;
  tag?: string;
}): Promise<BlogPost[]> {
  try {
    let query = 'SELECT * FROM c WHERE c.docType = @docType';
    const parameters: any[] = [{ name: '@docType', value: 'blog-post' }];

    if (filters?.slug) {
      query += ' AND c.slug = @slug';
      parameters.push({ name: '@slug', value: filters.slug });
    }

    if (filters?.tag) {
      query += ' AND ARRAY_CONTAINS(c.tags, @tag)';
      parameters.push({ name: '@tag', value: filters.tag });
    }

    const querySpec = { query, parameters };
    const { resources } = await container.items.query(querySpec).fetchAll();
    return resources.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error querying blog posts:', error);
    return [];
  }
}

export async function createBlogPost(post: Omit<BlogPost, 'slug'>): Promise<BlogPost | null> {
  try {
    const slug = post.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const newPost = {
      ...post,
      slug,
      id: slug,
      docType: 'blog-post',
    };

    const { resource } = await container.items.create(newPost);
    return resource || null;
  } catch (error) {
    console.error('Error creating blog post:', error);
    return null;
  }
}

export async function updateBlogPost(post: BlogPost): Promise<BlogPost | null> {
  try {
    const updated = {
      ...post,
      id: post.slug,
      docType: 'blog-post',
    };

    const { resource } = await container.item(post.slug, 'blog-post').replace(updated);
    return resource || null;
  } catch (error) {
    console.error('Error updating blog post:', error);
    return null;
  }
}

export async function deleteBlogPost(slug: string): Promise<boolean> {
  try {
    await container.item(slug, 'blog-post').delete();
    return true;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return false;
  }
}

// Careers
export async function getCareers(filters?: {
  id?: string;
  published?: boolean;
}): Promise<Career[]> {
  return queryItemsByType<Career>('career', filters);
}

export async function createCareer(career: Omit<Career, 'id' | 'createdAt' | 'updatedAt'>): Promise<Career | null> {
  try {
    const id = career.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const newCareer = {
      ...career,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      docType: 'career',
    };

    const { resource } = await container.items.create(newCareer);
    if (resource) {
      const { docType, ...careerData } = resource;
      return careerData as Career;
    }
    return null;
  } catch (error) {
    console.error('Error creating career:', error);
    return null;
  }
}

export async function updateCareer(career: Career): Promise<Career | null> {
  try {
    const updated = {
      ...career,
      updatedAt: new Date().toISOString(),
      docType: 'career',
    };

    const { resource } = await container.item(career.id, 'career').replace(updated);
    if (resource) {
      const { docType, ...careerData } = resource;
      return careerData as Career;
    }
    return null;
  } catch (error) {
    console.error('Error updating career:', error);
    return null;
  }
}

export async function deleteCareer(id: string): Promise<boolean> {
  try {
    await container.item(id, 'career').delete();
    return true;
  } catch (error) {
    console.error('Error deleting career:', error);
    return false;
  }
}
