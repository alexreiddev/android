# 06 — OpenClaw Fully Local (Ollama)

> Source: The Void Kernel, Video 6 — *Run OpenClaw AI Agent Locally for FREE (Ollama / No API Limits)*

**Goal:** Run OpenClaw entirely on phone hardware using Ollama, with no cloud API.

## Prerequisites
- Termux setup from [Guide 05](05-openclaw-gemini.md)
- Ollama account

## Procedure

1. Install Ollama in Termux and start the server: `ollama serve`
2. In a new session, pull and run a local model: `ollama pull <model>` then run it.
   Authenticate via the localhost link in Chrome if prompted.
3. In a new Ubuntu session, run the OpenClaw Ollama-specific install command.
4. Run onboarding:
   - Skip API setup
   - Select **All Providers** and choose the detected local Ollama model
   - Select **WhatsApp** and enter the number
5. In a new Ubuntu session, launch OpenClaw with the Ollama config flag.
6. Access the local dashboard via Chrome. The agent now runs 100% locally.
