# 15 — Replacing a Laptop with an Android Phone

> Source: The Void Kernel, Video 15 — *I Replaced My Laptop With a $400 Android Phone*

**Goal:** Extend the Linux GUI setup (Guide 13) to install Cursor AI, Google
Anti-Gravity, Blender, and PC games.

## Prerequisites
- Pre-installed Termux XFCE desktop (from [Guide 13](13-linux-gpu-desktop.md))

## Procedure

1. Start Ollama and Claude Code in the XFCE terminal.
2. **Google Anti-Gravity:** download the Linux version, run the repo's install scripts,
   edit the desktop shortcut command, and launch.
3. **Standard Linux apps:** `sudo apt install blender` and `sudo apt install openarena`
   for 3D modeling and gaming.
4. **Cursor AI:** download the ARM64 `.deb` from the Cursor site, extract it, move the
   executable to the desktop, and apply the repo's patch command to run it on Android.
