import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import { getEntries } from './utils/storage';
import { subscribeToEntries } from './utils/supabase';
import { StudyEntry } from './types';

function App() {
  const [entries, setEntries] = useState<StudyEntry[]>([]);
  const [currentUser, setCurrentUser] = useState<string>('User 1');
  const [loading, setLoading] = useState(true);
  
  const loadEntries = async () => {
    setLoading(true);
    const loadedEntries = await getEntries();
    setEntries(loadedEntries);
    setLoading(false);
  };
  
  useEffect(() => {
    loadEntries();
    
    // Subscribe to real-time updates
    const unsubscribe = subscribeToEntries(loadEntries);
    
    return () => {
      unsubscribe();
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <EntryForm 
              currentUser={currentUser} 
              onEntryAdded={loadEntries} 
            />
          </div>
          
          <div className="lg:col-span-2">
            <EntryList 
              entries={entries} 
              onUpdate={loadEntries}
              currentUser={currentUser}
              loading={loading}
            />
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-100 py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>Study Accountability App - Keep Learning Together</p>
        </div>
      </footer>
    </div>
  );
}

export default App;