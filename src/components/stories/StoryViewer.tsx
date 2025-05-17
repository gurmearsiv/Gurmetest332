import React, { useState, useEffect } from 'react';
import { useStory } from '../../contexts/StoryContext';
import { X } from 'lucide-react';

interface StoryViewerProps {
  storyId: string;
  onClose: () => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ storyId, onClose }) => {
  const { stories, viewStory } = useStory();
  const [progress, setProgress] = useState(0);
  
  const story = stories.find(s => s.id === storyId);
  
  useEffect(() => {
    if (story) {
      viewStory(story.id);
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            return 100;
          }
          return prev + 1;
        });
      }, 30);
      
      return () => clearInterval(timer);
    }
  }, [story, viewStory]);
  
  if (!story) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="relative w-full max-w-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/10"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="bg-gradient-to-b from-gray-900/50 to-transparent absolute top-0 left-0 right-0 h-20" />
        
        <div className="w-full h-1 bg-gray-600 rounded-full mb-4">
          <div
            className="h-full bg-white rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="p-4">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              {story.userName[0]}
            </div>
            <div className="ml-2">
              <p className="text-white font-medium">{story.userName}</p>
              <p className="text-white/60 text-sm">
                {new Date(story.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
          
          {story.type === 'text' ? (
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-6 rounded-lg">
              <p className="text-white text-lg">{story.content}</p>
            </div>
          ) : (
            <img
              src={story.content}
              alt="Story"
              className="w-full h-auto rounded-lg"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;