#!/bin/zsh
osascript <<EOF
tell application "Warp"
    activate
    delay 0.5
    tell application "System Events"
        keystroke "cd \"~/Library/CloudStorage/GoogleDrive-rohernan@gmail.com/My Drive/MY REAL DRIVE/Training _ Health _ SportsPerformance/pushup_training_plan/EXECUTE FROM HERE\" && ./run_full_pushup_sync_warp_ready.command"
        keystroke return
    end tell
end tell
EOF