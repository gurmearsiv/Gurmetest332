import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../contexts/ChatContext';
import { Search, Users, BookOpen, Plus } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { groups } = useChat();
  const [activeTab, setActiveTab] = useState('discover');
  
  if (!user) return null;

  // Mock data
  const recommendedUsers = [
    { id: 'user_1', name: 'Emma Johnson', department: 'Computer Science', year: 3 },
    { id: 'user_2', name: 'Alex Smith', department: 'Business Administration', year: 2 },
    { id: 'user_3', name: 'Maria Garcia', department: 'Psychology', year: 4 },
    { id: 'user_4', name: 'James Wilson', department: 'Engineering', year: 1 },
  ];
  
  const publicGroups = [
    { id: 'group_1', name: 'CS Study Group', members: 28, description: 'Study group for CS majors' },
    { id: 'group_2', name: 'Campus Events', members: 156, description: 'Stay updated on campus events' },
    { id: 'group_3', name: 'Research Opportunities', members: 42, description: 'Find research opportunities' },
    { id: 'group_4', name: 'Job Postings', members: 89, description: 'Internship and job opportunities' },
  ];
  
  const courses = [
    { id: 'course_1', code: 'CS101', name: 'Introduction to Programming', department: 'Computer Science' },
    { id: 'course_2', code: 'MATH204', name: 'Linear Algebra', department: 'Mathematics' },
    { id: 'course_3', code: 'PSYCH110', name: 'Introduction to Psychology', department: 'Psychology' },
    { id: 'course_4', code: 'BUS200', name: 'Principles of Management', department: 'Business' },
  ];

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Welcome, {user.name}!</h1>
        <p className="text-slate-600">Connect with other students at {user.university}</p>
      </div>
      
      {/* Search */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search for students, groups, or courses..." 
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mb-6 border-b border-slate-200">
        <div className="flex space-x-6">
          <button 
            onClick={() => setActiveTab('discover')}
            className={`pb-3 text-sm font-medium transition-colors ${
              activeTab === 'discover' 
                ? 'text-blue-800 border-b-2 border-blue-800' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Discover
          </button>
          <button 
            onClick={() => setActiveTab('groups')}
            className={`pb-3 text-sm font-medium transition-colors ${
              activeTab === 'groups' 
                ? 'text-blue-800 border-b-2 border-blue-800' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            My Groups
          </button>
          <button 
            onClick={() => setActiveTab('courses')}
            className={`pb-3 text-sm font-medium transition-colors ${
              activeTab === 'courses' 
                ? 'text-blue-800 border-b-2 border-blue-800' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Courses
          </button>
        </div>
      </div>
      
      {/* Discover Tab */}
      {activeTab === 'discover' && (
        <div>
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-800">Recommended Students</h2>
              <Link to="/discover/students" className="text-sm text-blue-800 hover:underline">View all</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recommendedUsers.map(user => (
                <div key={user.id} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-4">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-medium">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium text-slate-800">{user.name}</h3>
                        <p className="text-xs text-slate-500">{user.department}</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">Year {user.year} Student</p>
                    <Link 
                      to={`/chat/${user.id}`}
                      className="block w-full text-center bg-blue-50 text-blue-800 text-sm font-medium py-2 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      Message
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-800">Popular Groups</h2>
              <Link to="/discover/groups" className="text-sm text-blue-800 hover:underline">View all</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {publicGroups.map(group => (
                <div key={group.id} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-5">
                    <h3 className="font-medium text-lg text-slate-800 mb-1">{group.name}</h3>
                    <p className="text-sm text-slate-500 mb-3">{group.members} members</p>
                    <p className="text-sm text-slate-600 mb-4">{group.description}</p>
                    <Link 
                      to={`/group/${group.id}`}
                      className="inline-block bg-blue-800 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Join Group
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
      
      {/* Groups Tab */}
      {activeTab === 'groups' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">My Groups</h2>
            <button className="flex items-center bg-blue-800 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4 mr-1" />
              Create Group
            </button>
          </div>
          
          {groups.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groups.map(group => (
                <Link 
                  to={`/group/${group.id}`}
                  key={group.id} 
                  className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow p-5"
                >
                  <h3 className="font-medium text-lg text-slate-800 mb-1">{group.name}</h3>
                  <p className="text-sm text-slate-500 mb-3">{group.members.length} members</p>
                  <p className="text-xs text-slate-500">
                    Last activity: {new Date(group.lastActivity).toLocaleDateString()}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-300">
              <Users className="w-12 h-12 mx-auto text-slate-400 mb-3" />
              <h3 className="text-lg font-medium text-slate-700 mb-2">No groups yet</h3>
              <p className="text-slate-500 mb-6 max-w-md mx-auto">
                Join existing groups or create a new one to collaborate with other students
              </p>
              <button className="bg-blue-800 text-white text-sm font-medium py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                Browse Groups
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Courses Tab */}
      {activeTab === 'courses' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">My Courses</h2>
            <button className="flex items-center bg-blue-800 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4 mr-1" />
              Add Course
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map(course => (
              <div 
                key={course.id} 
                className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow p-5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-lg text-slate-800 mb-1">{course.name}</h3>
                    <p className="text-sm text-slate-500 mb-1">{course.code}</p>
                    <p className="text-sm text-slate-600">{course.department}</p>
                  </div>
                  <BookOpen className="w-5 h-5 text-blue-800" />
                </div>
                
                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between">
                  <Link 
                    to={`/course/${course.id}/chat`}
                    className="text-sm text-blue-800 hover:underline"
                  >
                    Course Chat
                  </Link>
                  <Link 
                    to={`/course/${course.id}/materials`}
                    className="text-sm text-blue-800 hover:underline"
                  >
                    Materials
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;