export interface Message {
  id: string;
  content: string;
  senderId: string;
  recipientId?: string | null;
  groupId?: string | null;
  timestamp: string;
  isRead: boolean;
  attachments?: string[];
}