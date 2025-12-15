// CMS Data Types

export type HelpArticle = {
  id: string;
  title: string;
  description: string;
  category: string;
  content: string;
  videoUrl?: string;
  videoThumbnail?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  published: boolean;
};

export type Documentation = {
  id: string;
  title: string;
  description: string;
  section: string; // 'getting-started' | 'api' | 'user-guide' | 'integrations'
  content: string;
  order: number;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  published: boolean;
};

export type Video = {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail?: string;
  duration?: string;
  category: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  published: boolean;
};

export type Career = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  description: string;
  responsibilities: string;
  qualifications: string;
  benefits?: string;
  salaryRange?: string;
  applyUrl?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  published: boolean;
};

export type CMSUser = {
  id: string;
  username: string;
  passwordHash: string;
  role: 'admin' | 'editor';
  createdAt: string;
};

export type CMSSession = {
  token: string;
  userId: string;
  expiresAt: string;
};
