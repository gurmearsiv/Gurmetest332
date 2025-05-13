export interface Chat {
  id: string;
  participants: string[];
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}