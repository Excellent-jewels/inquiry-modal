'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import API_BASE from "../utils/config";

type Notification = {
  id: number;
  message: string;
  timestamp: string;
  visible_to: string[];
  dismissed_by: string[];
  type?: string;
};

type NotificationContextType = {
  notifications: Notification[];
  fetchNotifications: () => void;
  addNotification: (message: string, visibleTo: string[]) => void;
  dismissNotification: (id: number) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [userKey, setUserKey] = useState<string | null>(null); // ❌ no localStorage here
  const [token, setToken] = useState<string | null>(null);
  

  const API_URL = `${API_BASE}`;

  // ✅ Safe: access localStorage inside useEffect
 useEffect(() => {
  if (typeof window !== 'undefined') {
    const role = localStorage.getItem('role');
    const userName = localStorage.getItem('userName');
    const tok = localStorage.getItem('token');

    console.log("📦 role from localStorage:", role);
    console.log("📦 userName from localStorage:", userName);

    if (role && userName) {
      const key = `${role}_${userName}`;
      console.log("✅ Setting userKey:", key);
      setUserKey(key);
    } else {
      console.warn("❌ Missing role or userName in localStorage");
    }

    if (tok) setToken(tok);
  }
}, []);


  const fetchNotifications = async () => {
    if (!userKey) return;

    try {
      const res = await fetch(`${API_URL}/notifications/visible-to/${userKey}`);
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      const filtered = data.filter((n: { type: string; }) => n.type === "add");
      setNotifications(data);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    }
  };

  const addNotification = async (message: string, visibleTo: string[]) => {
    if (!token) return;

    try {
      await fetch(`${API_URL}/notifications/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message, visible_to: visibleTo }),
      });
      fetchNotifications();
    } catch (err) {
      console.error('Failed to add notification:', err);
    }
  };

  const dismissNotification = async (id: number) => {
    if (!userKey || !token) return;

    try {
      await fetch(`${API_URL}/notifications/${id}/dismiss?user_key=${userKey}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error('Failed to dismiss notification:', err);
    }
  };

 useEffect(() => {
  if (userKey) {
    console.log("🔍 userKey for notifications:", userKey);
    fetchNotifications();
  } else {
    console.warn("⚠️ No userKey set — skipping fetchNotifications()");
  }
}, [userKey]);

  return (
    <NotificationContext.Provider
      value={{ notifications, fetchNotifications, addNotification, dismissNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (p0: (prev: any) => any[]) => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};
