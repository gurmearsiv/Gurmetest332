import React, { createContext, useState, useContext, useEffect } from 'react';
import { Message } from '../types/Message';
import { Chat } from '../types/Chat';
import { Group } from '../types/Group';
import { useAuth } from './AuthContext';
import { generateMockChats, generateMockGroups } from '../utils/mockData';

interface ChatContextType {
  chats: Chat[];
  groups: Group[];
  activeChat: string | null;
  messages: Message[];
  loading: boolean;
  sendMessage: (content: string, recipientId?: string, groupId?: string) => void;
  setActiveChat: (chatId: string | null) => void;
  createGroup: (name: string, memberIds: string[]) => void;
  fetchMessages: (chatId: string) => void;
  fetchGroupMessages: (groupId: string) => void;
  getUnreadCount: (chatId: string) => number;
  markAsRead: (chatId: string) => void;
}

const ChatContext = createContext<ChatContextType>({} as ChatContextType);

export const useChat = () => useContext(ChatContext);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      // In a real app, this would fetch real data from an API
      setChats(generateMockChats(user.id));
      setGroups(generateMockGroups(user.id));
    }
  }, [user]);

  const sendMessage = (content: string, recipientId?: string, groupId?: string) => {
    if (!user) return;
    
    const newMessage: Message = {
      id: 'msg_' + Math.random().toString(36).substr(2, 9),
      content,
      senderId: user.id,
      recipientId: recipientId || null,
      groupId: groupId || null,
      timestamp: new Date().toISOString(),
      isRead: false
    };

    setMessages(prev => [...prev, newMessage]);

    // In a real app, we would send this message to an API
  };

  const fetchMessages = (chatId: string) => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockMessages: Message[] = [];
      const chatPartnerId = chatId;
      
      // Generate some mock messages
      for (let i = 0; i < 10; i++) {
        const isFromUser = Math.random() > 0.5;
        mockMessages.push({
          id: 'msg_' + Math.random().toString(36).substr(2, 9),
          content: `This is message #${i + 1}`,
          senderId: isFromUser ? user?.id || '' : chatPartnerId,
          recipientId: isFromUser ? chatPartnerId : user?.id || '',
          timestamp: new Date(Date.now() - (10 - i) * 3600000).toISOString(),
          isRead: true
        });
      }

      setMessages(mockMessages);
      setLoading(false);
    }, 500);
  };

  const fetchGroupMessages = (groupId: string) => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockMessages: Message[] = [];
      
      // Generate some mock messages for the group
      for (let i = 0; i < 15; i++) {
        const randomUser = Math.floor(Math.random() * 5);
        const userIds = ['user_1', 'user_2', 'user_3', 'user_4', user?.id || ''];
        mockMessages.push({
          id: 'msg_' + Math.random().toString(36).substr(2, 9),
          content: `Group message #${i + 1}`,
          senderId: userIds[randomUser],
          groupId: groupId,
          timestamp: new Date(Date.now() - (15 - i) * 3600000).toISOString(),
          isRead: true
        });
      }

      setMessages(mockMessages);
      setLoading(false);
    }, 500);
  };

  const getUnreadCount = (chatId: string): number => {
    // In a real app, this would calculate actual unread messages
    return Math.floor(Math.random() * 5);
  };

  const markAsRead = (chatId: string) => {
    // In a real app, this would mark messages as read in the database
    setMessages(prev => 
      prev.map(msg => ({
        ...msg,
        isRead: true
      }))
    );
  };

  const createGroup = (name: string, memberIds: string[]) => {
    if (!user) return;
    
    const newGroup: Group = {
      id: 'group_' + Math.random().toString(36).substr(2, 9),
      name,
      createdBy: user.id,
      members: [...memberIds, user.id],
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    };

    setGroups(prev => [...prev, newGroup]);
  };

  return (
    <ChatContext.Provider value={{ 
      chats, 
      groups, 
      activeChat, 
      messages, 
      loading,
      sendMessage, 
      setActiveChat, 
      createGroup,
      fetchMessages,
      fetchGroupMessages,
      getUnreadCount,
      markAsRead
    }}>
      {children}
    </ChatContext.Provider>
  );
};