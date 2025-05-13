import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../contexts/ChatContext';
import { Search, Plus, Users, MessageSquare } from 'lucide-react';

const Messages: React.FC = () => {
  const { user } = useAuth();
  const { chats, groups, getUnreadCount } = useChat();
  const [activeTab, setActiveTab] = useState('direct');
  const [searchQuery, setSearchQuery] = useState('');
  
  if (!user) return null;

  const filteredChats = chats.filter(chat => 
    `Student ${chat.id.substring(0, 5)}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Messages</h1>
        <button className="flex items-center bg-blue-800 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4 mr-1" />
          New Message
        </button>
      </div>
      
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search messages..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mb-6 border-b border-slate-200">
        <div className="flex space-x-6">
          <button 
            onClick={() => setActiveTab('direct')}
            className={`pb-3 text-sm font-medium transition-colors ${
              activeTab === 'direct' 
                ? 'text-blue-800 border-b-2 border-blue-800' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Direct Messages
          </button>
          <button 
            onClick={() => setActiveTab('groups')}
            className={`pb-3 text-sm font-medium transition-colors ${
              activeTab === 'groups' 
                ? 'text-blue-800 border-b-2 border-blue-800' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Group Chats
          </button>
        </div>
      </div>
      
      {/* Direct Messages */}
      {activeTab === 'direct' && (
        <div>
          {filteredChats.length > 0 ? (
            <div className="space-y-2">
              {filteredChats.map(chat => (
                <Link 
                  to={`/chat/${chat.id}`}
                  key={chat.id} 
                  className="block bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-4 flex items-center">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex-shrink-0 flex items-center justify-center">
                      <span className="text-sm font-medium text-slate-700">
                        {chat.id.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div className="ml-4 flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-medium text-slate-800 truncate">Student {chat.id.substring(0, 5)}</h3>
                        <span className="text-xs text-slate-500">
                          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 truncate">
                        {chat.lastMessage || "No messages yet"}
                      </p>
                    </div>
                    {getUnreadCount(chat.id) > 0 && (
                      <div className="ml-4">
                        <span className="bg-blue-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                          {getUnreadCount(chat.id)}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-300">
              <MessageSquare className="w-12 h-12 mx-auto text-slate-400 mb-3" />
              <h3 className="text-lg font-medium text-slate-700 mb-2">No messages yet</h3>
              <p className="text-slate-500 mb-6 max-w-md mx-auto">
                Start connecting with other students to begin messaging
              </p>
              <button className="bg-blue-800 text-white text-sm font-medium py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                Find Students
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Group Chats */}
      {activeTab === 'groups' && (
        <div>
          {filteredGroups.length > 0 ? (
            <div className="space-y-2">
              {filteredGroups.map(group => (
                <Link 
                  to={`/group/${group.id}`}
                  key={group.id} 
                  className="block bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-4 flex items-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex-shrink-0 flex items-center justify-center">
                      <span className="text-sm font-medium text-purple-700">
                        {group.name.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div className="ml-4 flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-medium text-slate-800 truncate">{group.name}</h3>
                        <span className="text-xs text-slate-500">
                          {new Date(group.lastActivity).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 truncate">
                        {group.members.length} members
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-300">
              <Users className="w-12 h-12 mx-auto text-slate-400 mb-3" />
              <h3 className="text-lg font-medium text-slate-700 mb-2">No group chats yet</h3>
              <p className="text-slate-500 mb-6 max-w-md mx-auto">
                Join existing groups or create a new one to start group discussions
              </p>
              <button className="bg-blue-800 text-white text-sm font-medium py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                Find Groups
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Messages;