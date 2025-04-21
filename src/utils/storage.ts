import { StudyEntry, UserStats } from '../types';
import { supabase } from './supabase';

export const getEntries = async (): Promise<StudyEntry[]> => {
  const { data, error } = await supabase
    .from('study_entries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching entries:', error);
    return [];
  }

  return data.map(entry => ({
    id: entry.id,
    user: entry.user_id,
    title: entry.title,
    description: entry.description || '',
    duration: entry.duration,
    date: entry.created_at,
    createdAt: entry.created_at
  }));
};

export const addEntry = async (entry: StudyEntry): Promise<void> => {
  const { error } = await supabase
    .from('study_entries')
    .insert({
      id: entry.id,
      user_id: entry.user,
      title: entry.title,
      description: entry.description,
      duration: entry.duration,
      created_at: entry.createdAt
    });

  if (error) {
    console.error('Error adding entry:', error);
  }
};

export const removeEntry = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('study_entries')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error removing entry:', error);
  }
};

export const updateEntry = async (entry: StudyEntry): Promise<void> => {
  const { error } = await supabase
    .from('study_entries')
    .update({
      title: entry.title,
      description: entry.description,
      duration: entry.duration
    })
    .eq('id', entry.id);

  if (error) {
    console.error('Error updating entry:', error);
  }
};

export const getUserStats = (username: string, entries: StudyEntry[]): UserStats => {
  const userEntries = entries.filter(entry => entry.user === username);
  
  const totalEntries = userEntries.length;
  const totalMinutes = userEntries.reduce((sum, entry) => sum + entry.duration, 0);
  
  const uniqueDays = new Set(userEntries.map(entry => entry.date.split('T')[0])).size;
  const averageMinutesPerDay = uniqueDays ? Math.round(totalMinutes / uniqueDays) : 0;
  
  return {
    totalEntries,
    totalMinutes,
    averageMinutesPerDay
  };
};