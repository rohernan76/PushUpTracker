# 💪 Push-Up Tracker Project

This repository contains a complete push-up training toolkit, split into three purpose-driven components:

---

## 🛠 `sync-app/` — Push-Up Calendar Sync Automation

Automates syncing your push-up training dates with Google Calendar. This folder includes:

- `.command` files for use with Warp or macOS Terminal
- Integration with your Google Sheet: `PUSH_PULL_UP_Training_Plan_Updated_Every_Day`
- Uses `fresh_env/` Python virtual environment for calendar script dependencies
- Regenerates `.ics` calendar files automatically
- Can be launched directly from macOS using:
  - `launch_pushup_sync_warp.command`
  - `run_full_pushup_sync_warp_ready.command`

> 📌 Make sure `fresh_env/` remains in this folder or update all script references accordingly.

---

## 📊 `tracker-app/` — Web-Based Push-Up Logging Tracker

Interactive web app connected to a Google Apps Script backend. Features:

- Visual progress bars and weekly charts via Chart.js
- Daily training completion logging
- Streak counter and phase tracking
- `backend/` contains the exported `.gs` and `.html` source code
- `tracker-ui.html` is the UI portion hosted via GitHub Pages

---

## 🚀 `landing-page/` — Unified Entry Point

Provides a single access page that links to both:

- ✅ Calendar Sync tool (`sync-app/`)
- ✅ Progress Tracker (`tracker-app/`)

Hosted via GitHub Pages at:  
➡️ `https://rohernan76.github.io/PushUpTracker/landing-page/`

---

## 🧼 .gitignore Includes

This repo ignores:
- `.DS_Store` macOS files
- `.venv/` Python environments
- `backup/` and `_archived/` folders
- Any local `.app` launchers

---

## 🧭 Author

Created and maintained by [@rohernan76](https://github.com/rohernan76).  
Part of a hybrid automation system for performance, habit tracking, and personal growth.

