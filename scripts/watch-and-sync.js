const chokidar = require('chokidar');
const { execSync } = require('child_process');
const path = require('path');

// Configuration
const WATCH_PATTERNS = [
  'src/**/*',
  'public/**/*',
  '*.json',
  '*.ts',
  '*.tsx',
  '*.css',
  '*.html'
];

const IGNORE_PATTERNS = [
  'node_modules/**',
  '.git/**',
  'dist/**',
  'build/**',
  '*.log'
];

let syncTimeout = null;
let isSyncing = false;

// Function to sync changes to GitHub
function syncToGitHub() {
  if (isSyncing) {
    console.log('⏳ Sync already in progress, skipping...');
    return;
  }

  isSyncing = true;
  
  try {
    console.log('🔄 Syncing changes to GitHub...');
    
    // Check if there are changes
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    
    if (status.trim()) {
      // Add all changes
      execSync('git add .', { stdio: 'inherit' });
      
      // Commit with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const commitMessage = `Auto-sync: ${timestamp}`;
      
      execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
      
      // Push to remote
      execSync('git push origin main', { stdio: 'inherit' });
      
      console.log('✅ Changes successfully synced to GitHub!');
    } else {
      console.log('ℹ️  No changes to sync');
    }
  } catch (error) {
    console.error('❌ Error syncing to GitHub:', error.message);
  } finally {
    isSyncing = false;
  }
}

// Debounced sync function
function debouncedSync() {
  if (syncTimeout) {
    clearTimeout(syncTimeout);
  }
  
  syncTimeout = setTimeout(() => {
    syncToGitHub();
  }, 2000); // Wait 2 seconds after last change before syncing
}

// Initialize file watcher
console.log('👀 Starting file watcher for auto-sync...');
console.log('📁 Watching patterns:', WATCH_PATTERNS.join(', '));

const watcher = chokidar.watch(WATCH_PATTERNS, {
  ignored: IGNORE_PATTERNS,
  persistent: true,
  ignoreInitial: true,
  awaitWriteFinish: {
    stabilityThreshold: 1000,
    pollInterval: 100
  }
});

// Event handlers
watcher
  .on('add', (filePath) => {
    console.log(`📄 File added: ${path.relative(process.cwd(), filePath)}`);
    debouncedSync();
  })
  .on('change', (filePath) => {
    console.log(`📝 File changed: ${path.relative(process.cwd(), filePath)}`);
    debouncedSync();
  })
  .on('unlink', (filePath) => {
    console.log(`🗑️  File deleted: ${path.relative(process.cwd(), filePath)}`);
    debouncedSync();
  })
  .on('error', (error) => {
    console.error('❌ Watcher error:', error);
  })
  .on('ready', () => {
    console.log('✅ File watcher ready! Changes will be automatically synced to GitHub.');
    console.log('💡 Press Ctrl+C to stop the watcher');
  });

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping file watcher...');
  watcher.close();
  process.exit(0);
}); 