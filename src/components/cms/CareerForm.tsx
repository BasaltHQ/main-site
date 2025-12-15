'use client';

import { useState, useEffect } from 'react';
import { Career } from '@/lib/cms/types';
import { MarkdownEditor } from './MarkdownEditor';

interface CareerFormProps {
  career?: Career;
  onSave: (career: Partial<Career>) => void;
  onCancel: () => void;
}

export function CareerForm({ career, onSave, onCancel }: CareerFormProps) {
  const [formData, setFormData] = useState<Partial<Career>>({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    description: '',
    responsibilities: '',
    qualifications: '',
    benefits: '',
    salaryRange: '',
    applyUrl: '',
    tags: [],
    published: true,
  });

  const [tagsInput, setTagsInput] = useState('');

  useEffect(() => {
    if (career) {
      setFormData(career);
      setTagsInput(career.tags?.join(', ') || '');
    }
  }, [career]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = tagsInput
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    onSave({ ...formData, tags });
  };

  const handleChange = (
    field: keyof Career,
    value: string | boolean | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Job Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Department *
          </label>
          <input
            type="text"
            value={formData.department}
            onChange={(e) => handleChange('department', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
            placeholder="e.g., Engineering, Design, Sales"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Location *
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
            placeholder="e.g., Remote (US), San Francisco, CA"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Employment Type *
          </label>
          <select
            value={formData.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
            required
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Salary Range
          </label>
          <input
            type="text"
            value={formData.salaryRange}
            onChange={(e) => handleChange('salaryRange', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
            placeholder="e.g., $120,000 - $160,000 + equity"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Application URL
          </label>
          <input
            type="text"
            value={formData.applyUrl}
            onChange={(e) => handleChange('applyUrl', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
            placeholder="e.g., mailto:careers@ledger1.ai or https://..."
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Short Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
          rows={3}
          placeholder="Brief overview of the position (1-2 sentences)"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Responsibilities *
        </label>
        <MarkdownEditor
          value={formData.responsibilities || ''}
          onChange={(value) => handleChange('responsibilities', value)}
          placeholder="## Key Responsibilities&#10;&#10;- Responsibility 1&#10;- Responsibility 2&#10;- Responsibility 3"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Qualifications *
        </label>
        <MarkdownEditor
          value={formData.qualifications || ''}
          onChange={(value) => handleChange('qualifications', value)}
          placeholder="## Required Qualifications&#10;&#10;- Qualification 1&#10;- Qualification 2&#10;&#10;## Preferred Qualifications&#10;&#10;- Preferred 1&#10;- Preferred 2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Benefits & Perks
        </label>
        <MarkdownEditor
          value={formData.benefits || ''}
          onChange={(value) => handleChange('benefits', value)}
          placeholder="## What We Offer&#10;&#10;- Competitive salary&#10;- Health insurance&#10;- Remote work&#10;- etc."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Tags
        </label>
        <input
          type="text"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
          placeholder="engineering, remote, senior (comma-separated)"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="published"
          checked={formData.published}
          onChange={(e) => handleChange('published', e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="published" className="text-sm font-medium">
          Published
        </label>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {career ? 'Update' : 'Create'} Career
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
