"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, CheckCircle } from 'lucide-react';

// Mock notifications data
const mockNotifications = [
  { id: 1, message: 'Your fuel reservation (ID: 12345) is confirmed at Central Station.', read: false, time: '10 minutes ago' },
  { id: 2, message: 'Reminder: Your reservation at Highway Gas expires in 30 minutes.', read: false, time: '25 minutes ago' },
  { id: 3, message: 'Your fuel purchase of 45L has been successfully recorded.', read: true, time: '2 hours ago' },
  { id: 4, message: 'Welcome to FuelOps! Your account is now active.', read: true, time: '1 day ago' },
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Recent Alerts</CardTitle>
      </CardHeader>
      <CardContent>
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
                <p className="text-sm mt-1">{notification.time}</p>
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
          {notifications.length === 0 && (
            <p>You have no new notifications.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsPage;
