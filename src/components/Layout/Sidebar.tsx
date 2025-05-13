import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useChat } from '../../contexts/ChatContext';
import { MessageSquare, Users, BookOpen, Hash, Search, ChevronLeft } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { user } = useAuth();
  const { chats, groups, getUnreadCount } = useChat();
  const location = useLocation();
  
  if (!user) return null;

  const isMobile = window.innerWidth < 768;

  if (isMobile && !isOpen) {
    return (
      <button 
        onClick={toggleSidebar}
        className="fixed bottom-4 right-4 bg-blue-800 text-white p-4 rounded-full shadow-lg z-50"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    );
  }

  return (
    <aside className={`bg-white border-r border-slate-200 w-64 fixed left-0 top-[69px] h-[calc(100vh-69px)] overflow-y-auto transition-all duration-300 z-40 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="sticky top-0 bg-white z-10 p-4 border-b border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-800">Messages</h2>
          <button 
            onClick={toggleSidebar}
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-600"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search messages..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="p-2">
        <h3 className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Direct Messages
        </h3>
        
        <ul className="space-y-1">
          {chats.map(chat => (
            <li key={chat.id}>
              <Link 
                to={`/chat/${chat.id}`}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === `/chat/${chat.id}` 
                    ? 'bg-blue-50 text-blue-800' 
                    : 'hover:bg-slate-100 text-slate-700'
                }`}
                onClick={() => isMobile && toggleSidebar()}
              >
                <div className="w-8 h-8 bg-slate-300 rounded-full flex-shrink-0 flex items-center justify-center">
                  <span className="text-xs font-medium text-white">
                    {chat.id.substring(0, 2).toUpperCase()}
                  </span>
                </div>
                <span className="ml-3 font-medium">Student {chat.id.substring(0, 5)}</span>
                {getUnreadCount(chat.id) > 0 && (
                  <span className="ml-auto bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                    {getUnreadCount(chat.id)}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="p-2">
        <h3 className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Groups
        </h3>
        
        <ul className="space-y-1">
          {groups.map(group => (
            <li key={group.id}>
              <Link 
                to={`/group/${group.id}`}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === `/group/${group.id}` 
                    ? 'bg-blue-50 text-blue-800' 
                    : 'hover:bg-slate-100 text-slate-700'
                }`}
                onClick={() => isMobile && toggleSidebar()}
              >
                <Hash className="w-5 h-5 flex-shrink-0" />
                <span className="ml-3 font-medium">{group.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="p-2">
        <h3 className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          University Resources
        </h3>
        
        <ul className="space-y-1">
          <li>
            <Link 
              to="/resources/library"
              className="flex items-center px-4 py-2 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
              onClick={() => isMobile && toggleSidebar()}
            >
              <BookOpen className="w-5 h-5 flex-shrink-0" />
              <span className="ml-3 font-medium">Library</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/resources/courses"
              className="flex items-center px-4 py-2 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
              onClick={() => isMobile && toggleSidebar()}
            >
              <BookOpen className="w-5 h-5 flex-shrink-0" />
              <span className="ml-3 font-medium">Courses</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;