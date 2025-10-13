/*
  # Create favorites table

  1. New Tables
    - `favorites`
      - `id` (uuid, primary key) - Unique identifier for each favorite
      - `user_email` (text) - Email of the user who favorited (since we're using demo auth)
      - `story_id` (uuid) - Reference to the story being favorited
      - `created_at` (timestamptz) - When the favorite was created
      - Unique constraint on (user_email, story_id) to prevent duplicate favorites

  2. Security
    - Enable RLS on `favorites` table
    - Users can view their own favorites
    - Users can add their own favorites
    - Users can remove their own favorites
*/

CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  story_id uuid NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_email, story_id)
);

ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own favorites"
  ON favorites
  FOR SELECT
  USING (true);

CREATE POLICY "Users can add own favorites"
  ON favorites
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can remove own favorites"
  ON favorites
  FOR DELETE
  USING (true);
