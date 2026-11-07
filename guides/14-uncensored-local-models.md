# 14 — Uncensored Local Models Offline (llama.cpp)

> Source: The Void Kernel, Video 14 — *How to Install Jailbroken AI on Your Phone (No Restrictions)*

**Goal:** Run "uncensored" community-fine-tuned models (e.g. a Gemma 2 uncensored
variant) entirely offline using a bash script and `llama.cpp`.

> Note: these are third-party fine-tunes with fewer content safeguards. Run them only
> on your own device and be aware you are responsible for how such a model is used.

## Prerequisites
- Device with 6GB+ RAM
- Termux

## Procedure

1. Clone the custom repository in Termux: `git clone <repo_url>`
2. `cd` into the folder and run the setup bash script.
3. Select an uncensored model from the terminal prompt (e.g. Gemma 2) and wait for the download.
4. Launch the web UI script and select `llama.cpp`.
5. The terminal opens Chrome to a local `localhost` port with the chat interface.
