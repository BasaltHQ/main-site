'use client';

import { useEffect, useState } from 'react';

export type UserFormMode = 'create' | 'edit';

export interface UserModel {
  id?: string;
  username: string;
  role: 'admin' | 'editor';
  createdAt?: string;
}

interface UserFormProps {
  mode: UserFormMode;
  user?: UserModel | null;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export default function UserForm({ mode, user, onSave, onCancel }: UserFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'editor'>('editor');

  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setRole(user.role || 'editor');
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'create') {
      onSave({ username, password, role });
    } else {
      const payload: any = { username };
      if (password) payload.newPassword = password;
      if (role) payload.role = role;
      onSave(payload);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Username *</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
            placeholder="e.g., alice"
            required
            disabled={mode === 'edit'}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{mode === 'create' ? 'Password *' : 'New Password'}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
            placeholder={mode === 'create' ? 'Set a strong password' : 'Leave blank to keep current'}
            {...(mode === 'create' ? { required: true } : {})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Role *</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as 'admin' | 'editor')}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
            required
          >
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {mode === 'create' ? 'Create User' : 'Update User'}
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
