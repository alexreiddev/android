# 18 — Open Claude (Open-Source Local Coding Agent)

> Source: The Void Kernel, Video 18 — *Open Claude: Free AI Coding Agent Setup on Android & PC*

**Goal:** Run an open-source, local clone of a Claude Code–style coding agent without an
Anthropic Pro subscription.

## Prerequisites
- Termux
- Git
- Node.js
- Ollama (optional)

## Procedure

1. Update Termux and install dependencies: `pkg install git nodejs`
2. Clone the Open Claude repository: `git clone <open_claude_repo>`
3. `cd` into the directory and run `npm install`.
4. Edit the `.env` configuration file to point to either a local Ollama instance or a
   free OpenRouter API key.
5. Run `npm start` to launch the local web server and open the coding interface in your
   phone's browser.
