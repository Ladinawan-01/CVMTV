/*
  # Create User Profiles Table

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key) - Unique identifier for the profile
      - `email` (text, unique, not null) - User's email address
      - `full_name` (text) - User's full name
      - `profile_image_url` (text) - URL to user's profile image
      - `bio` (text) - User's biography/description
      - `created_at` (timestamptz) - Profile creation timestamp
      - `updated_at` (timestamptz) - Profile last update timestamp

  2. Security
    - Enable RLS on `user_profiles` table
    - Add policy for users to read their own profile
    - Add policy for users to insert their own profile
    - Add policy for users to update their own profile

  3. Important Notes
    - Profile images will be stored as URLs (external or Supabase storage)
    - Users can update their profile information after registration
    - Email is used as the identifier since we're using demo auth
*/

CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text DEFAULT '',
  profile_image_url text DEFAULT '',
  bio text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  USING (
    email = (
      SELECT json_extract_path_text(
        current_setting('request.jwt.claims', true)::json,
        'email'
      )
    )
    OR email IN (
      SELECT value::text 
      FROM json_each_text(current_setting('request.headers', true)::json)
      WHERE key = 'x-user-email'
    )
  );

CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  WITH CHECK (
    email = (
      SELECT json_extract_path_text(
        current_setting('request.jwt.claims', true)::json,
        'email'
      )
    )
    OR email IN (
      SELECT value::text 
      FROM json_each_text(current_setting('request.headers', true)::json)
      WHERE key = 'x-user-email'
    )
  );

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  USING (
    email = (
      SELECT json_extract_path_text(
        current_setting('request.jwt.claims', true)::json,
        'email'
      )
    )
    OR email IN (
      SELECT value::text 
      FROM json_each_text(current_setting('request.headers', true)::json)
      WHERE key = 'x-user-email'
    )
  )
  WITH CHECK (
    email = (
      SELECT json_extract_path_text(
        current_setting('request.jwt.claims', true)::json,
        'email'
      )
    )
    OR email IN (
      SELECT value::text 
      FROM json_each_text(current_setting('request.headers', true)::json)
      WHERE key = 'x-user-email'
    )
  );

CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);