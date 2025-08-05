import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Function to check if there are any changes
function hasChanges() {
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    return status.trim().length > 0;
  } catch (error) {
    console.error('Error checking git status:', error);
    return false;
  }
}

// Function to commit and push changes
function commitAndPush() {
  try {
    // Add all changes
    execSync('git add .', { stdio: 'inherit' });
    
    // Check if there are staged changes
    const staged = execSync('git diff --staged --name-only', { encoding: 'utf8' });
    
    if (staged.trim()) {
      // Commit with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const commitMessage = `Auto-sync: ${timestamp}`;
      
      execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
      
      // Push to remote
      execSync('git push origin main', { stdio: 'inherit' });
      
      console.log('✅ Changes automatically committed and pushed to GitHub');
    } else {
      console.log('ℹ️  No changes to commit');
    }
  } catch (error) {
    console.error('❌ Error committing/pushing changes:', error.message);
  }
}

// Main execution
if (import.meta.url === `file://${process.argv[1]}`) {
  if (hasChanges()) {
    console.log('🔄 Changes detected, committing and pushing...');
    commitAndPush();
  } else {
    console.log('ℹ️  No changes detected');
  }
}

export { hasChanges, commitAndPush }; 