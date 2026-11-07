# 02 — Kali NetHunter Without Root (Termux)

> Source: The Void Kernel, Video 2 — *How to Install Kali Linux on Any Android: Complete Guide (No Root Required)*

**Goal:** Install Kali NetHunter on a non-rooted device using Termux, with a graphical
desktop reached over VNC.

## Prerequisites
- Termux app
- NetHunter KeX app (VNC client)

## Procedure

1. Open Termux, run `termux-setup-storage`, and grant permissions.
2. Update packages: `pkg update && pkg upgrade`
3. Install Wget: `pkg install wget`
4. Download the NetHunter install script with `wget` (link from the project repo) and run it.
5. Choose **option 1** for the full Kali NetHunter package.
6. Enter the Kali terminal with `nh`, then update: `apt update`
7. Set up the GUI: type `exit`, then `nhex` to initialize the VNC server. Set a
   password (decline view-only). Note the port number (e.g. `5901`).
8. Open the NetHunter KeX app, add a connection with that port and password, and launch the desktop.

## Troubleshooting
- If the connection fails, disable **Phantom Process Killer** in Android Developer Options.
