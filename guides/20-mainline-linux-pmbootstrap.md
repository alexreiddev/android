# 20 — Pure Mainline Linux via PostmarketOS (pmbootstrap)

> Source: The Void Kernel, Video 20 — *Why Use Android When We Can run Pure Mainline Linux?*

**Goal:** Completely replace the Android kernel with a mainline Linux kernel via
PostmarketOS, using mobile-friendly UIs like Phosh.

## Prerequisites
- Unlocked bootloader
- Linux PC with `pmbootstrap` installed

## Procedure

1. On a Linux PC, install `pmbootstrap` via the terminal.
2. Run `pmbootstrap init`. Select your device manufacturer, codename, and a UI
   (e.g. Phosh or Plasma Mobile).
3. Run `pmbootstrap install` to compile the custom image for your phone.
4. Boot the phone into Fastboot mode.
5. Flash the partitions and reboot into mainline Linux:
   ```
   pmbootstrap flasher flash_rootfs
   pmbootstrap flasher flash_kernel
   ```
