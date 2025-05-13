import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      <MessageSquare className="w-16 h-16 text-blue-800 mb-6" />
      <h1 className="text-4xl font-bold text-slate-800 mb-2">404</h1>
      <h2 className="text-2xl font-medium text-slate-700 mb-6">Page Not Found</h2>
      <p className="text-slate-600 mb-8 text-center max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-blue-800 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;