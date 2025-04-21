import React from 'react';
import { BookOpen, Users } from 'lucide-react';

interface HeaderProps {
  currentUser: string;
  setCurrentUser: (user: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, setCurrentUser }) => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-2 rounded-lg mr-3">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Study Accountability
              </h1>
              <p className="text-sm text-gray-500">Track progress together</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Users className="h-5 w-5 text-gray-400" />
            <div className="bg-gray-100 p-1 rounded-lg flex space-x-1">
              <button
                onClick={() => setCurrentUser('User 1')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  currentUser === 'User 1'
                    ? 'bg-white text-purple-700 shadow-sm'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                User 1
              </button>
              <button
                onClick={() => setCurrentUser('User 2')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  currentUser === 'User 2'
                    ? 'bg-white text-purple-700 shadow-sm'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                User 2
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;