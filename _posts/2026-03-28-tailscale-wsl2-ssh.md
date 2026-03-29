---
title: 'Tailscale + SSH setup for Windows + WSL2'
date: 2026-03-28
venue-type: blog
permalink: /posts/2026/03/tailscale-wsl2-ssh/
tags:
  - blog-post
  - tooling
---

I do a lot of work from my phone while away from my desk and wanted a clean way to SSH into my Windows machine and drop into whichever WSL2 distro I needed. The tricky part: iOS Tailscale intercepts port 22, WSL2 distros share a network namespace so you can't run independent sshd instances on the same port, and adding a Tailscale node per distro causes TUN device conflicts.

The solution I landed on was running a single Windows OpenSSH server on three ports — 2222 for PowerShell, 2223 for Debian, 2224 for Alpine — and using `Match LocalPort` directives in `sshd_config` to forward each port to the right WSL distro via `wsl.exe`. One Tailscale node on Windows handles all the routing.

# TL;DR

See the gist: [Tailscale + SSH setup for Windows + WSL2](https://gist.github.com/bstee615/d510992d535e955fb175028eb5c5c4d0).

The key bit in `sshd_config`:

```
Port 2222
Port 2223
Port 2224

Match LocalPort 2223
       ForceCommand C:\Windows\System32\wsl.exe -d Debian --cd ~

Match LocalPort 2224
       ForceCommand C:\Windows\System32\wsl.exe -d Alpine --cd ~
```

Then connect with:

| Command | Destination |
|---------|-------------|
| `ssh -p 2222 myuser@zap` | Windows PowerShell |
| `ssh -p 2223 myuser@zap` | Debian bash |
| `ssh -p 2224 myuser@zap` | Alpine sh |
