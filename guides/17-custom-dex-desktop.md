# 17 — Custom Desktop Mode (DeX Alternative) on Any Android

> Source: The Void Kernel, Video 17 — *I Built a Better Samsung DeX — Works on ANY Android Phone*

**Goal:** Create a custom desktop experience on non-Samsung devices using a third-party
launcher and automated display scaling.

## Prerequisites
- Android phone with DisplayPort Alt Mode (video out)
- USB-C hub
- Taskbar app
- SecondScreen app

## Procedure

1. Connect the phone to a PC and grant the SecondScreen app secure-settings permission via ADB:
   ```
   adb shell pm grant com.farmerbb.secondscreen.free android.permission.WRITE_SECURE_SETTINGS
   ```
2. Install the Taskbar app and set it as the default launcher for secondary displays in
   Android settings.
3. Open SecondScreen and create a profile that triggers on HDMI connection. Set it to
   change the device DPI and resolution to standard 1080p desktop scaling.
