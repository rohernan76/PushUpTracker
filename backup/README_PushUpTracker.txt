
# Push-Up Training Automation Toolkit

## 🔁 Workflow Summary
This toolkit helps you maintain and update your push-up training schedule by automating:
1. Downloading the latest training data from your Google Sheet
2. Rebuilding the `.ics` calendar file based on that data
3. Opening the folder for easy importing into Google Calendar

---

## 📄 BEFORE YOU DO ANYTHING: Read `shortcuts.txt`
This file contains your exact step-by-step workflow for updating your training calendar. It's your quick-start guide.

---

## 🧰 What's Included

### 1. `download_pushup_csv.command`
Downloads the "PUSH_UPS_TRAINING" tab from your Google Sheet as a `.csv` file:
- Saves as `Push-up_Training_Plan_Updated_Every_Other_Day.csv`
- Destination: `~/.../pushup_training_plan` folder

### 2. `rebuild_pushup_ics.command`
Deletes old `.ics` files and generates a fresh `.ics` based on your latest CSV.
- Activates your `pushup_env` virtual environment
- Runs `pushup_training_plan.py`
- Opens the folder
- Notifies you when done
- Prompts to open Google Calendar’s import page

---

## 🛠 Requirements
- macOS (Zsh shell)
- Python 3.13+
- `icalendar` and `pandas` installed in your virtual environment
- `.csv` file downloaded via `download_pushup_csv.command`

---

## ✅ Usage Instructions
1. Double-click `download_pushup_csv.command`  
2. Double-click `rebuild_pushup_ics.command`  
3. Import `.ics` file into your Google Calendar

---

## 🧠 Customizations
- Change file or folder names? Update the `.command` files.
- Want it all in one master script? Ask ChatGPT to bundle both steps together.

Enjoy staying on track 💪
