# Auto-Sync Setup Guide

This project now has automatic GitHub syncing capabilities. Here's how to use them:

## 🚀 Quick Start

### Option 1: Real-time File Watching (Recommended)
Run this command to start watching for file changes and automatically sync them to GitHub:

```bash
npm run watch-sync
```

This will:
- Watch all your source files for changes
- Automatically commit and push changes after 2 seconds of inactivity
- Show real-time feedback in the console

### Option 2: Manual Sync
Run this command to manually sync all current changes:

```bash
npm run sync
```

### Option 3: Quick Commit & Push
Run this command for a quick commit and push:

```bash
npm run auto-commit
```

## 📋 What's Included

1. **GitHub Actions Workflow** (`.github/workflows/auto-sync.yml`)
   - Automatically runs on pushes to main branch
   - Builds and tests your project
   - Can be triggered manually from GitHub

2. **File Watcher Script** (`scripts/watch-and-sync.js`)
   - Monitors your project files in real-time
   - Automatically commits and pushes changes
   - Debounced to prevent excessive commits

3. **Manual Sync Script** (`scripts/auto-sync.js`)
   - One-time sync of all changes
   - Useful for manual control

## 🔧 Setup Steps

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Git (if not already done):**
   ```bash
   git config user.name "Your Name"
   git config user.email "your.email@example.com"
   ```

3. **Start Auto-Sync:**
   ```bash
   npm run watch-sync
   ```

## 📁 Files Being Watched

The watcher monitors:
- `src/**/*` - All source files
- `public/**/*` - Public assets
- `*.json` - Configuration files
- `*.ts`, `*.tsx` - TypeScript files
- `*.css` - Style files
- `*.html` - HTML files

## ⚠️ Important Notes

- Make sure you have write access to the GitHub repository
- The watcher will create commits with timestamps
- Changes are debounced (2-second delay) to prevent spam commits
- Press `Ctrl+C` to stop the file watcher

## 🛠️ Troubleshooting

If you encounter issues:

1. **Check Git Status:**
   ```bash
   git status
   ```

2. **Check Remote Configuration:**
   ```bash
   git remote -v
   ```

3. **Manual Push:**
   ```bash
   git add . && git commit -m "Manual sync" && git push origin main
   ```

## 🎯 Usage Examples

### Start Development with Auto-Sync
```bash
# Terminal 1: Start the file watcher
npm run watch-sync

# Terminal 2: Start your development server
npm run dev
```

### One-time Sync
```bash
# Sync all current changes
npm run sync
```

### Quick Development Workflow
```bash
# Make your changes in your editor
# The file watcher will automatically sync them to GitHub
# Check the console for sync status
```

## 🔄 GitHub Actions

The GitHub Actions workflow will:
- Run on every push to main
- Install dependencies
- Build the project
- Run tests (if available)
- Provide feedback in GitHub Actions tab

You can view the workflow runs in your GitHub repository under the "Actions" tab. 