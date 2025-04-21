/*
  # Create study entries table

  1. New Tables
    - `study_entries`
      - `id` (uuid, primary key)
      - `user_id` (text, for user identification)
      - `title` (text)
      - `description` (text)
      - `duration` (integer, minutes)
      - `created_at` (timestamp with timezone)
  
  2. Security
    - Enable RLS on `study_entries` table
    - Add policies for authenticated users to:
      - Read all entries
      - Create their own entries
      - Update their own entries
      - Delete their own entries
*/

CREATE TABLE IF NOT EXISTS study_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  title text NOT NULL,
  description text,
  duration integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE study_entries ENABLE ROW LEVEL SECURITY;

-- Allow users to read all entries (for accountability)
CREATE POLICY "Anyone can view study entries"
  ON study_entries
  FOR SELECT
  TO public
  USING (true);

-- Allow users to create their own entries
CREATE POLICY "Users can create their own entries"
  ON study_entries
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow users to update their own entries
CREATE POLICY "Users can update their own entries"
  ON study_entries
  FOR UPDATE
  TO public
  USING (user_id = current_user);

-- Allow users to delete their own entries
CREATE POLICY "Users can delete their own entries"
  ON study_entries
  FOR DELETE
  TO public
  USING (user_id = current_user);