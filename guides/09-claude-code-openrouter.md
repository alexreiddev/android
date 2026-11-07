# 09 — Claude Code CLI via OpenRouter

> Source: The Void Kernel, Video 9 — *Run Claude Code AI Agent on Phone for Free (OpenRouter API)*

**Goal:** Run Anthropic's Claude Code CLI in Termux via OpenRouter (using free models
such as Llama/Qwen) to build apps on-device.

## Prerequisites
- Termux
- OpenRouter account / API key

## Procedure

1. Install Node.js in Termux: `pkg install nodejs`
2. Install Claude Code globally via npm.
3. Generate an API key on OpenRouter and copy a free model ID (e.g. a Llama model).
4. Termux: run the provided configuration command, substituting your OpenRouter API
   key and chosen model ID.
5. Launch: type `claude`, accept the security prompts, and give natural-language
   prompts to have it generate and run code locally.
