# 08 — CalyxOS (Privacy-Focused ROM)

> Source: The Void Kernel, Video 8 — *Install CalyxOS in 2026 | Remove Google Tracking*

**Goal:** Replace stock Android with CalyxOS for privacy, using MicroG for app
compatibility (Pixel devices). **Wipes phone data.**

## Prerequisites
- Google USB drivers (PC)
- CalyxOS device-flasher tool
- The specific CalyxOS factory image for your device

## Procedure

1. Install the Google USB drivers on the PC.
2. Enable **USB Debugging** and **OEM Unlocking** on the phone.
3. Place the flasher tool and factory image in the same folder. Run `device-flasher`.
4. Follow the terminal prompts. The phone boots to fastboot and flashing happens automatically.
5. **Relock the bootloader** when the terminal prompts: confirm on the phone with the
   volume/power keys (important for device security).
6. Reboot and set up CalyxOS, ensuring **MicroG** is enabled for standard app functionality.
