export interface Group {
  id: string;
  name: string;
  createdBy: string;
  members: string[];
  createdAt: string;
  lastActivity: string;
  description?: string;
  avatarUrl?: string;
  isPrivate?: boolean;
}