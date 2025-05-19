#!/bin/zsh
open -a Warp
sleep 1
osascript -e 'tell application "System Events" to keystroke "cd ~/Desktop/PushUpTracker/sync-app && ./run_full_pushup_sync_warp_ready.command"' -e 'tell application "System Events" to key code 36'
