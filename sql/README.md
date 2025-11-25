# 📁 SQL Setup Files

This folder contains all SQL commands needed to set up your BRTA 2.0 database in Supabase.

## 🚀 Quick Setup (Easiest)

**Run this ONE file and you're done:**
- `00_complete_setup.sql` - All-in-one setup file

## 📝 Step-by-Step Setup (If you prefer)

Run these files in order:

1. `01_create_profiles_table.sql` - Creates the profiles table
2. `02_create_security_policies.sql` - Sets up security policies
3. `03_create_auto_profile_trigger.sql` - Auto-creates profiles on signup
4. `04_create_admin_police_accounts.sql` - Creates admin/police accounts (edit first!)

## 📋 How to Run SQL Files

1. Go to your Supabase project dashboard
2. Click **SQL Editor** in the left sidebar
3. Click **"New Query"**
4. Copy and paste the SQL from the file
5. Click **"Run"** (or press Ctrl+Enter)
6. Wait for "Success. No rows returned" message

## ⚠️ Important Notes

- **Run `00_complete_setup.sql` FIRST** before creating admin/police accounts
- **Edit `04_create_admin_police_accounts.sql`** to change the default email and password
- These files are safe to re-run (they drop and recreate objects)

## 🔐 Default Credentials (after running file 04)

**Admin:**
- Email: admin@brta.gov.bd
- Password: AdminPass123!

**Police:**
- Email: police@brta.gov.bd
- Password: PolicePass123!

**⚠️ CHANGE THESE IN THE SQL FILE BEFORE RUNNING!**
