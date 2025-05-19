
# 📅 Push-Up Training Automation Toolkit (Warp-Ready Edition — Using `fresh_env`)

This README walks you through your fully automated and Warp-compatible system for updating your push-up training calendar via Google Calendar.

---

## 🔁 Overview: What the Toolkit Does

1. Downloads your updated training plan from Google Sheets as a `.csv`
2. Archives old `.csv` and `.ics` files into a timestamped folder
3. Activates your Python virtual environment (`fresh_env`)
4. Rebuilds your `.ics` calendar file using your `pushup_training_plan.py` script
5. Opens the folder and prompts Google Calendar import

Your working directory is:

```
/Users/robertohernandez_macpro2020/Library/CloudStorage/GoogleDrive-rohernan@gmail.com/My Drive/MY REAL DRIVE/Training _ Health _ SportsPerformance/pushup_training_plan
```

You've created a Desktop alias to this directory called:

```
pushup_training_plan
```

---

## 📋 STEP-BY-STEP USAGE

### 1️⃣ First-Time Setup

#### a. Create and activate the virtual environment:

In Warp, run:

```bash
cd "/Users/robertohernandez_macpro2020/.../pushup_training_plan"
python3 -m venv fresh_env
source fresh_env/bin/activate
pip install icalendar pandas
```

##### 💡 Or use your custom alias:
If you’ve added this to your `.zshrc`:
```zsh
alias mkfreshvenv='python3 -m venv fresh_env && source fresh_env/bin/activate && echo "✅ Virtual environment activated: fresh_env"'
```
Then you can simply run:
```bash
mkfreshvenv
```

(Just don’t forget to run `source ~/.zshrc` after adding it.)

---

### 2️⃣ When You Update the Google Sheet

- Save changes to your training plan in the tab `PUSH_UPS_TRAINING`
- Make sure the sheet is still shared as “Anyone with the link – Viewer”

---

### 3️⃣ Run the Automation

Just double-click:

```
run_full_pushup_sync_warp_ready.command
```

This will:
- Archive any previous `.csv` or `.ics` files into `_archived/` with a timestamp
- Activate your `fresh_env` virtual environment
- Download the updated CSV from your Google Sheet
- Rebuild your `.ics` calendar file for Google Calendar
- Show a macOS notification and open the folder

---

### 4️⃣ Import to Google Calendar

1. Open [Google Calendar](https://calendar.google.com)
2. Go to ⚙️ **Settings** > **Import & export**
3. Import the new `.ics` file into your `Push-Up Training_2025` calendar

---

## 📂 Folder Recap

Your working folder contains:

- `Push-up_Training_Plan_Updated_Every_Other_Day.csv` ← fresh download
- `Push-up_Training_Plan_With_Tracking.ics` ← rebuilt iCal file
- `fresh_env/` ← your Python virtual environment
- `download_pushup_csv.command` ← grabs updated Google Sheet data
- `rebuild_pushup_ics.command` ← converts CSV to `.ics`
- `run_full_pushup_sync_warp_ready.command` ← one-click master launcher
- `pushup_training_plan.py` ← your calendar-generation logic
- `_archived/` ← auto-stored older `.csv` and `.ics` files

---

## ✅ You're Ready

You're now running a complete, resilient automation system — fully Warp- and calendar-integrated.

Crush those reps, Señor 💪🔥
