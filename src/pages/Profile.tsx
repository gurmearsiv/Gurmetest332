import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Pencil, Save, X } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [department, setDepartment] = useState(user?.department || '');
  const [year, setYear] = useState(user?.year || 1);
  
  if (!user) return null;

  const handleSave = () => {
    // In a real app, this would update the user profile in the database
    console.log('Saving profile changes:', { name, bio, department, year });
    setEditing(false);
  };

  const handleCancel = () => {
    // Reset form fields to original values
    setName(user.name);
    setBio(user.bio || '');
    setDepartment(user.department || '');
    setYear(user.year || 1);
    setEditing(false);
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 max-w-6xl">
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-800 to-purple-800 h-48 relative">
          <div className="absolute -bottom-16 left-8 flex items-end">
            <div className="w-32 h-32 bg-white rounded-full p-1 shadow-md">
              <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center text-blue-800 text-4xl font-semibold">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-20 px-8 pb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              {editing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-2xl font-bold text-slate-800 mb-1 border-b-2 border-blue-500 focus:outline-none"
                />
              ) : (
                <h1 className="text-2xl font-bold text-slate-800 mb-1">{user.name}</h1>
              )}
              <p className="text-slate-600">{user.email}</p>
            </div>
            
            <div>
              {editing ? (
                <div className="flex space-x-2">
                  <button 
                    onClick={handleSave}
                    className="flex items-center bg-blue-800 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </button>
                  <button 
                    onClick={handleCancel}
                    className="flex items-center bg-slate-200 text-slate-700 text-sm font-medium py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Cancel
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setEditing(true)}
                  className="flex items-center bg-slate-200 text-slate-700 text-sm font-medium py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors"
                >
                  <Pencil className="w-4 h-4 mr-1" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="mb-8">
                <h2 className="text-lg font-bold text-slate-800 mb-4">About Me</h2>
                {editing ? (
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
                    placeholder="Write a short bio..."
                  />
                ) : (
                  <p className="text-slate-600">
                    {bio || "No bio provided yet. Edit your profile to add one."}
                  </p>
                )}
              </div>
              
              <div>
                <h2 className="text-lg font-bold text-slate-800 mb-4">Academic Information</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 mb-1">University</h3>
                    <p className="text-slate-700">{user.university}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 mb-1">Department</h3>
                    {editing ? (
                      <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Computer Science"
                      />
                    ) : (
                      <p className="text-slate-700">
                        {department || "Not specified"}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 mb-1">Year</h3>
                    {editing ? (
                      <select
                        value={year}
                        onChange={(e) => setYear(parseInt(e.target.value))}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value={1}>1st Year</option>
                        <option value={2}>2nd Year</option>
                        <option value={3}>3rd Year</option>
                        <option value={4}>4th Year</option>
                        <option value={5}>5th Year</option>
                        <option value={6}>Graduate</option>
                      </select>
                    ) : (
                      <p className="text-slate-700">
                        {year ? `${year}${getYearSuffix(year)} Year` : "Not specified"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <h2 className="text-lg font-bold text-slate-800 mb-4">Account Information</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 mb-1">Member Since</h3>
                    <p className="text-slate-700">
                      {new Date(user.joinedAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 mb-1">Last Active</h3>
                    <p className="text-slate-700">
                      {user.isOnline ? 'Online now' : new Date(user.lastSeen).toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="pt-4 mt-4 border-t border-slate-200">
                    <button 
                      onClick={logout}
                      className="w-full flex items-center justify-center bg-red-50 text-red-600 text-sm font-medium py-2 px-4 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <User className="w-4 h-4 mr-1" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get the correct suffix for a year
const getYearSuffix = (year: number): string => {
  if (year === 1) return 'st';
  if (year === 2) return 'nd';
  if (year === 3) return 'rd';
  return 'th';
};

export default Profile;