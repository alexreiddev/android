# 13 — Full Linux Desktop with GPU Acceleration (XFCE + Termux:X11)

> Source: The Void Kernel, Video 13 — *Run OpenClaw & Claude Code on Android | Full Linux GPU Acceleration*

**Goal:** Install a full XFCE Linux desktop with hardware GPU acceleration via
Termux:X11, to run multiple AI agents at once.

## Prerequisites
- Termux
- Termux:X11 app
- Phantom Process Killer disabled

## Procedure

1. Run the Linux Desktop install command from the repo and select **XFCE (Option 1)**.
2. Type `./start-linux.sh` in Termux and open the Termux:X11 app to view the desktop.
3. Open a terminal inside the XFCE desktop to install and start Ollama and Claude Code.
4. Install OpenClaw, run `openclaw onboard`, and link it to Telegram.
5. Use the GUI desktop to manage local AI agents across multiple windowed terminals.
