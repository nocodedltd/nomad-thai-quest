# 🚀 Live Preview Setup Guide

Your project is now configured for live preview deployment! Here are the options to get a live URL that you and your coworkers can access.

## 🌐 Option 1: GitHub Pages (Recommended - Free)

### Setup Steps:

1. **Go to your GitHub repository:**
   ```
   https://github.com/nocodedltd/nomad-thai-quest
   ```

2. **Navigate to Settings:**
   - Click on "Settings" tab in your repository
   - Scroll down to "Pages" in the left sidebar

3. **Configure GitHub Pages:**
   - Under "Source", select "GitHub Actions"
   - The deployment workflow is already configured

4. **Your Live URL will be:**
   ```
   https://nocodedltd.github.io/nomad-thai-quest
   ```

### How it works:
- ✅ Automatically deploys on every push to main branch
- ✅ Free hosting
- ✅ Custom domain support
- ✅ Team access through GitHub

## 🚀 Option 2: Vercel (Alternative - Free)

### Setup Steps:

1. **Go to Vercel:**
   ```
   https://vercel.com
   ```

2. **Connect your GitHub repository:**
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your repository: `nocodedltd/nomad-thai-quest`

3. **Deploy:**
   - Vercel will automatically detect it's a Vite project
   - Click "Deploy"
   - Your live URL will be provided

### Benefits:
- ✅ Automatic deployments
- ✅ Preview URLs for each commit
- ✅ Team collaboration
- ✅ Custom domains

## 🔄 Auto-Deployment

Both options will automatically deploy when you:
- Push changes to the main branch
- The auto-sync functionality will trigger deployments

## 📋 Current Status

✅ **GitHub Actions workflow** - Configured for GitHub Pages
✅ **Vercel configuration** - Ready for Vercel deployment
✅ **Auto-sync** - Will trigger deployments automatically

## 🎯 Quick Start

### For GitHub Pages:
1. Go to repository settings
2. Enable Pages with GitHub Actions
3. Wait for first deployment
4. Share the URL with your team

### For Vercel:
1. Visit vercel.com
2. Import your repository
3. Deploy
4. Share the URL

## 🔗 Your Live URLs

Once set up, your live preview URLs will be:

**GitHub Pages:**
```
https://nocodedltd.github.io/nomad-thai-quest
```

**Vercel (if you choose this option):**
```
https://nomad-thai-quest.vercel.app
```

## 👥 Team Access

- **GitHub Pages:** Anyone with the URL can access
- **Vercel:** Can be configured for team-only access
- **Both:** Update automatically when you push changes

## 🛠️ Troubleshooting

If deployments fail:
1. Check GitHub Actions tab for errors
2. Ensure `npm run build` works locally
3. Verify repository permissions

## 📱 Mobile Testing

Both platforms provide:
- Mobile-responsive preview
- Real-time updates
- Shareable URLs for testing

Choose GitHub Pages for simplicity, or Vercel for more advanced features! 