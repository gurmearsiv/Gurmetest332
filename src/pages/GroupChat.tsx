import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../contexts/ChatContext';
import { Send, Paperclip, MoreVertical, Users, ArrowLeft } from 'lucide-react';

const GroupChat: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const { user } = useAuth();
  const { messages, loading, sendMessage, fetchGroupMessages, groups } = useChat();
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const group = groups.find(g => g.id === groupId);
  
  useEffect(() => {
    if (groupId) {
      fetchGroupMessages(groupId);
    }
  }, [groupId, fetchGroupMessages]);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (messageText.trim() && groupId) {
      sendMessage(messageText, undefined, groupId);
      setMessageText('');
    }
  };
  
  if (!user || !groupId || !group) return null;

  return (
    <div className="flex flex-col h-[calc(100vh-69px)]">
      {/* Group Chat Header */}
      <div className="bg-white p-4 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/messages" className="mr-3 md:hidden">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-purple-700">
              {group.name.substring(0, 2).toUpperCase()}
            </span>
          </div>
          <div className="ml-3">
            <h2 className="font-medium text-slate-800">{group.name}</h2>
            <p className="text-xs text-slate-500">{group.members.length} members</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full hover:bg-slate-100 text-slate-600">
            <Users className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-slate-100 text-slate-600">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-800"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map(message => {
              const isFromUser = message.senderId === user.id;
              
              return (
                <div 
                  key={message.id} 
                  className={`flex ${isFromUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isFromUser && (
                    <div className="w-8 h-8 bg-slate-300 rounded-full flex-shrink-0 flex items-center justify-center mr-2">
                      <span className="text-xs font-medium text-white">
                        {message.senderId.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}
                  
                  <div 
                    className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 ${
                      isFromUser 
                        ? 'bg-blue-800 text-white rounded-tr-none' 
                        : 'bg-white text-slate-800 rounded-tl-none border border-slate-200'
                    }`}
                  >
                    {!isFromUser && (
                      <p className="text-xs font-medium text-slate-500 mb-1">
                        {message.senderId === user.id ? 'You' : `User ${message.senderId.substring(5, 10)}`}
                      </p>
                    )}
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${isFromUser ? 'text-blue-200' : 'text-slate-500'}`}>
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      {/* Message Input */}
      <div className="bg-white p-4 border-t border-slate-200">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <button 
            type="button"
            className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          
          <input 
            type="text" 
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder={`Message ${group.name}...`}
            className="flex-1 py-2 px-4 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          <button 
            type="submit"
            disabled={!messageText.trim()}
            className="p-2 bg-blue-800 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default GroupChat;