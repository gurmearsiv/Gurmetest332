import { Chat } from '../types/Chat';
import { Group } from '../types/Group';

// Generate mock chat data
export const generateMockChats = (userId: string): Chat[] => {
  const mockChats: Chat[] = [];
  
  for (let i = 1; i <= 5; i++) {
    const chatId = `user_${i}`;
    mockChats.push({
      id: chatId,
      participants: [userId, chatId],
      lastMessage: i % 2 === 0 ? 'Hey, how are you doing?' : 'Did you submit the assignment?',
      lastMessageTime: new Date(Date.now() - i * 3600000).toISOString(),
      unreadCount: i % 3 === 0 ? Math.floor(Math.random() * 5) + 1 : 0
    });
  }
  
  return mockChats;
};

// Generate mock group data
export const generateMockGroups = (userId: string): Group[] => {
  const groupNames = ['Computer Science 101', 'Study Group', 'Campus Events', 'Research Team'];
  const mockGroups: Group[] = [];
  
  for (let i = 0; i < groupNames.length; i++) {
    const groupId = `group_${i + 1}`;
    const members = [`user_1`, `user_2`, `user_3`];
    
    // Add current user to members
    if (!members.includes(userId)) {
      members.push(userId);
    }
    
    mockGroups.push({
      id: groupId,
      name: groupNames[i],
      createdBy: i === 0 ? userId : `user_${i}`,
      members,
      createdAt: new Date(Date.now() - (i + 1) * 86400000).toISOString(),
      lastActivity: new Date(Date.now() - i * 3600000).toISOString(),
      description: `A group for ${groupNames[i].toLowerCase()} discussion and collaboration.`
    });
  }
  
  return mockGroups;
};