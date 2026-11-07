# 05 — OpenClaw Local AI Agent (Gemini API)

> Source: The Void Kernel, Video 5 — *How to Install OpenClaw on Android: Local AI Agent (Gemini API)*

**Goal:** Run the OpenClaw AI agent in Termux, connected to WhatsApp, using a free
Google Gemini API key.

## Prerequisites
- Termux
- Google Gemini API key

## Procedure

1. Install Ubuntu in Termux:
   ```
   pkg install proot-distro
   proot-distro install ubuntu
   proot-distro login ubuntu
   ```
2. Install dependencies: `apt update` then `apt install curl git nodejs`
3. Install OpenClaw globally: `npm install -g openclaw` and run the networking config steps.
4. Run the OpenClaw onboarding:
   - Select **Quick Start**
   - Choose **Google Provider (API Key)** and paste the Gemini key
   - Select a model (e.g. 2.5 Flash)
   - Select **WhatsApp**
5. Scan the QR code with WhatsApp **Linked Devices**.
6. Open a new Termux session and run `openclaw --verbose`.
7. Open a third session to output the gateway token. Paste that token into the
   OpenClaw localhost dashboard in Chrome.
