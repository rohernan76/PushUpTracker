#!/bin/zsh

# Set working directory to this script's folder
cd "$(dirname "$0")"

# Activate the correct virtual environment
source ./fresh_env/bin/activate

# Delete any previous .ics files
echo "🧹 Deleting old .ics files..."
rm -f *.ics

# Run the Python script
echo "⚙️ Rebuilding .ics file..."
python3 ./pushup_training_plan.py

# Optional: Open folder in Finder
open .

# Optional: Notification
osascript -e 'display notification "Your new Push-Up Training .ics file is ready!" with title "Push-Up Tracker"'