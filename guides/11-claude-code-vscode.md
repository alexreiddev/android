# 11 — Claude Code CLI inside VS Code on Android

> Source: The Void Kernel, Video 11 — *Turned Android Phone Into a Full AI Coding Machine - FREE (Claude Code + VS Code)*

**Goal:** Run the Claude Code CLI inside a full, local VS Code instance on Android,
powered by Ollama.

## Prerequisites
- Termux
- Ollama
- VS Code Server

## Procedure

1. Update Termux and install dependencies: `pkg install git nodejs`
2. Set up Ollama: `pkg install ollama`, `ollama serve`, then in a new session
   `ollama pull qwen2.5`.
3. Install Claude Code: use `proot-distro` to set up Ubuntu, then install Claude Code
   globally via npm.
4. Install VS Code: run the repository command to install the VS Code web server in Ubuntu.
5. Start the VS Code server, copy the localhost link into Chrome, and log into GitHub.
6. Open VS Code's integrated terminal and run `ollama launch claude` to start the agent.
