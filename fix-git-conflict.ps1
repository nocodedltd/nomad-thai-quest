# PowerShell script to fix the Git conflict
Write-Host "Fixing Git merge conflict..." -ForegroundColor Green

# Try to abort any ongoing revert/merge
try {
    git revert --abort 2>$null
    Write-Host "Aborted ongoing revert" -ForegroundColor Yellow
} catch {
    Write-Host "No revert to abort" -ForegroundColor Gray
}

try {
    git merge --abort 2>$null
    Write-Host "Aborted ongoing merge" -ForegroundColor Yellow
} catch {
    Write-Host "No merge to abort" -ForegroundColor Gray
}

# Stage the resolved file
Write-Host "Staging resolved file..." -ForegroundColor Green
git add src/components/lesson/course-viewer.tsx

# Check status
Write-Host "Current Git status:" -ForegroundColor Green
git status --porcelain

# Commit the resolution if needed
$status = git status --porcelain
if ($status) {
    Write-Host "Committing merge resolution..." -ForegroundColor Green
    git commit -m "Resolve merge conflict in course-viewer.tsx - restore userType functionality"
} else {
    Write-Host "No changes to commit" -ForegroundColor Gray
}

Write-Host "Git conflict resolution complete!" -ForegroundColor Green
