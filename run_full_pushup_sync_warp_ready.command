#!/bin/zsh

# Change to this script's directory
cd "$(dirname "$0")"

# Timestamp for archive
timestamp=$(date +"%Y-%m-%d_%H-%M-%S")

# Archive previous .csv and .ics files
mkdir -p ../_archived
for file in Push-up_Training_Plan_Updated_Every_Other_Day.csv Push-up_Training_Plan_With_Tracking.ics; do
  if [ -f "$file" ]; then
    mv "$file" ../_archived/${timestamp}_$file
    echo "📦 Archived $file as ${timestamp}_$file"
  fi
done

# Activate virtual environment
echo "🐍 Activating virtual environment..."
source ../fresh_env/bin/activate

# Run automation steps
echo "📥 Running: download_pushup_csv.command"
./download_pushup_csv.command

echo "🛠️ Running: rebuild_pushup_ics.command"
./rebuild_pushup_ics.command

# Final feedback
echo "✅ All done! Opening Google Calendar import page..."
open "https://calendar.google.com/calendar/u/0/r/settings/export"
open -R "Push-up_Training_Plan_With_Tracking.ics"