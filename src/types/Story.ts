export interface Story {
  id: string;
  userId: string;
  userName: string;
  content: string;
  type: 'image' | 'text';
  createdAt: string;
  expiresAt: string;
  viewers: string[];
}