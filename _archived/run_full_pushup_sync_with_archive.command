#!/bin/zsh

# Set working directory
cd "/Users/robertohernandez_macpro2020/Library/CloudStorage/GoogleDrive-rohernan@gmail.com/My Drive/MY REAL DRIVE/Training _ Health _ SportsPerformance/pushup_training_plan"

# Timestamp for archive
timestamp=$(date +"%Y-%m-%d_%H-%M-%S")

# Define archive path
archive_dir="./_archived"
mkdir -p "$archive_dir"

# Archive old .csv and .ics if they exist
for file in Push-up_Training_Plan_Updated_Every_Other_Day.csv Push-up_Training_Plan_With_Tracking.ics; do
  if [ -f "$file" ]; then
    mv "$file" "$archive_dir/${timestamp}_$file"
    echo "📦 Archived $file as ${timestamp}_$file"
  fi
done

# Run download script
echo "📥 Downloading updated CSV..."
chmod +x download_pushup_csv.command
./download_pushup_csv.command

# Run rebuild script
echo "🛠️ Rebuilding ICS file..."
chmod +x rebuild_pushup_ics.command
./rebuild_pushup_ics.command

# Final message
echo "✅ Calendar rebuilt and previous files archived."
