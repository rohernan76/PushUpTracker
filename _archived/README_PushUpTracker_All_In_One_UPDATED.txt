📅 Push-Up Training Automation Toolkit (Warp-Ready Edition — Using fresh_env)

🔁 Overview: What the Toolkit Does
----------------------------------
1. Downloads your updated training plan from Google Sheets as a `.csv`
2. Archives old `.csv` and `.ics` files into a timestamped folder
3. Activates your Python virtual environment (`fresh_env`)
4. Rebuilds your `.ics` calendar file using your `pushup_training_plan.py` script
5. Opens Google Calendar's import page and highlights the .ics file in Finder

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
- Your `.csv` is downloaded one level up and must be referenced with `../filename.csv` in your script

🚀 You're ready to track your push-up goals like a machine.
