import { useState, useEffect, useMemo } from 'react';

export type Role = 'Owner' | 'Manager' | 'Staff' | 'Admin';

export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  Owner: [
    'dashboard', 'inventory', 'menu', 'team', 'robotic-fleets', 'analytics',
    'settings', 'hostpro', 'scheduling', 'roster', 'financial'
  ],
  Admin: [
    'dashboard', 'inventory', 'menu', 'team', 'analytics', 'settings',
    'hostpro', 'scheduling', 'roster'
  ],
  Manager: [
    'dashboard', 'inventory', 'menu', 'team', 'analytics', 'hostpro',
    'scheduling', 'roster'
  ],
  Staff: [
    'dashboard', 'inventory', 'menu', 'team'
  ]
};

export function usePermissions() {
  const [user, setUser] = useState<{ role: Role; permissions?: string[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In demo mode, use a default user
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          // Default to Staff role for demo
          setUser({ role: 'Staff', permissions: ROLE_PERMISSIONS.Staff });
        }
      } else {
        // Default to Staff role for demo
        setUser({ role: 'Staff', permissions: ROLE_PERMISSIONS.Staff });
      }
    }
    setLoading(false);
  }, []);

  const hasPermission = useMemo(() => {
    return (permission: string): boolean => {
      if (!user) return false;
      return user.permissions?.includes(permission) || false;
    };
  }, [user]);

  const canAccessSettings = (): boolean => {
    return user?.role === 'Owner' || user?.role === 'Admin' || false;
  };

  const canViewFinancialData = (): boolean => {
    return user?.role === 'Owner' || user?.role === 'Manager' || user?.permissions?.includes('financial') || false;
  };

  return {
    user,
    loading,
    hasPermission,
    canAccessSettings,
    canViewFinancialData,
    permissions: user?.permissions || []
  };
}
