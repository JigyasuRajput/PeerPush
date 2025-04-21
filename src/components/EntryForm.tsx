import React, { useState } from 'react';
import { PlusCircle, Clock, BookOpen, X } from 'lucide-react';
import { StudyEntry } from '../types';
import { addEntry } from '../utils/storage';

interface EntryFormProps {
  currentUser: string;
  onEntryAdded: () => void;
}

const EntryForm: React.FC<EntryFormProps> = ({ currentUser, onEntryAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Please enter a title');
      return;
    }
    
    if (!duration || isNaN(Number(duration)) || Number(duration) <= 0) {
      setError('Please enter a valid duration');
      return;
    }
    
    const newEntry: StudyEntry = {
      id: crypto.randomUUID(),
      user: currentUser,
      title: title.trim(),
      description: description.trim(),
      duration: Number(duration),
      date: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    
    addEntry(newEntry);
    setTitle('');
    setDescription('');
    setDuration('');
    setError('');
    onEntryAdded();
  };

  return (
    <div className="card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <BookOpen className="mr-2 h-5 w-5 text-purple-600" />
          Log Study Session
        </h2>
        {error && (
          <div className="flex items-center text-red-500 text-sm">
            <span>{error}</span>
            <button 
              onClick={() => setError('')}
              className="ml-2 hover:text-red-600"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            What did you study?
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
            placeholder="JavaScript fundamentals, algorithms, etc."
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Additional details (optional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
            rows={3}
            placeholder="What specific topics did you cover?"
          />
        </div>
        
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Clock className="h-4 w-4 mr-1 text-purple-500" />
            Duration (minutes)
          </label>
          <input
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="input-field"
            placeholder="60"
            min="1"
          />
        </div>
        
        <button
          type="submit"
          className="btn-primary w-full flex items-center justify-center"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Log Study Session
        </button>
      </form>
    </div>
  );
};

export default EntryForm;