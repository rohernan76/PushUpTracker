from icalendar import Calendar, Event
import pandas as pd
import uuid
from datetime import datetime

# Load the updated CSV file (make sure it's in the same directory as this script)
csv_file = "Push-up_Training_Plan_Updated_Every_Other_Day.csv"
df = pd.read_csv(csv_file)

# Convert Training Date column to datetime
df["Training Date"] = pd.to_datetime(df["Training Date"]).dt.date

# Define the Google Sheets link for progress tracking
google_sheets_link = "https://docs.google.com/spreadsheets/d/1JxhTZPgirjboJ-KmD_UIgY3nVGXb0KvPfsfptFeGBtY/edit?usp=sharing"

# Create a new calendar
cal = Calendar()

# Create iCal events with the updated format
for i, row in df.iterrows():
    event = Event()
    event.add('summary', f'[Push-Up Training] - {row["Phase"]}')
    event.add('dtstart', row["Training Date"])
    event.add('dtend', row["Training Date"])
    event.add('description', f'Workout Day {i + 1}\n'
                              f'PHASE: {row["Phase"]}\n'
                              f'TARGET SETS: {row["Target Sets"]}\n'
                              f'TARGET REPS PER SET: {row["Target Reps per Set"]}\n'
                              f'TOTAL PUSH-UPS: {row["Total Target Push-ups"]}\n\n'
                              f'📊 **Track Your Progress Here:**\n{google_sheets_link}\n\n'
                              f'*** DELETE ALL "[Push-Up Training]" EVENTS TO REMOVE ***')
    event.add('categories', 'Push-up Training')
    event.add('organizer', 'mailto:pushup_training@yourdomain.com')  # Fake email for filtering
    event.add('uid', f'pushup-{uuid.uuid4()}')  # Unique identifier

    cal.add_component(event)

# Save the updated .ics file
ics_file = "Push-up_Training_Plan_With_Tracking.ics"
with open(ics_file, 'wb') as f:
    f.write(cal.to_ical())

print(f"✅ iCal file generated: {ics_file}")