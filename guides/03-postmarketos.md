# 03 — PostmarketOS (Native Linux on Android)

> Source: The Void Kernel, Video 3 — *I Installed Native Linux on My Android Phone | PostmarketOS Guide 2026*

**Goal:** Replace Android with PostmarketOS, a true Linux distribution (demo device:
Poco F1). Supports Waydroid for running Android apps.

## Prerequisites
- Unlocked bootloader
- Android SDK Platform Tools (`fastboot`)
- PostmarketOS boot image and root filesystem image

## Procedure

1. Enable **USB Debugging** in Developer Options.
2. Place the PostmarketOS `.img` files inside the `platform-tools` folder on the PC.
3. Boot the phone into **Fastboot** mode and connect it to the PC.
4. Flash the system data: `fastboot flash userdata` then drag/drop the large
   filesystem image into the prompt. Wait for completion.
5. Flash the kernel: `fastboot flash boot` then drag/drop the boot image.
6. Reboot: `fastboot reboot`
7. Log in with the default passcode: `147147`
