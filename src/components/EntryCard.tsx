import React, { useState } from 'react';
import { Clock, Trash2, Edit2, X, Check, BookOpen } from 'lucide-react';
import { StudyEntry } from '../types';
import { removeEntry, updateEntry } from '../utils/storage';

interface EntryCardProps {
  entry: StudyEntry;
  onUpdate: () => void;
}

const EntryCard: React.FC<EntryCardProps> = ({ entry, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(entry.title);
  const [editDescription, setEditDescription] = useState(entry.description);
  const [editDuration, setEditDuration] = useState(entry.duration.toString());
  
  const formattedDate = new Date(entry.date).toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      removeEntry(entry.id);
      onUpdate();
    }
  };
  
  const handleSaveEdit = () => {
    if (!editTitle.trim() || !editDuration || isNaN(Number(editDuration)) || Number(editDuration) <= 0) {
      return;
    }
    
    const updatedEntry: StudyEntry = {
      ...entry,
      title: editTitle.trim(),
      description: editDescription.trim(),
      duration: Number(editDuration)
    };
    
    updateEntry(updatedEntry);
    setIsEditing(false);
    onUpdate();
  };
  
  const handleCancelEdit = () => {
    setEditTitle(entry.title);
    setEditDescription(entry.description);
    setEditDuration(entry.duration.toString());
    setIsEditing(false);
  };
  
  const userColor = entry.user === 'User 1' 
    ? 'bg-gradient-to-r from-purple-500 to-purple-600'
    : 'bg-gradient-to-r from-blue-500 to-blue-600';
  
  return (
    <div className="card p-4 transition-all duration-300 hover:shadow-xl group">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-3">
          <span className={`text-xs font-medium py-1 px-3 rounded-full text-white ${userColor}`}>
            {entry.user}
          </span>
          <span className="text-gray-500 text-sm">{formattedDate}</span>
        </div>
        
        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {!isEditing ? (
            <>
              <button 
                onClick={() => setIsEditing(true)} 
                className="btn-secondary p-1"
                aria-label="Edit entry"
              >
                <Edit2 size={14} />
              </button>
              <button 
                onClick={handleDelete} 
                className="btn-secondary p-1 hover:bg-red-50 hover:text-red-500 hover:border-red-200"
                aria-label="Delete entry"
              >
                <Trash2 size={14} />
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={handleSaveEdit} 
                className="btn-secondary p-1 hover:bg-green-50 hover:text-green-500 hover:border-green-200"
                aria-label="Save changes"
              >
                <Check size={14} />
              </button>
              <button 
                onClick={handleCancelEdit} 
                className="btn-secondary p-1 hover:bg-red-50 hover:text-red-500 hover:border-red-200"
                aria-label="Cancel editing"
              >
                <X size={14} />
              </button>
            </>
          )}
        </div>
      </div>
      
      {!isEditing ? (
        <>
          <div className="flex items-start space-x-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <BookOpen className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{entry.title}</h3>
              {entry.description && (
                <p className="text-gray-600 text-sm mt-1">{entry.description}</p>
              )}
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <Clock size={14} className="mr-1" />
                <span>{entry.duration} minutes</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="input-field"
            placeholder="What did you study?"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="input-field"
            rows={2}
            placeholder="Additional details (optional)"
          />
          <div className="flex items-center space-x-2">
            <Clock size={14} className="text-gray-500" />
            <input
              type="number"
              value={editDuration}
              onChange={(e) => setEditDuration(e.target.value)}
              className="input-field w-24"
              min="1"
            />
            <span className="text-sm text-gray-500">minutes</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EntryCard;