# if [[ $(hyprctl activewindow -j | jq -r ".class") == "Steam" ]]; then
#     xdotool windowunmap $(xdotool getactivewindow)
# else
#     hyprctl dispatch killactive ""
# fi
if [[ $(hyprctl activewindow -j | jq -r ".class") =~ ^(Steam|qBitTorrent)$ ]]; then
    xdotool windowunmap $(xdotool getactivewindow)
else
    hyprctl dispatch killactive ""
fi
