#!/bin/zsh

# Set working directory
cd "/Users/robertohernandez_macpro2020/Library/CloudStorage/GoogleDrive-rohernan@gmail.com/My Drive/MY REAL DRIVE/Training _ Health _ SportsPerformance/pushup_training_plan"

# Download the latest push-up training CSV
echo "📥 Running: download_pushup_csv.command"
chmod +x download_pushup_csv.command
./download_pushup_csv.command

# Rebuild the ICS file
echo "🔁 Running: rebuild_pushup_ics.command"
chmod +x rebuild_pushup_ics.command
./rebuild_pushup_ics.command

# Done
echo "✅ Master automation complete."
