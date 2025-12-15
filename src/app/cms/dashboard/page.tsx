"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HelpArticle, Documentation, Video, Career } from "@/lib/cms/types";
import { BlogPost } from "@/lib/blog/posts";
import { HelpArticleForm } from "@/components/cms/HelpArticleForm";
import { DocumentationForm } from "@/components/cms/DocumentationForm";
import { VideoForm } from "@/components/cms/VideoForm";
import { BlogPostForm } from "@/components/cms/BlogPostForm";
import { CareerForm } from "@/components/cms/CareerForm";
import UserForm, { UserModel, UserFormMode } from "@/components/cms/UserForm";

export default function CMSDashboard() {
  const [activeTab, setActiveTab] = useState<'help' | 'docs' | 'videos' | 'blog' | 'careers' | 'users'>('help');
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string>("");
  const router = useRouter();

  // Data states
  const [helpArticles, setHelpArticles] = useState<HelpArticle[]>([]);
  const [docs, setDocs] = useState<Documentation[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [careers, setCareers] = useState<Career[]>([]);
  const [users, setUsers] = useState<UserModel[]>([]);

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    // Check authentication
    const storedToken = localStorage.getItem('cms_token');
    const storedUser = localStorage.getItem('cms_user');

    if (!storedToken || !storedUser) {
      router.push('/cms/login');
      return;
    }

    setToken(storedToken);
    setUser(JSON.parse(storedUser));

    // Load data
    fetchData();
  }, [router]);

  const fetchData = async () => {
    const storedToken = localStorage.getItem('cms_token');
    if (!storedToken) return;

    try {
      const authHeaders = { headers: { 'Authorization': `Bearer ${storedToken}` } };
      const [helpRes, docsRes, videosRes, blogRes, careersRes] = await Promise.all([
        fetch('/api/cms/help', authHeaders),
        fetch('/api/cms/documentation', authHeaders),
        fetch('/api/cms/videos', authHeaders),
        fetch('/api/cms/blog', authHeaders),
        fetch('/api/cms/careers', authHeaders),
      ]);

      setHelpArticles(await helpRes.json());
      setDocs(await docsRes.json());
      setVideos(await videosRes.json());
      setBlogPosts(await blogRes.json());
      setCareers(await careersRes.json());

      // Fetch users only if admin
      const storedUserJson = localStorage.getItem('cms_user');
      const isAdmin = storedUserJson ? JSON.parse(storedUserJson).role === 'admin' : false;
      if (isAdmin) {
        const usersRes = await fetch('/api/cms/users', authHeaders);
        if (usersRes.ok) {
          setUsers(await usersRes.json());
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/cms/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ action: 'logout' }),
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('cms_token');
      localStorage.removeItem('cms_user');
      router.push('/cms/login');
    }
  };

  const handleDelete = async (type: string, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      let endpoint = '';
      if (type === 'users') {
        endpoint = `/api/cms/users?username=${encodeURIComponent(id)}`; // id carries username for users
      } else {
        endpoint = `/api/cms/${type}?${type === 'blog' ? 'slug' : 'id'}=${id}`;
      }
      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleSave = async (type: string, data: any) => {
    try {
      // For users, check the mode property; for other types check if editingItem has an id/slug
      const isEditing = type === 'users' 
        ? editingItem?.mode === 'edit' 
        : editingItem && (editingItem.id || editingItem.slug);
      const method = isEditing ? 'PUT' : 'POST';
      let url = `/api/cms/${type}`;
      if (type === 'users') url = '/api/cms/users';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setShowForm(false);
        setEditingItem(null);
        fetchData();
      }
    } catch (error) {
      console.error('Save error:', error);
    }
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">CMS Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome, {user.username}</p>
          </div>
          <div className="flex gap-4">
            <a 
              href="/" 
              className="px-4 py-2 text-sm rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              View Site
            </a>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-border bg-background/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-4">
            {(() => {
              const baseTabs = [
                { id: 'help', label: 'Help Articles', count: helpArticles.length },
                { id: 'docs', label: 'Documentation', count: docs.length },
                { id: 'videos', label: 'Videos', count: videos.length },
                { id: 'blog', label: 'Blog Posts', count: blogPosts.length },
                { id: 'careers', label: 'Careers', count: careers.length },
              ];
              const tabs = isAdmin ? [...baseTabs, { id: 'users', label: 'Users', count: users.length }] : baseTabs;
              return tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                    activeTab === (tab.id as any)
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ));
            })()}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            {activeTab === 'help' && 'Help Articles'}
            {activeTab === 'docs' && 'Documentation'}
            {activeTab === 'videos' && 'Videos'}
            {activeTab === 'blog' && 'Blog Posts'}
            {activeTab === 'careers' && 'Career Listings'}
            {activeTab === 'users' && 'Users'}
          </h2>
          {activeTab !== 'users' ? (
            <button
              onClick={() => {
                setEditingItem(null);
                setShowForm(true);
              }}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              + Add New
            </button>
          ) : isAdmin ? (
            <button
              onClick={() => {
                setEditingItem({ mode: 'create' });
                setShowForm(true);
              }}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              + Create User
            </button>
          ) : null}
        </div>

        {/* Help Articles */}
        {activeTab === 'help' && (
          <div className="grid gap-4">
            {helpArticles.map((article) => (
              <div key={article.id} className="glass-pane rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold">{article.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded ${article.published ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                        {article.published ? 'Published' : 'Draft'}
                      </span>
                      <span className="text-xs px-2 py-1 rounded bg-primary/20 text-primary">
                        {article.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{article.description}</p>
                    {article.videoUrl && (
                      <p className="text-xs text-muted-foreground">📹 Has video</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingItem(article);
                        setShowForm(true);
                      }}
                      className="px-3 py-1 text-sm rounded bg-primary/20 text-primary hover:bg-primary/30"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete('help', article.id)}
                      className="px-3 py-1 text-sm rounded bg-destructive/20 text-destructive hover:bg-destructive/30"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Documentation */}
        {activeTab === 'docs' && (
          <div className="grid gap-4">
            {docs.map((doc) => (
              <div key={doc.id} className="glass-pane rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold">{doc.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded ${doc.published ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                        {doc.published ? 'Published' : 'Draft'}
                      </span>
                      <span className="text-xs px-2 py-1 rounded bg-primary/20 text-primary capitalize">
                        {doc.section.replace(/-/g, ' ')}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{doc.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingItem(doc);
                        setShowForm(true);
                      }}
                      className="px-3 py-1 text-sm rounded bg-primary/20 text-primary hover:bg-primary/30"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete('documentation', doc.id)}
                      className="px-3 py-1 text-sm rounded bg-destructive/20 text-destructive hover:bg-destructive/30"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Videos */}
        {activeTab === 'videos' && (
          <div className="grid gap-4">
            {videos.map((video) => (
              <div key={video.id} className="glass-pane rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold">{video.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded ${video.published ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                        {video.published ? 'Published' : 'Draft'}
                      </span>
                      <span className="text-xs px-2 py-1 rounded bg-primary/20 text-primary">
                        {video.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{video.description}</p>
                    <p className="text-xs text-muted-foreground">⏱️ {video.duration || 'N/A'}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingItem(video);
                        setShowForm(true);
                      }}
                      className="px-3 py-1 text-sm rounded bg-primary/20 text-primary hover:bg-primary/30"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete('videos', video.id)}
                      className="px-3 py-1 text-sm rounded bg-destructive/20 text-destructive hover:bg-destructive/30"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Blog Posts */}
        {activeTab === 'blog' && (
          <div className="grid gap-4">
            {blogPosts.map((post) => (
              <div key={post.slug} className="glass-pane rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{post.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {post.author} • {new Date(post.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingItem(post);
                        setShowForm(true);
                      }}
                      className="px-3 py-1 text-sm rounded bg-primary/20 text-primary hover:bg-primary/30"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete('blog', post.slug)}
                      className="px-3 py-1 text-sm rounded bg-destructive/20 text-destructive hover:bg-destructive/30"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Careers */}
        {activeTab === 'careers' && (
          <div className="grid gap-4">
            {careers.map((career) => (
              <div key={career.id} className="glass-pane rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold">{career.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded ${career.published ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                        {career.published ? 'Published' : 'Draft'}
                      </span>
                      <span className="text-xs px-2 py-1 rounded bg-primary/20 text-primary">
                        {career.department}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{career.description}</p>
                    <p className="text-xs text-muted-foreground">
                      📍 {career.location} • 💼 {career.type}
                      {career.salaryRange && ` • 💰 ${career.salaryRange}`}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingItem(career);
                        setShowForm(true);
                      }}
                      className="px-3 py-1 text-sm rounded bg-primary/20 text-primary hover:bg-primary/30"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete('careers', career.id)}
                      className="px-3 py-1 text-sm rounded bg-destructive/20 text-destructive hover:bg-destructive/30"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Users (Admin Only) */}
        {activeTab === 'users' && isAdmin && (
          <div className="grid gap-4">
            {users.map((u) => (
              <div key={u.username} className="glass-pane rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold">{u.username}</h3>
                      <span className="text-xs px-2 py-1 rounded bg-primary/20 text-primary capitalize">{u.role}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Created: {new Date(u.createdAt || '').toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingItem({ mode: 'edit', user: u });
                        setShowForm(true);
                      }}
                      className="px-3 py-1 text-sm rounded bg-primary/20 text-primary hover:bg-primary/30"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete('users', u.username)}
                      className="px-3 py-1 text-sm rounded bg-destructive/20 text-destructive hover:bg-destructive/30"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {users.length === 0 && (
              <div className="p-6 rounded-lg border border-border text-sm text-muted-foreground">
                No users found.
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modal for Forms */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-background rounded-xl p-6 max-w-3xl w-full my-8">
            <h3 className="text-xl font-bold mb-4">
              {activeTab === 'users' 
                ? (editingItem?.mode === 'edit' ? 'Edit User' : 'Create User')
                : (editingItem ? 'Edit' : 'Add New') + ' ' + (activeTab === 'help' ? 'Help Article' : activeTab === 'docs' ? 'Documentation' : activeTab === 'videos' ? 'Video' : activeTab === 'blog' ? 'Blog Post' : 'Career Listing')
              }
            </h3>
            
            <div className="max-h-[70vh] overflow-y-auto pr-2">
              {activeTab === 'help' && (
                <HelpArticleForm
                  article={editingItem}
                  onSave={async (data) => {
                    await handleSave('help', data);
                  }}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingItem(null);
                  }}
                />
              )}
              
              {activeTab === 'docs' && (
                <DocumentationForm
                  doc={editingItem}
                  onSave={async (data) => {
                    await handleSave('documentation', data);
                  }}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingItem(null);
                  }}
                />
              )}
              
              {activeTab === 'videos' && (
                <VideoForm
                  video={editingItem}
                  onSave={async (data) => {
                    await handleSave('videos', data);
                  }}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingItem(null);
                  }}
                />
              )}
              
              {activeTab === 'blog' && (
                <BlogPostForm
                  post={editingItem}
                  onSave={async (data) => {
                    await handleSave('blog', data);
                  }}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingItem(null);
                  }}
                />
              )}
              
              {activeTab === 'careers' && (
                <CareerForm
                  career={editingItem}
                  onSave={async (data) => {
                    await handleSave('careers', data);
                  }}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingItem(null);
                  }}
                />
              )}

              {activeTab === 'users' && isAdmin && (
                <UserForm
                  mode={(editingItem?.mode as UserFormMode) || (editingItem ? 'edit' : 'create')}
                  user={editingItem?.user || null}
                  onSave={async (data) => {
                    await handleSave('users', data);
                  }}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingItem(null);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
