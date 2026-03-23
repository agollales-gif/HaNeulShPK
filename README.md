<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/141f4d10-5df9-445f-a3ce-00ae59bebc31

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Auto-Commit Setup

This project includes automatic git commits for every change:

### Method 1: Git Hook (Automatic)
- Pre-commit hook automatically commits and pushes changes
- Activates when you run `git commit`

### Method 2: File Watcher (Real-time)
```bash
npm run auto-commit
```
- Watches for file changes in `src/`, `public/`, and config files
- Auto-commits 3 seconds after last change
- Runs continuously until stopped

### Method 3: Manual Quick Commit
```bash
npm run commit-push
```
- Quick one-liner to commit and push all changes

**Note:** Auto-commits include timestamps and descriptive messages for tracking development progress.
