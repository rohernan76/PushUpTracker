#!/bin/zsh
osascript <<EOF
tell application "Warp"
    activate
    delay 0.5
    tell application "System Events"
        keystroke "cd \"~/Desktop/PushUpTracker/sync-app\" && ./run_full_pushup_sync_warp_ready.command"
        keystroke return
    end tell
end tell
EOF
