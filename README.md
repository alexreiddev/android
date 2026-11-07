# The Void Kernel — Android & AI Modification Guides

A reference collection summarizing the installation guides from **The Void Kernel**
YouTube channel (`@thevoidkernel`), covering Android OS modification, rooting,
privacy-focused ROMs, and running local/self-hosted AI agents on phones.

> These are condensed notes on publicly documented, mainstream open-source tools,
> intended for educational use on **your own devices**. Modifying device software
> (unlocking bootloaders, flashing ROMs) typically wipes data and can void
> warranties. Only perform security testing on networks and systems you own or
> are explicitly authorized to test.

## Contents

| # | Guide | Topic |
|---|-------|-------|
| 1 | [Kali NetHunter on a rooted phone](guides/01-kali-nethunter-rooted.md) | Kali NetHunter, Magisk |
| 2 | [Kali NetHunter without root (Termux)](guides/02-kali-nethunter-no-root.md) | Termux, VNC |
| 3 | [PostmarketOS native Linux](guides/03-postmarketos.md) | PostmarketOS, Waydroid |
| 4 | [Universal Magisk root](guides/04-magisk-universal-root.md) | Magisk, boot image patching |
| 5 | [OpenClaw with Gemini API](guides/05-openclaw-gemini.md) | OpenClaw, WhatsApp |
| 6 | [OpenClaw fully local (Ollama)](guides/06-openclaw-ollama.md) | OpenClaw, Ollama |
| 7 | [Nanobot lightweight agent](guides/07-nanobot.md) | Nanobot, Telegram |
| 8 | [CalyxOS privacy ROM](guides/08-calyxos.md) | CalyxOS, MicroG |
| 9 | [Claude Code via OpenRouter](guides/09-claude-code-openrouter.md) | Claude Code CLI |
| 10 | [PicoClaw on old hardware](guides/10-picoclaw.md) | PicoClaw, Ollama, Telegram |
| 11 | [Claude Code inside VS Code](guides/11-claude-code-vscode.md) | Claude Code, VS Code Server |
| 12 | [OpenClaw device control (Shizuku)](guides/12-shizuku-openclaw.md) | Shizuku, OpenClaw |
| 13 | [Full Linux GPU desktop (XFCE)](guides/13-linux-gpu-desktop.md) | Termux:X11, XFCE |
| 14 | [Uncensored local models offline](guides/14-uncensored-local-models.md) | llama.cpp |
| 15 | [Phone as a laptop](guides/15-phone-as-laptop.md) | Cursor, Blender, Wine apps |
| 16 | [Hermes local agent](guides/16-hermes-agent.md) | Hermes, Ollama |
| 17 | [Custom DeX desktop mode](guides/17-custom-dex-desktop.md) | Taskbar, SecondScreen |
| 18 | [Open Claude open-source agent](guides/18-open-claude.md) | Open Claude |
| 19 | [Windows apps on Android](guides/19-linux-windows-apps.md) | Box86/Box64, Wine |
| 20 | [Mainline Linux (pmbootstrap)](guides/20-mainline-linux-pmbootstrap.md) | PostmarketOS, Phosh |

## Themes

- **OS replacement & rooting** (1–4, 8, 20): Kali NetHunter, PostmarketOS, Magisk,
  CalyxOS, mainline Linux via pmbootstrap.
- **Linux desktop on Android** (13, 15, 17, 19): XFCE via Termux:X11 with GPU
  acceleration, desktop apps (Cursor, Blender), a DeX-style desktop mode, and running
  Windows `.exe` files through Box86/Box64 + Wine.
- **On-device AI agents** (5–7, 9–12, 14, 16, 18): OpenClaw, Nanobot, Claude Code,
  PicoClaw, Hermes, Open Claude, and uncensored local models — run via Termux, backed by
  cloud APIs (Gemini, OpenRouter) or local models (Ollama / llama.cpp), and controlled
  through WhatsApp, Telegram, a CLI, VS Code, or device automation via Shizuku.
