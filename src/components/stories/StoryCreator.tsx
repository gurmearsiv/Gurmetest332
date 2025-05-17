import React, { useState } from 'react';
import { useStory } from '../../contexts/StoryContext';
import { Image, Type, X } from 'lucide-react';

interface StoryCreatorProps {
  onClose: () => void;
}

const StoryCreator: React.FC<StoryCreatorProps> = ({ onClose }) => {
  const { addStory } = useStory();
  const [content, setContent] = useState('');
  const [type, setType] = useState<'text' | 'image'>('text');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Please add some content to your story');
      return;
    }
    
    addStory(content, type);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-lg">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Create Story</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="flex gap-4 mb-4">
            <button
              type="button"
              onClick={() => setType('text')}
              className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 ${
                type === 'text'
                  ? 'bg-blue-50 text-blue-600 border-2 border-blue-600'
                  : 'bg-gray-100 text-gray-600 border-2 border-transparent'
              }`}
            >
              <Type className="w-5 h-5" />
              Text
            </button>
            
            <button
              type="button"
              onClick={() => setType('image')}
              className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 ${
                type === 'image'
                  ? 'bg-blue-50 text-blue-600 border-2 border-blue-600'
                  : 'bg-gray-100 text-gray-600 border-2 border-transparent'
              }`}
            >
              <Image className="w-5 h-5" />
              Image
            </button>
          </div>
          
          {type === 'text' ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full h-32 p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <input
              type="url"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter image URL"
              className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
          
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Share Story
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoryCreator;