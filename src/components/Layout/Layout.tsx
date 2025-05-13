import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const showSidebar = !location.pathname.includes('/login') && !location.pathname.includes('/register');
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {showSidebar && <Navbar toggleSidebar={toggleSidebar} />}
      
      <div className="flex flex-1">
        {showSidebar && <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
        
        <main className={`flex-1 transition-all duration-300 ${showSidebar ? (isSidebarOpen ? 'md:ml-64' : 'md:ml-0') : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;