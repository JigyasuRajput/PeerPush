import React from 'react';
import { Calendar, Award, TrendingUp, BookMarked, Loader } from 'lucide-react';
import EntryCard from './EntryCard';
import { StudyEntry, UserStats } from '../types';
import { getUserStats } from '../utils/storage';

interface EntryListProps {
  entries: StudyEntry[];
  onUpdate: () => void;
  currentUser: string;
  loading: boolean;
}

const EntryList: React.FC<EntryListProps> = ({ entries, onUpdate, currentUser, loading }) => {
  const stats = getUserStats(currentUser, entries);
  
  if (loading) {
    return (
      <div className="card p-8 text-center animate-fade-in">
        <Loader className="h-12 w-12 text-purple-500 mx-auto mb-4 animate-spin" />
        <p className="text-gray-600">Loading entries...</p>
      </div>
    );
  }
  
  // Filter entries for current user and group by date
  const entriesByDate: Record<string, StudyEntry[]> = {};
  entries
    .filter(entry => entry.user === currentUser)
    .forEach(entry => {
      const date = new Date(entry.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      if (!entriesByDate[date]) {
        entriesByDate[date] = [];
      }
      entriesByDate[date].push(entry);
    });
  
  if (Object.keys(entriesByDate).length === 0) {
    return (
      <div className="card p-8 text-center animate-fade-in">
        <BookMarked className="h-12 w-12 text-purple-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Start Your Learning Journey</h2>
        <p className="text-gray-600">Log your first study session to begin tracking your progress!</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
          <Award className="mr-2 h-5 w-5 text-purple-600" />
          {currentUser}'s Progress
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-gradient-to-br from-purple-500 to-purple-600 p-4">
            <p className="text-purple-100 mb-1 font-medium">Total Sessions</p>
            <p className="text-3xl font-bold text-white">{stats.totalEntries}</p>
          </div>
          <div className="card bg-gradient-to-br from-blue-500 to-blue-600 p-4">
            <p className="text-blue-100 mb-1 font-medium">Total Time</p>
            <p className="text-3xl font-bold text-white">{stats.totalMinutes}<span className="text-lg ml-1">min</span></p>
          </div>
          <div className="card bg-gradient-to-br from-teal-500 to-teal-600 p-4">
            <p className="text-teal-100 mb-1 font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              Daily Average
            </p>
            <p className="text-3xl font-bold text-white">{stats.averageMinutesPerDay}<span className="text-lg ml-1">min</span></p>
          </div>
        </div>
      </div>
      
      {Object.entries(entriesByDate).map(([date, dateEntries]) => (
        <div key={date} className="animate-slide-up">
          <h2 className="text-lg font-medium mb-4 text-gray-700 flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-purple-600" />
            {date}
          </h2>
          <div className="space-y-4">
            {dateEntries.map(entry => (
              <EntryCard key={entry.id} entry={entry} onUpdate={onUpdate} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EntryList;