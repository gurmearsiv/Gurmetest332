import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { MessageSquare, Users, User, Bell, LogOut, Menu } from 'lucide-react';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  if (!user) return null;

  return (
    <nav className="bg-white py-3 px-4 shadow-sm border-b border-slate-200">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors mr-2"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link to="/" className="flex items-center space-x-2">
            <MessageSquare className="w-8 h-8 text-blue-800" />
            <span className="text-xl font-bold text-blue-800">UniChat</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-1 md:space-x-4">
          <Link 
            to="/messages" 
            className={`p-2 rounded-full hover:bg-slate-100 transition-colors ${
              location.pathname.includes('/messages') || location.pathname.includes('/chat') || location.pathname.includes('/group') 
                ? 'text-blue-800 bg-blue-50' 
                : 'text-slate-700'
            }`}
          >
            <MessageSquare className="w-6 h-6" />
          </Link>
          
          <Link 
            to="/" 
            className={`p-2 rounded-full hover:bg-slate-100 transition-colors ${
              location.pathname === '/' ? 'text-blue-800 bg-blue-50' : 'text-slate-700'
            }`}
          >
            <Users className="w-6 h-6" />
          </Link>
          
          <button className="p-2 rounded-full hover:bg-slate-100 transition-colors relative">
            <Bell className="w-6 h-6 text-slate-700" />
            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>
          
          <Link 
            to="/profile" 
            className={`p-2 rounded-full hover:bg-slate-100 transition-colors ${
              location.pathname === '/profile' ? 'text-blue-800 bg-blue-50' : 'text-slate-700'
            }`}
          >
            <User className="w-6 h-6" />
          </Link>
          
          <button 
            onClick={logout} 
            className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-700"
            aria-label="Logout"
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;