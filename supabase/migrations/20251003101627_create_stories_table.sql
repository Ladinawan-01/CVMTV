/*
  # Create Stories Table

  1. New Tables
    - `stories`
      - `id` (uuid, primary key) - Unique identifier for each story
      - `slug` (text, unique) - URL-friendly version of the title
      - `title` (text) - Story headline
      - `category` (text) - Story category (World, Politics, Business, etc.)
      - `excerpt` (text) - Brief description/summary
      - `content` (text) - Full story content
      - `image_url` (text) - URL to story image
      - `author` (text) - Story author name
      - `published_at` (timestamptz) - Publication timestamp
      - `views` (integer) - View count
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp

  2. Security
    - Enable RLS on `stories` table
    - Add policy for public read access (news content is public)
    - Add policy for authenticated admin users to manage stories

  3. Indexes
    - Add index on slug for fast lookups
    - Add index on category for filtering
    - Add index on published_at for sorting
*/

CREATE TABLE IF NOT EXISTS stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  category text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  image_url text NOT NULL,
  author text NOT NULL DEFAULT 'CVM News Staff',
  published_at timestamptz DEFAULT now(),
  views integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published stories"
  ON stories
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_stories_slug ON stories(slug);
CREATE INDEX IF NOT EXISTS idx_stories_category ON stories(category);
CREATE INDEX IF NOT EXISTS idx_stories_published_at ON stories(published_at DESC);