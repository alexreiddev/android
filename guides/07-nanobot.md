# 07 — Nanobot (Ultra-Lightweight Agent)

> Source: The Void Kernel, Video 7 — *Forget OpenClaw, Try Nanobot (Ultra-Lightweight Agent)*

**Goal:** Install Nanobot (~4,000 lines of code) with local Ollama, controlled via
Telegram to write and host code.

## Prerequisites
- Termux
- Ollama account
- Telegram (for BotFather)

## Procedure

1. Set up Ollama in Termux: `pkg install ollama`, `ollama serve`, then pull a model.
2. Prepare Termux: run the configuration commands and install Python and Git.
3. Install Nanobot: `git clone` the repo, then run `pip install`.
4. Telegram: message **@BotFather**, send `/newbot`, create a name/username, and copy
   the API token.
5. Termux: paste the config command, replacing the placeholder with the Telegram token.
6. Launch: run `nanobot gateway`. Interact with the local agent through your Telegram bot.
