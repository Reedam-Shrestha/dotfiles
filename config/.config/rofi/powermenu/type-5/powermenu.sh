#!/usr/bin/env bash

# =========================
# Icons
# =========================
shutdown=''
reboot=''
lock=''
suspend=''
logout=''
yes=''
no=''

# =========================
# System Info
# =========================
host=$(hostname)
lastlogin=$(last "$USER" | head -n 1 | awk '{print $4, $5, $6, $7}')
uptime=$(uptime -p | sed 's/up //')

# =========================
# Rofi Config
# =========================
dir="$HOME/.config/rofi/powermenu"
theme="type-5"

# Rofi Main Menu
rofi_cmd() {
    rofi -dmenu \
        -p " $USER@$host" \
        -mesg " Last Login: $lastlogin |  Uptime: $uptime" \
        -theme "${dir}/${theme}.rasi" \
	-nooverride \
        -window-type normal
}

# Rofi Confirmation Window
confirm_cmd() {
    rofi -dmenu \
        -theme-str 'window {location: center; anchor: center; fullscreen: false; width: 350px;}' \
        -theme-str 'mainbox {children: [ "message", "listview" ];}' \
        -theme-str 'listview {columns: 2; lines: 1;}' \
        -theme-str 'element-text {horizontal-align: 0.5;}' \
        -theme-str 'textbox {horizontal-align: 0.5;}' \
        -p "Confirmation" \
        -mesg "Are you sure?" \
        -theme "${dir}/${theme}.rasi"
}

# Ask Yes/No
confirm_exit() {
    echo -e "$yes\n$no" | confirm_cmd
}

# Show Menu Options
run_rofi() {
    echo -e "$shutdown\n$lock\n$suspend\n$reboot\n$logout" | rofi_cmd
}

# =========================
# Execute Selected Command
# =========================
run_cmd() {
    confirm=$(confirm_exit)

    [[ "$confirm" != "$yes" ]] && exit 0

    case "$1" in
        --shutdown) systemctl poweroff ;;
        --reboot) systemctl reboot ;;
        --suspend)
            mpc -q pause >/dev/null 2>&1
            amixer set Master mute >/dev/null 2>&1
            systemctl suspend
            ;;
        --logout)
            case "$DESKTOP_SESSION" in
                i3) i3-msg exit ;;
                bspwm) bspc quit ;;
                openbox) openbox --exit ;;
                plasma) qdbus org.kde.ksmserver /KSMServer logout 0 0 0 ;;
            esac
            ;;
    esac
}

# =========================
# Main
# =========================
chosen=$(run_rofi)

# Exit if ESC pressed
[[ -z "$chosen" ]] && exit 0

case "$chosen" in
    $shutdown) run_cmd --shutdown ;;
    $reboot) run_cmd --reboot ;;
    $lock)
        if command -v betterlockscreen >/dev/null; then
            betterlockscreen -l
        elif command -v i3lock >/dev/null; then
            i3lock
        else
            notify-send "No lockscreen installed."
        fi
        ;;
    $suspend) run_cmd --suspend ;;
    $logout) run_cmd --logout ;;
esac
