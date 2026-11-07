# 12 — OpenClaw with Device Control via Shizuku

> Source: The Void Kernel, Video 12 — *I Turned My Android Into an AI Agent Machine (Shizuku + OpenClaw)*

**Goal:** Give OpenClaw physical control of an unrooted phone (launching apps, tapping)
through Shizuku, driven remotely from Telegram.

## Prerequisites
- Shizuku app
- Termux
- Ollama (Gemma 3)
- Telegram app

## Procedure

1. Enable **Wireless Debugging** in Developer Options.
2. Pair and start Shizuku. Enable **"Allow Shizuku to access terminal apps"** in its settings.
3. Start Ollama and run a local model in Termux: `ollama run gemma3`
4. Install OpenClaw in a new Termux session — it auto-detects Shizuku.
5. Run onboarding: select **Ollama**, choose the model, and select **Telegram** as the
   gateway. Provide the BotFather token.
6. Launch `openclaw gateway`. Paste the generated token into the web dashboard,
   authenticate in Telegram, and command the phone.
