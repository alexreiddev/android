# 19 — Running Windows Apps on Android (Box86/Box64 + Wine)

> Source: The Void Kernel, Video 19 — *Real Linux on Android (GPU Acceleration & Windows Apps)*

**Goal:** Expand the proot-distro Linux environment to run x86 Windows `.exe` files on
ARM Android using Box86/Box64 and Wine.

## Prerequisites
- Termux
- Termux:X11
- proot-distro (Debian/Ubuntu)

## Procedure

1. Boot into the Termux:X11 graphical environment (from [Guide 13](13-linux-gpu-desktop.md)).
2. Install Virgl or Zink drivers via the Termux package manager to enable 3D hardware
   acceleration.
3. Compile and install Box86 and Box64 from their GitHub repositories inside the Linux
   environment.
4. Install Wine (the Windows compatibility layer).
5. Download a Windows `.exe` (e.g. a lightweight PC game or app) and run it:
   `wine <filename.exe>`
