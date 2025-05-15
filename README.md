![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
[![GitHub](https://img.shields.io/badge/GitHub-PushUpTracker-blue?logo=github)](https://github.com/rohernan76/PushUpTracker)

📅 Push-Up Training Automation Toolkit (Warp-Ready Edition — Using fresh_env)

🔁 Overview: What the Toolkit Does
----------------------------------
1. Downloads your updated training plan from Google Sheets as a `.csv`
2. Archives old `.csv` and `.ics` files into a timestamped folder
3. Activates your Python virtual environment (`fresh_env`)
4. Rebuilds your `.ics` calendar file using your `pushup_training_plan.py` script
5. Opens Google Calendar's export page and highlights the .ics file in Finder

📋 STEP-BY-STEP USAGE

1️⃣ First-Time Setup (Run Once)
------------------------------
cd ~/.../EXECUTE FROM HERE
python3 -m venv ../fresh_env
source ../fresh_env/bin/activate
pip install icalendar pandas

2️⃣ Update the Google Sheet
----------------------------
- Update your PUSH_UPS_TRAINING tab
- Make sure the sheet is shared with “Anyone with the link – Viewer”

3️⃣ Run the Automation
----------------------
Double-click `PushUp Sync.app` in your Dock, or run:
./run_full_pushup_sync_warp_ready.command

✔ Archives previous .csv/.ics
✔ Downloads new .csv via curl
✔ Rebuilds .ics from your pushup_training_plan.py
✔ Opens Google Calendar + highlights the .ics

🧭 Notes
--------
- Your `.ics` appears in the same folder as the script
- Your `.csv` is downloaded into the same folder and referenced locally


🧹 How to Bulk Delete All Training Events
----------------------------------------

All calendar events created by this automation include the following line in their description:

*** DELETE ALL "[Push-Up Training]" EVENTS TO REMOVE ***

To remove all training events from your Google Calendar:

1. Open https://calendar.google.com
2. Use the search bar at the top to search for:
   [Push-Up Training]
3. Press Enter — this will list all related events
4. Click into any result, then:
   - Select "Delete"
   - Choose "All events in the series" if applicable

💡 You can also search for just DELETE ALL as a catch-all keyword to clean up old calendar data.
