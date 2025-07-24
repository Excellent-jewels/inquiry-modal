// hooks/useUserRole.ts
import { useState, useEffect } from 'react';
export type UserRole = 'admin' | 'sales' | 'backend' | 'account' | null;

export function useUserRole() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedRole = localStorage.getItem('role') as UserRole;
    if (storedRole) {
      setRole(storedRole);
    }
    setLoading(false);
  }, []);

  return { role, loading };
}
