export interface User {
  id: string;
  name: string;
  email: string;
  university: string;
  avatarUrl: string;
  isOnline?: boolean;
  lastSeen: string;
  joinedAt: string;
  bio?: string;
  department?: string;
  year?: number;
}