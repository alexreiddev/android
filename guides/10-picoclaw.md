# 10 — PicoClaw 24/7 Agent on Old Hardware

> Source: The Void Kernel, Video 10 — *24/7 AI Agent With PicoClaw on an 8-Year-Old Phone*

**Goal:** Run PicoClaw, an agent optimized for older hardware, using Ollama and a
Telegram UI.

## Prerequisites
- Termux
- Telegram (BotFather & userinfobot)

## Procedure

1. Set up Ollama in Termux and pull a lightweight model (e.g. `qwen-coder-2.5`).
2. Install dependencies: Python and Git. Clone the PicoClaw repo and run
   `pip install` on its requirements.
3. Telegram setup:
   - Get the bot token from **@BotFather**
   - Get your user ID from **@userinfobot**
4. Termux: edit the configuration with Nano, inserting the Telegram bot token and
   user ID. Save and exit (`Ctrl+O`, `Ctrl+X`).
5. Launch: run `picoclaw agent`, then `picoclaw gateway`. Connect through the Telegram
   bot to control the agent.
