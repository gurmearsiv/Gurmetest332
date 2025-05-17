import React, { createContext, useState, useContext, useEffect } from 'react';
import { Story } from '../types/Story';
import { useAuth } from './AuthContext';

interface StoryContextType {
  stories: Story[];
  loading: boolean;
  addStory: (content: string, type: 'image' | 'text') => void;
  deleteStory: (storyId: string) => void;
  viewStory: (storyId: string) => void;
  getUserStories: (userId: string) => Story[];
  getActiveStories: () => Story[];
}

const StoryContext = createContext<StoryContextType>({} as StoryContextType);

export const useStory = () => useContext(StoryContext);

export const StoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      // In a real app, fetch stories from API
      const mockStories: Story[] = [
        {
          id: 'story1',
          userId: user.id,
          userName: user.name,
          content: 'Studying for finals! 📚',
          type: 'text',
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          viewers: []
        }
      ];
      setStories(mockStories);
    }
  }, [user]);

  const addStory = (content: string, type: 'image' | 'text') => {
    if (!user) return;

    const newStory: Story = {
      id: 'story_' + Math.random().toString(36).substr(2, 9),
      userId: user.id,
      userName: user.name,
      content,
      type,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      viewers: []
    };

    setStories(prev => [...prev, newStory]);
  };

  const deleteStory = (storyId: string) => {
    setStories(prev => prev.filter(story => story.id !== storyId));
  };

  const viewStory = (storyId: string) => {
    if (!user) return;

    setStories(prev => prev.map(story => {
      if (story.id === storyId && !story.viewers.includes(user.id)) {
        return {
          ...story,
          viewers: [...story.viewers, user.id]
        };
      }
      return story;
    }));
  };

  const getUserStories = (userId: string) => {
    return stories.filter(story => story.userId === userId);
  };

  const getActiveStories = () => {
    const now = new Date().toISOString();
    return stories.filter(story => story.expiresAt > now);
  };

  return (
    <StoryContext.Provider value={{
      stories,
      loading,
      addStory,
      deleteStory,
      viewStory,
      getUserStories,
      getActiveStories
    }}>
      {children}
    </StoryContext.Provider>
  );
};