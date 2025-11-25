-- =====================================================
-- BRTA 2.0 - Create Admin and Police Accounts
-- =====================================================
-- This creates admin and police accounts manually
-- IMPORTANT: Change the email and password before running!

-- Option 1: Create Admin Account
-- Change 'admin@brta.gov.bd' and 'AdminPass123!' to your desired values
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@brta.gov.bd',  -- CHANGE THIS EMAIL
  crypt('AdminPass123!', gen_salt('bf')),  -- CHANGE THIS PASSWORD
  NOW(),
  '{"full_name": "BRTA Admin", "role": "admin"}'::jsonb,
  NOW(),
  NOW(),
  '',
  ''
);

-- Option 2: Create Police Account
-- Change 'police@brta.gov.bd' and 'PolicePass123!' to your desired values
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'police@brta.gov.bd',  -- CHANGE THIS EMAIL
  crypt('PolicePass123!', gen_salt('bf')),  -- CHANGE THIS PASSWORD
  NOW(),
  '{"full_name": "BRTA Police", "role": "police"}'::jsonb,
  NOW(),
  NOW(),
  '',
  ''
);

-- NOTE: After running this, the profiles will be automatically created by the trigger!
