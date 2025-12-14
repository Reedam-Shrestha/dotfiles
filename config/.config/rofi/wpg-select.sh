#!/bin/bash

WALLPAPER_DIR="$HOME/.config/wpg/wallpapers" 
CACHE_DIR="$HOME/.cache/wpg-rofi-thumbs" 
ROFI_COLORS="$HOME/.cache/wal/colors-rofi-dark.rasi" 

mkdir -p "$CACHE_DIR" 
cd "$WALLPAPER_DIR" || exit 1 
 
generate_thumb() { 
 local img="$1" 

 local thumb_name=$(basename "$img" | sed 's/[^a-zA-Z0-9._-]/_/g').thumb.jpg 
 local thumb="$CACHE_DIR/$thumb_name"

  
 if [ ! -f "$thumb" ]; then 
	magick "$img" -resize 150x150^ -gravity center -extent 150x150 -quality 85 "$thumb" 2>/dev/null &
 fi
 echo "$thumb" 
} 

# --- Build Rofi entries
entries="" 
count=0 

while IFS= read -r -d '' img; do 
if [ -L "$img" ]; then 
name=$(basename "$img") 
thumb=$(generate_thumb "$img") 


	entries="${entries}${name}\0icon\x1f${thumb}\n"
	((count++))
fi 

done < <(find "$WALLPAPER_DIR" -maxdepth 1 -type l \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -print0 | sort -z) 
 
if [ -z "$entries" ]; then
 rofi -e "No wallpapers found in $WALLPAPER_DIR" -theme "$ROFI_COLORS"
 exit 1 
fi 
 
SELECTED=$(echo -en "$entries" | rofi -dmenu -i -p " Select Wallpaper" \
 -show-icons \
 -theme "$ROFI_COLORS" \
 -theme-str 'window {width: 90%; height: 220px;}' \
 -theme-str 'listview {columns: 5; lines: 1; flow: horizontal; scrollbar: true;}' \
 -theme-str 'scrollbar {width: 4px;}' \
 -theme-str 'element {padding: 10px; orientation: vertical;}' \
 -theme-str 'element-icon {size: 120px;}' \
 -theme-str 'element-text {horizontal-align: 0.5; enabled: false;}' ) 
 
if [ -n "$SELECTED" ]; then 
  wpg -s "$WALLPAPER_DIR/$SELECTED"
  wpg -s "$WALLPAPER_DIR/$SELECTED" --no-backend >/dev/null 2>&1
  wal -q -n -i "$WALLPAPER_DIR/$SELECTED"
  ~/.local/bin/xborders-update
fi
