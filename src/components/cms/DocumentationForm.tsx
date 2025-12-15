"use client";

import { useState } from "react";
import { Documentation } from "@/lib/cms/types";
import { MarkdownEditor } from "./MarkdownEditor";

interface DocumentationFormProps {
  doc?: Documentation;
  onSave: (data: Partial<Documentation>) => Promise<void>;
  onCancel: () => void;
}

export function DocumentationForm({ doc, onSave, onCancel }: DocumentationFormProps) {
  const [formData, setFormData] = useState({
    title: doc?.title || "",
    description: doc?.description || "",
    section: doc?.section || "",
    content: doc?.content || "",
    order: doc?.order?.toString() || "999",
    tags: doc?.tags?.join(", ") || "",
    published: doc?.published || false,
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
        order: parseInt(formData.order) || 999,
        tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
      };

      if (doc) {
        data.id = doc.id;
      }

      await onSave(data);
    } catch (err: any) {
      setError(err.message || "Failed to save documentation");
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Section *
          </label>
          <input
            type="text"
            value={formData.section}
            onChange={(e) => setFormData({ ...formData, section: e.target.value })}
            placeholder="e.g., api, getting-started, user-guide"
            className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <p className="text-xs text-muted-foreground mt-1">
            Use lowercase with hyphens
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Display Order
          </label>
          <input
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: e.target.value })}
            min="0"
            className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Lower numbers appear first
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Content * (Markdown supported)
        </label>
        <MarkdownEditor
          value={formData.content}
          onChange={(value) => setFormData({ ...formData, content: value })}
          minHeight="500px"
          placeholder="Write your documentation here... Use the toolbar for markdown formatting."
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
          placeholder="api, authentication, getting-started"
          className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="doc-published"
          checked={formData.published}
          onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
          className="w-4 h-4 rounded border-border"
        />
        <label htmlFor="doc-published" className="text-sm font-medium">
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
          {loading ? "Saving..." : "Save Documentation"}
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
