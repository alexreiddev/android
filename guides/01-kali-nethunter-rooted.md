# 01 — Kali NetHunter on a Rooted Android Phone

> Source: The Void Kernel, Video 1 — *How to Install Kali Linux on Android: Root, WiFi Penetration Testing, HID & More*

**Goal:** Install Kali NetHunter on a rooted phone (demo device: Poco F1) for mobile
penetration testing on your own equipment (Wi-Fi testing, HID keyboard emulation, etc.).

## Prerequisites

**On the PC**
- Android SDK Platform Tools (`adb`, `fastboot`)

**For the phone**
- Unlocked bootloader
- Custom ROM ZIP (e.g. LineageOS)
- TWRP recovery image
- Magisk ZIP
- Kali NetHunter ZIP

## Procedure

1. Enable **Developer Options** and **USB Debugging** on the phone.
2. Boot into **Fastboot** mode and flash TWRP from the PC:
   `fastboot flash recovery <filename.img>`
3. Boot into TWRP and wipe **Cache**, **Dalvik**, and **Data**.
4. Sideload the custom ROM: `adb sideload <LineageOS.zip>`
5. Sideload Magisk: `adb sideload <Magisk.zip>`
6. Reboot, run through Android setup, then open the Magisk app to finalize root.
7. Transfer the NetHunter ZIP to internal storage and flash it via the Magisk
   app's **Modules** tab (takes ~10–20 min).
8. Reboot to launch the Kali NetHunter environment.
