---
title: webcam-mods for Linux background blur & swap
description: >-
  webcam-mods is the best method I have found for webcam background blur/swap on Linux. I use this for my meetings on
  Google Meet and Webex.
date: 2022-07-07
kind: stream
---

[webcam-mods](https://github.com/hamidzr/webcam-mods) is the best method I have found for webcam background blur/swap on Linux. I use this for my meetings on Google Meet and Webex.

Repo: https://github.com/hamidzr/webcam-mods
Install globally:

```bash
pip install git+https://github.com/hamidzr/webcam-mods@master
```

Original

![Pasted image 20220707144227.png](/images/webcam-step-1.webp)

Cropped: `webcam_mods crop-cam`. I was impressed with the interactive cropping mode which allowed me to crop to my profile pretty easily. The crop settings are saved to disk for future runs.

![Pasted image 20220707144141.png](/images/webcam-step-2.webp)

Cropped and blurred: `webcam_mods bg-blur`

![Pasted image 20220707144301.png](/images/webcam-step-3.webp)

Cropped with bg: `webcam_mods bg-swap`

![Pasted image 20220707144332.png](/images/webcam-step-4.webp)

Video feed was displayed with [ffplay](https://ffmpeg.org/ffplay.html).
Runner-ups that I tried:

- [Linux-Fake-Background-Webcam](https://github.com/fangfufu/Linux-Fake-Background-Webcam). I found its blur didn't work quite as well (background and limbs pop in/out), so it was distracting in meetings.
- [fakecam](https://github.com/RazZziel/fakecam). It was a bit difficult to install (see issue [here](https://github.com/RazZziel/fakecam/issues/2)).
