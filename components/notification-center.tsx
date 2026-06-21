"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Bell, Heart, Calendar, Trophy } from "lucide-react";
import { GlassCard } from "@/components/backgrounds/GlassCard";
import { useAuth } from "@/hooks/use-auth";

interface Notification {
  id: string;
  type: "anniversary" | "challenge" | "memory" | "system";
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
}

export function NotificationCenter() {
  const { isLoggedIn } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showPanel, setShowPanel] = useState(false);
  const notificationsRef = useRef(notifications);
  notificationsRef.current = notifications;

  const checkAndGenerateNotifications = useCallback(() => {
    const coupleProfile = localStorage.getItem("couple_profile");
    if (!coupleProfile) return;

    const { partner1, partner2 } = JSON.parse(coupleProfile);
    const newNotifications: Notification[] = [];

    if (partner1?.since || partner2?.since) {
      const since = new Date(partner1.since || partner2.since);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - since.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const monthKey = `${now.getFullYear()}-${now.getMonth()}`;
      const anniversaryKey = `anniversary_${monthKey}`;

      if (sessionStorage.getItem(anniversaryKey) !== "sent" && Math.abs(diffDays % 30) <= 7) {
        newNotifications.push({
          id: Date.now().toString(),
          type: "anniversary",
          title: "Anniversary coming up!",
          message: `You've been together for ${diffDays} days. Celebrate your love!`,
          timestamp: Date.now(),
          read: false,
        });
        sessionStorage.setItem(anniversaryKey, "sent");
      }
    }

    if (newNotifications.length > 0) {
      const updated = [...newNotifications, ...notificationsRef.current];
      setNotifications(updated);
      localStorage.setItem("notifications", JSON.stringify(updated));
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    const saved = localStorage.getItem("notifications");
    if (saved) setNotifications(JSON.parse(saved));

    const interval = setInterval(() => {
      checkAndGenerateNotifications();
    }, 60000);

    return () => clearInterval(interval);
  }, [isLoggedIn, checkAndGenerateNotifications]);

  const markAsRead = (id: string) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  const clearAll = () => {
    setNotifications([]);
    localStorage.setItem("notifications", JSON.stringify([]));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case "anniversary":
        return <Heart className="h-4 w-4 text-rose-500" />;
      case "challenge":
        return <Trophy className="h-4 w-4 text-yellow-500" />;
      case "memory":
        return <Calendar className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-input bg-background/50 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {showPanel && (
        <div className="absolute right-0 top-12 w-80 z-50">
          <GlassCard intensity="strong" className="p-4 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Notifications</h3>
              {notifications.length > 0 && (
                <button onClick={clearAll} className="text-xs text-rose-500 hover:text-rose-600">
                  Clear all
                </button>
              )}
            </div>

            {notifications.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No notifications yet</p>
            ) : (
              <div className="space-y-2">
                {notifications.slice(0, 10).map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markAsRead(n.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      n.read ? "bg-gray-50 dark:bg-gray-800/50" : "bg-rose-50 dark:bg-rose-950/20"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">{getIcon(n.type)}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{n.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{n.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(n.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      {!n.read && <span className="h-2 w-2 rounded-full bg-rose-500 mt-1.5" />}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        </div>
      )}
    </div>
  );
}
