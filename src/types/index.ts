export interface StudyEntry {
  id: string;
  user: string;
  title: string;
  description: string;
  duration: number; // in minutes
  date: string; // ISO string
  createdAt: string; // ISO string for sorting
}

export interface UserStats {
  totalEntries: number;
  totalMinutes: number;
  averageMinutesPerDay: number;
}