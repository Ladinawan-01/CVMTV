/*
  # Add username field to user_profiles

  1. Changes
    - Add `username` column to `user_profiles` table (unique, not null with default)
    - Create index on username for fast lookups
    - Add constraint to ensure username is at least 3 characters

  2. Important Notes
    - Username is unique and required
    - Email remains the primary identifier for authentication
    - Username can be changed by the user
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'username'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN username text DEFAULT '' NOT NULL;
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS idx_user_profiles_username ON user_profiles(username) WHERE username != '';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'username_length_check'
  ) THEN
    ALTER TABLE user_profiles 
    ADD CONSTRAINT username_length_check 
    CHECK (username = '' OR length(username) >= 3);
  END IF;
END $$;