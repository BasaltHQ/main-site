"use client";

import { useState } from "react";
import { BlogPost } from "@/lib/blog/posts";
import { MarkdownEditor } from "./MarkdownEditor";

interface BlogPostFormProps {
  post?: BlogPost;
  onSave: (data: Partial<BlogPost>) => Promise<void>;
  onCancel: () => void;
}

export function BlogPostForm({ post, onSave, onCancel }: BlogPostFormProps) {
  const [formData, setFormData] = useState({
    title: post?.title || "",
    description: post?.description || "",
    content: post?.content || "",
    author: post?.author || "Ledger1 Team",
    tags: post?.tags?.join(", ") || "",
    coverImage: post?.coverImage || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data: any = {
        ...formData,
        tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
      };

      if (post) {
        data.slug = post.slug;
      }

      await onSave(data);
    } catch (err: any) {
      setError(err.message || "Failed to save blog post");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          Title *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <p className="text-xs text-muted-foreground mt-1">
          Slug will be auto-generated from title
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Content * (Markdown supported)
        </label>
        <MarkdownEditor
          value={formData.content}
          onChange={(value) => setFormData({ ...formData, content: value })}
          minHeight="500px"
          placeholder="Write your blog post here... Use the toolbar for markdown formatting."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Author
          </label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            placeholder="Ledger1 Team"
            className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Cover Image URL
          </label>
          <input
            type="url"
            value={formData.coverImage}
            onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
            placeholder="/path/to/image.jpg"
            className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          placeholder="development, tutorial, announcement"
          className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-2 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Blog Post"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
