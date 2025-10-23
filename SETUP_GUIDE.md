# Job Board AI - Setup Guide

## ✅ Database Setup Complete
Your PostgreSQL database is now connected and working!

## 🔐 Authentication Setup Required

To create job listings, you need to:

### 1. Sign In with Clerk
- Go to your application at `http://localhost:3000`
- Click "Sign In" in the top right
- Create an account or sign in with Google/GitHub

### 2. Create an Organization
- After signing in, you'll be prompted to create or select an organization
- Click "Create Organization" 
- Enter your company name (e.g., "My Company")
- This gives you the permissions needed to create job listings

### 3. Set Organization Permissions
- In your Clerk dashboard (https://dashboard.clerk.com/)
- Go to "Organizations" → "Members"
- Make sure you have "Admin" role
- This gives you the `org:job_listings:create` permission

## 🚀 How to Create Job Listings

### Option 1: Save as Draft
- Fill out the job listing form
- Click "Save as Draft"
- Review and edit later
- Publish when ready

### Option 2: Create & Publish Immediately
- Fill out the job listing form
- Click "Create & Publish"
- Job listing goes live immediately

## 🔧 Troubleshooting

### "You don't have permission" Error
1. Make sure you're signed in
2. Make sure you have an organization
3. Make sure you're an admin of the organization
4. Check your Clerk dashboard permissions

### Organization Not Found
1. Go to `/organizations/select` in your app
2. Create a new organization
3. Make sure you're the admin

## 📝 Next Steps

1. **Sign in** to your application
2. **Create an organization** 
3. **Create your first job listing**
4. **Test the publish functionality**

Your job board is now ready to use! 🎉
