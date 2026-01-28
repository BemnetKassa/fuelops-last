"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, CheckCircle } from 'lucide-react';

interface Notification {
  id: string;
  userId: string;
  message: string;
  read: boolean;
  createdAt?: string;
}

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const storedUser = localStorage.getItem('fuelops-user');
        const token = localStorage.getItem('fuelops-token');

        if (!storedUser || !token) {
          setError('You must be logged in to view notifications.');
          setLoading(false);
          return;
        }

        const user = JSON.parse(storedUser);

        const res = await fetch(`http://localhost:3001/api/driver/notifications/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || 'Failed to load notifications.');
        }

        const data: Notification[] = await res.json();
        setNotifications(data);
      } catch (err: any) {
        console.error('Error fetching notifications:', err);
        setError(err.message || 'Failed to load notifications.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (id: string) => {
    const token = localStorage.getItem('fuelops-token');
    if (!token) return;

    // Optimistic update
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

    try {
      const res = await fetch(`http://localhost:3001/api/driver/notifications/${id}/read`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.error('Failed to mark notification as read');
      }
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading notifications...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Recent Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <p className="mb-4 text-sm text-destructive">{error}</p>
        )}
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-md flex items-start gap-4 ${
                notification.read ? 'bg-muted/50 text-muted-foreground' : 'bg-card border'
              }`}
            >
              <div className="mt-1">
                {notification.read ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Bell className="h-5 w-5 text-primary" />
                )}
              </div>
              <div className="flex-1">
                <p className={`font-medium ${notification.read ? '' : 'text-foreground'}`}>
                  {notification.message}
                </p>
                {notification.createdAt && (
                  <p className="text-sm mt-1 text-muted-foreground">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                )}
              </div>
              {!notification.read && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="text-sm text-primary hover:underline"
                >
                  Mark as read
                </button>
              )}
            </div>
          ))}
          {notifications.length === 0 && !error && (
            <p>You have no notifications yet.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsPage;
