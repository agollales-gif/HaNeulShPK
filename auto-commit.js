const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const WATCH_DIRECTORIES = ['src', 'public'];
const WATCH_FILES = ['package.json', 'vite.config.ts', 'vercel.json'];
const IGNORE_PATTERNS = ['node_modules', '.git', 'dist'];
const COMMIT_DELAY = 3000; // 3 seconds delay after last change

let timeoutId = null;
let isCommitting = false;

function log(message) {
    console.log(`[${new Date().toLocaleTimeString()}] ${message}`);
}

function hasChanges() {
    try {
        const status = execSync('git status --porcelain', { encoding: 'utf8' });
        return status.trim().length > 0;
    } catch (error) {
        return false;
    }
}

function autoCommit() {
    if (isCommitting) {
        log('⏳ Commit already in progress, skipping...');
        return;
    }

    if (!hasChanges()) {
        log('📝 No changes to commit');
        return;
    }

    isCommitting = true;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);

    try {
        log('🔄 Adding changes...');
        execSync('git add .', { stdio: 'inherit' });

        log('📝 Committing changes...');
        execSync(`git commit -m "Auto-commit: ${timestamp}

- Automated commit triggered by file watcher
- All detected changes included in this commit"`, { stdio: 'inherit' });

        log('🚀 Pushing to GitHub...');
        execSync('git push origin main', { stdio: 'inherit' });

        log('✅ Auto-commit completed successfully');
    } catch (error) {
        log(`❌ Error during auto-commit: ${error.message}`);
    } finally {
        isCommitting = false;
    }
}

function scheduleCommit() {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
        autoCommit();
    }, COMMIT_DELAY);
}

function watchFiles() {
    log('👀 Starting file watcher for auto-commits...');
    log(`📁 Watching: ${WATCH_DIRECTORIES.join(', ')}`);
    log(`📄 Watching files: ${WATCH_FILES.join(', ')}`);

    // Watch directories
    WATCH_DIRECTORIES.forEach(dir => {
        if (fs.existsSync(dir)) {
            fs.watch(dir, { recursive: true }, (eventType, filename) => {
                if (filename && !IGNORE_PATTERNS.some(pattern => filename.includes(pattern))) {
                    log(`📝 Change detected: ${path.join(dir, filename)}`);
                    scheduleCommit();
                }
            });
        }
    });

    // Watch specific files
    WATCH_FILES.forEach(file => {
        if (fs.existsSync(file)) {
            fs.watchFile(file, () => {
                log(`📝 Change detected: ${file}`);
                scheduleCommit();
            });
        }
    });

    log('✅ File watcher is active. Press Ctrl+C to stop.');
}

// Handle graceful shutdown
process.on('SIGINT', () => {
    log('🛑 Stopping file watcher...');
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    process.exit(0);
});

// Start watching
watchFiles();
