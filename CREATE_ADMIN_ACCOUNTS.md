# 🔐 Quick Admin/Police Account Setup

## After you've created your Supabase project and run the SQL schema:

### Step 1: Create a Test User

1. Go to your signup page and create a normal account
2. Use any email (e.g., `admin@test.com`, `police@test.com`)
3. Complete the signup

### Step 2: Change Role to Admin or Police

**Option A: Via Supabase Dashboard (Easiest)**

1. Go to Supabase Dashboard
2. Click **Table Editor** (left sidebar)
3. Click **profiles** table
4. Find the row with your test user
5. Click the `role` field
6. Change from `user` to `admin` or `police`
7. Save (click the checkmark)

**Option B: Via SQL**

1. Go to **SQL Editor** in Supabase
2. Run this query (replace the email):

```sql
-- For Admin
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'admin@test.com';

-- For Police
UPDATE profiles 
SET role = 'police' 
WHERE email = 'police@test.com';
```

### Step 3: Login and Test

1. Go to `/login`
2. Login with your credentials
3. Admin users will be redirected to `/admin`
4. Police users will be redirected to `/police-dashboard`
5. Regular users will be redirected to `/dashboard`

---

## 📝 Recommended Test Accounts

Create these 3 accounts for demo:

1. **Regular User**
   - Email: `user@test.com`
   - Password: `test123456`
   - Role: `user` (default)

2. **Admin**
   - Email: `admin@test.com`
   - Password: `admin123456`
   - Role: `admin` (change manually)

3. **Police**
   - Email: `police@test.com`
   - Password: `police123456`
   - Role: `police` (change manually)

---

## ⚡ Quick SQL to Create All Test Accounts

Run this in Supabase SQL Editor (after changing passwords):

```sql
-- Update roles for test accounts
-- First create these accounts via signup page, then run:

UPDATE profiles SET role = 'admin' WHERE email = 'admin@test.com';
UPDATE profiles SET role = 'police' WHERE email = 'police@test.com';
```

That's it! 🎉
