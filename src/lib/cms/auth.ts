// CMS Authentication Utilities
// Simple authentication for demo purposes
// In production, use a proper authentication library

import { cmsUsers, sessions } from './data';
import { CMSUser, CMSSession } from './types';

// Simple password check (in production, use bcrypt or similar)
export function verifyPassword(plain: string, hash: string): boolean {
  // For demo purposes, we'll just check if it matches "admin123"
  return plain === 'admin123' && hash === '$2a$10$rGqhK9dDC2p7RLqN9Ib3P.VB4nXuQZLfPqXZH0ViEzF5iFwQ8XJ3K';
}

// Generate a simple session token
export function generateToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Create a session
export function createSession(userId: string): CMSSession {
  const token = generateToken();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours
  
  sessions.set(token, { userId, expiresAt });
  
  return { token, userId, expiresAt };
}

// Validate a session
export function validateSession(token: string): { valid: boolean; userId?: string; user?: CMSUser } {
  const session = sessions.get(token);
  
  if (!session) {
    return { valid: false };
  }
  
  const now = new Date();
  const expiresAt = new Date(session.expiresAt);
  
  if (now > expiresAt) {
    sessions.delete(token);
    return { valid: false };
  }
  
  const user = cmsUsers.find(u => u.id === session.userId);
  
  if (!user) {
    return { valid: false };
  }
  
  return { valid: true, userId: session.userId, user };
}

// Authenticate user
export function authenticateUser(username: string, password: string): { success: boolean; session?: CMSSession; user?: CMSUser } {
  const user = cmsUsers.find(u => u.username === username);
  
  if (!user) {
    return { success: false };
  }
  
  if (!verifyPassword(password, user.passwordHash)) {
    return { success: false };
  }
  
  const session = createSession(user.id);
  
  return { success: true, session, user };
}

// Logout
export function logout(token: string): void {
  sessions.delete(token);
}

// Check if user is admin
export function isAdmin(user: CMSUser): boolean {
  return user.role === 'admin';
}
