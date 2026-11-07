# 04 — Universal Magisk Root (No TWRP)

> Source: The Void Kernel, Video 4 — *How to Root ANY Android Phone in 2026 (Universal Magisk Guide)*

**Goal:** Root a modern Android device without TWRP by manually patching the stock
`boot.img` with Magisk (demo device: Pixel 6A).

## Prerequisites
- Android SDK Platform Tools
- Magisk app
- Stock firmware / fastboot ROM matching the phone's current build

## Procedure

1. Enable **OEM Unlocking** and **USB Debugging** in Developer Options.
2. Extract `boot.img` (or `init_boot.img`) from the stock ROM ZIP on the PC and
   transfer it to the phone.
3. Install the Magisk app. Tap **Install > "Select and Patch a File"** and choose the `boot.img`.
4. Move the patched image (saved in Downloads) back to the PC's `platform-tools` folder.
5. Boot the phone into **Fastboot** mode. Unlock the bootloader:
   `fastboot flashing unlock` (this wipes data).
6. Flash the patched image: `fastboot flash boot <patched_magisk_file.img>`
   (for A/B-slot devices, flash to both `boot_a` and `boot_b`).
7. Reboot and open Magisk to verify the root installation.
