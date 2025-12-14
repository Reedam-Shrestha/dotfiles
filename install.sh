#!/bin/bash
# install.sh — restore your Arch + i3 dotfiles

set -e  # exit on error

# -----------------------------
# 1️⃣ Install required packages
# -----------------------------
echo "Installing essential packages..."
sudo pacman -Syu --needed git stow base-devel xorg i3 polybar picom rofi fish neofetch kitty pcmanfm dmenu dunst vlc wget curl -y

# Optional: add your AUR packages via yay
if command -v yay &> /dev/null; then
    echo "Installing AUR packages..."
    yay -S --needed brave-bin microsoft-edge-stable-bin localsend-bin picom-git wpgtk -y
fi

# -----------------------------
# 2️⃣ Clone dotfiles repo (if not exists)
# -----------------------------
DOTFILES="$HOME/dotfiles"
if [ ! -d "$DOTFILES" ]; then
    echo "Cloning dotfiles..."
    git clone git@github.com:Reedam-Shrestha/dotfiles.git "$DOTFILES"
fi

cd "$DOTFILES"

# -----------------------------
# 3️⃣ Ensure target directories exist
# -----------------------------
mkdir -p "$HOME/.config"
mkdir -p "$HOME/.local/share"

# -----------------------------
# 4️⃣ Use Stow to restore configs
# -----------------------------
echo "Stowing config..."
stow config
echo "Stowing local..."
stow local

# -----------------------------
# 5️⃣ Done
# -----------------------------
echo "Dotfiles installed successfully!"
