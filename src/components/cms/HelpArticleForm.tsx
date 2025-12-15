"use client";

import { useState, useEffect } from "react";
import { HelpArticle } from "@/lib/cms/types";
import { MarkdownEditor } from "./MarkdownEditor";

interface HelpArticleFormProps {
  article?: HelpArticle;
  onSave: (data: Partial<HelpArticle>) => Promise<void>;
  onCancel: () => void;
}

export function HelpArticleForm({ article, onSave, onCancel }: HelpArticleFormProps) {
  const [formData, setFormData] = useState({
    title: article?.title || "",
    description: article?.description || "",
    category: article?.category || "",
    content: article?.content || "",
    videoUrl: article?.videoUrl || "",
    videoThumbnail: article?.videoThumbnail || "",
    tags: article?.tags?.join(", ") || "",
    published: article?.published || false,
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

      if (article) {
        data.id = article.id;
      }

      await onSave(data);
    } catch (err: any) {
      setError(err.message || "Failed to save article");
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
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          rows={2}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Category *
        </label>
        <input
          type="text"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          placeholder="e.g., Getting Started, Integrations, Operations"
          className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
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
          minHeight="450px"
          placeholder="Write your help article here... Use the toolbar for markdown formatting."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Video URL (YouTube embed)
        </label>
        <input
          type="url"
          value={formData.videoUrl}
          onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
          placeholder="https://www.youtube.com/embed/VIDEO_ID"
          className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Use YouTube embed URL format
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Video Thumbnail URL
        </label>
        <input
          type="url"
          value={formData.videoThumbnail}
          onChange={(e) => setFormData({ ...formData, videoThumbnail: e.target.value })}
          placeholder="/path/to/thumbnail.jpg"
          className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          placeholder="setup, tutorial, basics"
          className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="published"
          checked={formData.published}
          onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
          className="w-4 h-4 rounded border-border"
        />
        <label htmlFor="published" className="text-sm font-medium">
          Published (visible to users)
        </label>
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
          {loading ? "Saving..." : "Save Article"}
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
