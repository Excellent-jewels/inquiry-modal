// utils/auth.ts
import { jwtDecode } from 'jwt-decode';

export function getUserRole(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }

  try {
    const decoded: any = jwtDecode(token);
    return decoded.role || null;
  } catch (err) {
    console.error("Failed to decode token", err);
    return null;
  }
}
