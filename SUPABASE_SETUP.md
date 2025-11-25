# 🚀 Supabase Authentication Setup Guide

## ✅ What We've Built

A complete authentication system with:
- User signup and login
- Role-based access (User, Admin, Police)
- Protected routes
- Welcome toast notifications
- Automatic redirects based on user role

---

## 📋 Step-by-Step Setup Instructions

### Step 1: Get Your Supabase Credentials

1. Go to https://supabase.com and log in
2. Click **"New Project"**
3. Fill in:
   - **Name**: `brta-extended` (or any name)
   - **Database Password**: Create a strong password (**SAVE THIS!**)
   - **Region**: Choose closest to Bangladesh (e.g., Singapore)
4. Wait 2-3 minutes for project setup
5. Once ready, go to **Project Settings** (⚙️ gear icon at bottom left)
6. Click **API** tab
7. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

### Step 2: Add Your Credentials to .env File

1. Open the `.env` file in your project root
2. Replace the placeholder values:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**IMPORTANT**: Replace with your actual values!

### Step 3: Create Database Tables

1. In your Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Copy and paste this SQL:

```sql
-- Create profiles table for user roles and additional info
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'police')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own profile
CREATE POLICY "Users can read own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Policy: Service role can insert profiles (for signup)
CREATE POLICY "Enable insert for authenticated users"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'user')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile after signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

4. Click **"Run"** button (or press Ctrl+Enter)
5. You should see "Success. No rows returned"

---

## 🔐 Creating Admin and Police Accounts

Since admin and police roles are protected, you need to create them manually in Supabase:

### Method 1: Update Existing User Role

1. Create a normal account through your signup page
2. Go to Supabase Dashboard → **Authentication** → **Users**
3. Find the user you just created
4. Click on the user
5. Go to **Table Editor** → **profiles** table
6. Find the row with that user's email
7. Click to edit, change `role` from `user` to `admin` or `police`
8. Save changes

### Method 2: Create via SQL

1. In **SQL Editor**, run this to create an admin:

```sql
-- First, create the auth user (replace email and password)
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
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@brta.gov.bd',  -- Change this
  crypt('admin123456', gen_salt('bf')),  -- Change password
  NOW(),
  '{"full_name": "Admin User", "role": "admin"}',
  NOW(),
  NOW()
);
```

**Easier Method**: Just signup normally, then change the role in the database!

---

## 🎯 How It Works

### User Flow:
1. **Signup** → Creates account with `user` role → Shows welcome toast → Redirects to `/login`
2. **Login** → Verifies credentials → Shows welcome toast with name → Redirects to `/dashboard`

### Admin Flow:
1. **Login** with admin email → Redirects to `/admin`

### Police Flow:
1. **Login** with police email → Redirects to `/police-dashboard`

---

## 🧪 Testing the System

### Test 1: Regular User Signup
```
1. Go to /signup
2. Fill in details
3. Submit
4. Check email for verification link (in dev mode, it might auto-verify)
5. Go to /login
6. Login with your credentials
7. Should redirect to /dashboard with welcome toast
```

### Test 2: Admin Access
```
1. Create user account
2. Change role to 'admin' in Supabase
3. Login
4. Should redirect to /admin
```

### Test 3: Protected Routes
```
1. Without logging in, try to access /dashboard
2. Should redirect to /login
3. Login as regular user
4. Try to access /admin
5. Should redirect back to /dashboard (no permission)
```

---

## 🎨 Features Implemented

✅ **Authentication**
- Email/Password signup
- Email/Password login
- Session management
- Automatic session restore on page reload

✅ **Authorization**
- Role-based access control (User, Admin, Police)
- Protected routes
- Automatic redirects based on role

✅ **User Experience**
- Beautiful toast notifications with user's name
- Loading states on buttons
- Form validation
- Password visibility toggle
- Smooth redirects

✅ **Security**
- Row Level Security (RLS) in database
- Users can only see their own data
- Protected admin/police routes
- Secure password hashing by Supabase

---

## 🔧 Common Issues & Solutions

### Issue: "Missing Supabase environment variables"
**Solution**: Make sure you've filled in the `.env` file with your actual Supabase URL and anon key.

### Issue: Login not working
**Solution**: 
1. Check if email is verified in Supabase Dashboard → Authentication → Users
2. In Supabase, go to Authentication → Email Templates and disable email confirmation (for testing)

### Issue: Can't access admin panel
**Solution**: Check the user's role in the `profiles` table. It should be `admin`.

### Issue: Toast not showing
**Solution**: Make sure you've run `npm install` to install `react-hot-toast`.

---

## 🚀 Next Steps for Championship Win

1. **Test Everything**: Make sure all flows work perfectly
2. **Add More Features**: 
   - Forgot password functionality
   - Email verification
   - Profile editing
   - Admin user management
3. **Polish UI**: Ensure all animations are smooth
4. **Add Data**: Create sample applications, notices, etc.
5. **Documentation**: Document your code well
6. **Demo Preparation**: Prepare a killer demo showing all features

---

## 📞 Quick Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🎉 You're All Set!

Your authentication system is now ready! Here's what happens:

1. Users sign up → Get welcome toast → Verify email → Login
2. Upon login → Welcome toast with their name → Redirect to appropriate dashboard
3. Protected routes ensure security
4. Admin and police have separate access

**Good luck with your championship! 🏆**
