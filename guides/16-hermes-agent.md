# 16 — Hermes AI Agent (Local Alternative to OpenClaw)

> Source: The Void Kernel, Video 16 — *Forget OpenClaw — Run Hermes AI Agent on any Android Locally*

**Goal:** Set up the Hermes AI Agent as a lightweight, purely local alternative to OpenClaw.

## Prerequisites
- Termux
- Node.js
- Ollama

## Procedure

1. Install and start Ollama in Termux (`ollama serve`). Pull a recommended model,
   e.g. `ollama pull hermes3`.
2. In a new Termux session, install the Hermes agent via npm: `npm install -g hermes-agent`
3. Configure Hermes to use the local Ollama endpoint (`localhost:11434`) rather than an
   external API.
4. Launch the agent CLI and interact with it directly in the terminal.
