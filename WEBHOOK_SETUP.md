# Clerk Webhook Setup for Auto-Sync

## ✅ Webhook Handler Created
I've created an automatic webhook handler at `/api/webhooks/clerk/route.ts` that will automatically sync:
- **Users** to your database when they sign up
- **Organizations** to your database when they're created
- **Organization memberships** when users join organizations

## 🔧 Setup Required in Clerk Dashboard

### Step 1: Get Your Webhook Secret
1. Go to your [Clerk Dashboard](https://dashboard.clerk.com/)
2. Go to **Webhooks** in the left sidebar
3. Click **"Add Endpoint"**
4. Set the **Endpoint URL** to: `https://your-domain.com/api/webhooks/clerk`
   - For local development: `https://your-ngrok-url.ngrok.io/api/webhooks/clerk`
5. Select these **Events**:
   - `user.created`
   - `organization.created` 
   - `organizationMembership.created`
6. Click **"Create"**
7. Copy the **Signing Secret** (starts with `whsec_`)

### Step 2: Update Your Environment Variables
Add this to your `.env.local` file:
```env
CLERK_WEBHOOK_SECRET=whsec_your_actual_webhook_secret_here
```

### Step 3: For Local Development (Optional)
If you want to test webhooks locally, use ngrok:
```bash
# Install ngrok if you haven't
npm install -g ngrok

# Expose your local server
ngrok http 3000

# Use the ngrok URL in Clerk webhook settings
# Example: https://abc123.ngrok.io/api/webhooks/clerk
```

## 🚀 How It Works Now

1. **User signs up** → Automatically synced to database
2. **User creates organization** → Organization automatically synced to database
3. **User joins organization** → Membership automatically synced
4. **No manual sync needed** → Everything happens automatically!

## 🎯 Benefits

- ✅ **No more manual syncing** - Everything happens automatically
- ✅ **Real-time updates** - Database stays in sync with Clerk
- ✅ **Better user experience** - Users can create job listings immediately
- ✅ **Reliable** - Webhooks ensure data consistency

## 📝 Next Steps

1. **Set up the webhook** in your Clerk dashboard
2. **Add the webhook secret** to your environment variables
3. **Test by creating a new organization** - it should auto-sync!
4. **Remove the manual sync page** if you want (it's no longer needed)

Your job board will now automatically sync all user and organization data! 🎉
