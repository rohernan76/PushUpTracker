#!/bin/zsh

# Always run from the folder this script lives in
cd "$(dirname "$0")"

echo "📥 Downloading PUSH_UPS_TRAINING tab as CSV..."
curl -L "https://docs.google.com/spreadsheets/d/1JxhTZPgirjboJ-KmD_UIgY3nVGXb0KvPfsfptFeGBtY/gviz/tq?tqx=out:csv&sheet=PUSH_UPS_TRAINING" \
     -o "Push-up_Training_Plan_Updated_Every_Other_Day.csv"

if [ $? -eq 0 ]; then
  echo "✅ Download complete: Push-up_Training_Plan_Updated_Every_Other_Day.csv"
else
  echo "❌ Failed to download CSV. Please check your sharing settings or internet connection."
fi